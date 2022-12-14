export interface IFormatFnReturn {
  data: string;
  extension: "JSON";
  jsonType: "OBJECT" | "ARRAY";
}

export type TFormatFnNames = "formatVariantIdsFromBulkQuery";

export function formatVariantIdsFromBulkQuery(data: string): IFormatFnReturn {
  const variant: { id: string; sku: string; product: { id: string } } =
    JSON.parse(data);
  return {
    data: `"${variant.sku}":${JSON.stringify([
      variant.id,
      variant.product.id,
    ])}`,
    extension: "JSON",
    jsonType: "OBJECT",
  };
}
