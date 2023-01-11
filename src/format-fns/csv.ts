import { getShopifyIdNumber } from "./ids";
import { IFormatCSVFnReturn } from "../types";

export type TCSVFormatFnNames = "formatCreatedProducts";

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
