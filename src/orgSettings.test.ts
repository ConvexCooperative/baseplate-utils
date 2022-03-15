import { mergeDefaultOrgSettings } from "./orgSettings.js";

describe(`orgSettings`, () => {
  describe(`mergeDefaultOrgSettings`, () => {
    it(`sets a default import map cache control`, () => {
      const finalSettings = mergeDefaultOrgSettings({});

      expect(finalSettings.importMapCacheControl).toBe(
        "public, must-revalidate, max-age=60"
      );
    });
  });
});
