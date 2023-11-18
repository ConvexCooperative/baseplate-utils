import { mergeWith } from "lodash-es";
import { RecursivePartial } from "./utils.js";

const defaultParams: HTMLTemplateParams = {
  lang: "en",
  pageTitle: "Web App",
  importMap: {
    type: "systemjs",
    name: "systemjs",
    useOverrides: true,
  },
  pageInit: {
    type: "single-spa",
    layoutTemplate: "<routes></routes>",
  },
  preloads: [],
  headScripts: [],
  headStylesheets: [],
};

export function mergeDefaultHtmlParams(
  htmlParams: RecursivePartial<HTMLTemplateParams>
): HTMLTemplateParams {
  const finalSettings: HTMLTemplateParams = mergeWith(
    {},
    defaultParams,
    htmlParams,
    (newValue, oldValue) => {
      return oldValue === null ? newValue : undefined;
    }
  );

  return finalSettings;
}

export interface HTMLTemplateParams {
  lang: string;
  pageTitle: string;
  importMap: {
    type: "systemjs" | "native";
    name: string;
    useOverrides: boolean;
  };
  pageInit: HTMLPageInit;
  preloads: HTMLPreload[];
  headScripts: HTMLScript[];
  headStylesheets: HTMLStylesheet[];
}

export type HTMLPageInit = ModulePageInit | SingleSpaPageInit;

export interface ModulePageInit {
  type: "module";
  entryModule: string;
}

export interface SingleSpaPageInit {
  type: "single-spa";
  layoutTemplate: string;
}

export interface HTMLPreload {
  importSpecifier?: string;
  href?: string;
  as: string;
}

export interface HTMLScript {
  src: string;
  async: boolean;
  defer: boolean;
}

export interface HTMLStylesheet {
  href: string;
}
