// This is the JSON stored in Cloudflare KV Storage
// under the `custom-domain-${hostname}` key. It helps
// baseplate-cloudflare-worker know how to respond to
// requests that originate from Baseplate custom domains
export interface CustomDomain {
  orgKey: string;
  purpose: CustomDomainPurpose;
  customerEnv?: string;
  webAppHtmlFilename?: string;
}

export enum CustomDomainPurpose {
  cdn_proxy = "cdn_proxy",
  web_app = "web_app",
}
