import { getShopifyIdNumber } from "./ids";
import { IFormatCSVFnReturn } from "../types";

export type TCSVFormatFnNames =
  | "formatCreatedProducts"
  | "formatProductImages"
  | "formatAllProductVariantIds";

export function formatCreatedProducts(
  data: string,
  prevData?: string
): IFormatCSVFnReturn {
  const createData: {
    data: {
      productCreate: {
        product: {
          id: string;
          handle: string;
          description: string;
          createdAt: string;
          status: string;
          totalVariants: number;
          variants: {
            edges: {
              node: {
                id: string;
                sku: string;
                inventoryItem: {
                  id: string;
                };
              };
            }[];
          };
        } | null;
        userErrors: string[];
      };
    };
    __lineNumber: number;
  } = JSON.parse(data);

  let row = "";

  if (createData.data.productCreate.product) {
    const { id, variants } = createData.data.productCreate.product;
    row = `\r\n${variants.edges[0].node.sku},${getShopifyIdNumber({
      id,
      object: "Product",
    })},${getShopifyIdNumber({
      id: variants.edges[0].node.id,
      object: "ProductVariant",
    })},${getShopifyIdNumber({
      id: variants.edges[0].node.inventoryItem.id,
      object: "InventoryItem",
    })}`;
  }

  return {
    data: row,
    extension: "CSV",
    headings:
      "product_id_or_product_sku,id,variant_id,variant_inventory_item_id",
  };
}

export interface IProductImage {
  id: string;
  altText?: string | null;
  url?: string;
  __parentId?: string;
}
export function formatProductImages(
  data: string,
  prevData: string
): IFormatCSVFnReturn {
  const currentImageData = JSON.parse(data) as IProductImage;
  const prevImageData = JSON.parse(prevData) as IProductImage;

  let row = "";

  if (
    prevData !== "{}" &&
    !currentImageData.__parentId &&
    !prevImageData.__parentId
  ) {
    row = `\r\n${getShopifyIdNumber({
      object: "Product",
      id: prevImageData.id,
    })},,,`;
  }

  if (currentImageData.__parentId) {
    const productId = getShopifyIdNumber({
      object: "Product",
      id: prevImageData.id,
    });

    const imageId = getShopifyIdNumber({
      object: "ProductImage",
      id: currentImageData.id,
    });

    row = `${row}\r\n${productId},${imageId},${currentImageData.url || ""},"${
      currentImageData.altText || ""
    }"`;
  }

  return {
    data: row,
    extension: "CSV",
    headings: "id,image_id,image_url,image_alt_text",
  };
}

export function formatAllProductVariantIds(
  data: string,
  prevData?: string
): IFormatCSVFnReturn {
  const variant: {
    id: string;
    inventoryItem: {
      id: string;
    };
    selectedOptions: {
      name: string;
      value: string;
    }[];
    sku: string;
    product: { id: string };
  } = JSON.parse(data);

  let row = "";
  const variantId = getShopifyIdNumber({
    object: "ProductVariant",
    id: variant.id,
  });
  const productId = getShopifyIdNumber({
    object: "Product",
    id: variant.product.id,
  });
  const inventoryItemId = getShopifyIdNumber({
    object: "InventoryItem",
    id: variant.inventoryItem.id,
  });
  const option = variant.selectedOptions.find(
    (v) => v.name === "Längenintervall" || v.name === "Title"
  ) || { name: "Title", value: "Default Title" };

  row = `\r\n${variant.sku},${productId},${variantId},${inventoryItemId},${option.name},${option.value}`;

  return {
    data: row,
    extension: "CSV",
    headings:
      "product_id_or_product_sku,id,variant_id,variant_inventory_item_id,Option1_Name,Option1_Value",
  };
}
