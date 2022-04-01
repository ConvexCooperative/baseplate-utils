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
  });
});
