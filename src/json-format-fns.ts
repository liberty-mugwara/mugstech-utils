import { IFormatJSONFnReturn } from "./types";

export type TFormatFnNames = "formatVariantIdsFromBulkQuery";

export function formatVariantIdsFromBulkQuery(
  data: string
): IFormatJSONFnReturn {
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
