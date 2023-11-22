import { HTMLTemplateParams, mergeDefaultHtmlParams } from "./htmlParams.js";
import { RecursivePartial } from "./utils.js";

describe(`htmlParams`, () => {
  it(`matches snapshot for default params`, () => {
    const params = mergeDefaultHtmlParams({});
    expect(params).toMatchSnapshot();
  });

  it(`merges top level properties`, () => {
    const params: RecursivePartial<HTMLTemplateParams> = {
      lang: "es",
      pageTitle: "Aplicacion de Web",
      preloads: [
        {
          importSpecifier: "root-config",
          as: "script",
        },
      ],
    };
    const finalParams = mergeDefaultHtmlParams(params);
    expect(finalParams.lang).toBe(params.lang);
    expect(finalParams.pageTitle).toBe(params.pageTitle);
    expect(finalParams.preloads).toEqual(params.preloads);
  });

  it(`merges import map properties`, () => {
    const params: RecursivePartial<HTMLTemplateParams> = {
      importMap: {
        name: "main",
        useOverrides: false,
      },
    };
    const finalParams = mergeDefaultHtmlParams(params);
    expect(finalParams.importMap.type).toBe("systemjs");
    expect(finalParams.importMap.name).toBe(params.importMap!.name);
    expect(finalParams.importMap.useOverrides).toBe(
      params.importMap!.useOverrides
    );
  });
});
