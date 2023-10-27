import { mergeDefaultOrgSettings } from "./orgSettings.js";

describe(`orgSettings`, () => {
  describe(`mergeDefaultOrgSettings`, () => {
    it(`sets a default import map cache control`, () => {
      const finalSettings = mergeDefaultOrgSettings({});

      expect(finalSettings.importMapCacheControl).toBe(
        "public, must-revalidate, max-age=60"
      );
    });

    it(`sets a default cache control for static files`, () => {
      const finalSettings = mergeDefaultOrgSettings({});

      expect(finalSettings.staticFiles.cacheControl).toBe(
        "public, max-age=31536000, immutable"
      );
    });

    it(`overwrites null values with the default settings`, () => {
      const finalSettings = mergeDefaultOrgSettings({
        cors: {
          allowCredentials: null,
          allowHeaders: null,
          allowMethods: null,
          allowOrigins: null,
          exposeHeaders: null,
          maxAge: null,
        },
        customDomain: {
          customCDNTestDomain: null,
          customCDNProdDomain: null,
          customCDNTestCloudflareIdentifier: null,
          customCDNProdCloudflareIdentifier: null,
        },
      });

      expect(finalSettings.cors.allowCredentials).toEqual(true);
      expect(finalSettings.cors.allowOrigins).toEqual(["*"]);
      expect(finalSettings.cors.exposeHeaders).toEqual([]);
      expect(finalSettings.cors.maxAge).toEqual(86400);
      expect(finalSettings.cors.allowCredentials).toEqual(true);
      expect(finalSettings.cors.allowHeaders).toEqual([]);
      expect(finalSettings.cors.allowMethods).toEqual([
        "GET",
        "HEAD",
        "OPTIONS",
      ]);
      expect(finalSettings.customDomain.customCDNTestDomain).toBeNull();
      expect(
        finalSettings.customDomain.customCDNTestCloudflareIdentifier
      ).toBeNull();
      expect(finalSettings.customDomain.customCDNProdDomain).toBeNull();
      expect(
        finalSettings.customDomain.customCDNProdCloudflareIdentifier
      ).toBeNull();
    });
  });
});
