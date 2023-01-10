export interface IFormatCSVFnReturn {
  data: string;
  extension: "CSV";
  headings: string;
}

// *******************************************************
// Shopify types
// *******************************************************
export type TShopifyObject =
  | "Customer"
  | "Fulfillment"
  | "InventoryItem"
  | "LineItem"
  | "Location"
  | "Order"
  | "OrderTransaction"
  | "Product"
  | "ProductVariant"
  | "Refund"
  | "ShippingLine";

export interface IObjectIdParams<T> {
  id: T;
  object: TShopifyObject;
}

export interface IFormatJSONFnReturn {
  data: string;
  extension: "JSON";
  jsonType: "OBJECT" | "ARRAY";
}
