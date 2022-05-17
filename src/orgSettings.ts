import { merge } from "lodash-es";

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
};

export function mergeDefaultOrgSettings(
  orgSettings: RecursivePartial<OrgSettings>
): OrgSettings {
  const finalSettings: OrgSettings = merge({}, defaultSettings, orgSettings);
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
}

export interface CORSSettings {
  allowOrigins: string[];
  exposeHeaders: string[];
  maxAge: number;
  allowCredentials: boolean;
  allowMethods: string[];
  allowHeaders: string[];
}

// https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};
