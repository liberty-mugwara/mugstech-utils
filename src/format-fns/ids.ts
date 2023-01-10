import { IObjectIdParams } from "../types";

export function getShopifyIdNumber({ id, object }: IObjectIdParams<string>) {
  return parseInt(id.replace(`gid://shopify/${object}/`, ""), 10);
}

export function formartId({ id, object }: IObjectIdParams<number>) {
  return `gid://shopify/${object}/${id}`;
}

export function formatIdForS3Names(id: string) {
  return id.replaceAll("/", "-").replaceAll(":", "").replaceAll("--", "-");
}
