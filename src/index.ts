export function formatVariantIdsFromBulkQuery(data: string) {
  const variant: { id: string; sku: string; product: { id: string } } =
    JSON.parse(data);
  return `"${variant.sku}":${JSON.stringify([variant.id, variant.product.id])}`;
}
