import { mergeWith } from "lodash-es";
import { RecursivePartial } from "./utils.js";

const defaultSettings: OrgSettings = {
  staticFiles: {
    microfrontendProxy: {
      environments: {},
    },
    cacheControl: "public, max-age=31536000, immutable",
  },
  importMapCacheControl: "public, must-revalidate, max-age=60",
  cors: {
    allowOrigins: ["*"],
    exposeHeaders: [],
    // 1 day in seconds
    maxAge: 86400,
    allowCredentials: true,
    allowHeaders: [],
    allowMethods: ["GET", "HEAD", "OPTIONS"],
  },
  orgExists: false,
  customDomain: {
    customCDNTestDomain: null,
    customCDNProdDomain: null,
    customCDNTestCloudflareIdentifier: null,
    customCDNProdCloudflareIdentifier: null,
  },
};

export function mergeDefaultOrgSettings(
  orgSettings: RecursivePartial<OrgSettings>
): OrgSettings {
  const finalSettings: OrgSettings = mergeWith(
    {},
    defaultSettings,
    orgSettings,
    (newValue, oldValue) => {
      return oldValue === null ? newValue : undefined;
    }
  );
  return finalSettings;
}

interface StaticFileSettings {
  microfrontendProxy: {
    environments: {
      [key: string]: StaticFileProxySettings;
    };
  };
  cacheControl: string;
}

export interface StaticFileProxySettings {
  useBaseplateHosting: boolean;
  host: string;
  environmentId: string;
  aws?: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export interface OrgSettings {
  staticFiles: StaticFileSettings;
  importMapCacheControl: string;
  cors: CORSSettings;
  orgExists: boolean;
  customDomain: CustomDomainSettings;
}

export interface CORSSettings {
  allowOrigins: string[];
  exposeHeaders: string[];
  maxAge: number;
  allowCredentials: boolean;
  allowMethods: string[];
  allowHeaders: string[];
}

export interface CustomDomainSettings {
  customCDNTestDomain?: string;
  customCDNProdDomain?: string;
  customCDNTestCloudflareIdentifier?: string;
  customCDNProdCloudflareIdentifier?: string;
}
