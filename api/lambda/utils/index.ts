export * from "./formatResponse";
export * from "@shared/utils/points";
export * from "@shared/utils/trend";
export * from "./summary-stock-json";
export * from "./convert";

import { SZ_SYMBOL_CODE_REFIX, SH_SYMBOL_CODE_REFIX } from "@shared/constant";

export function getStockSymbol(code: string) {
  if (SZ_SYMBOL_CODE_REFIX.some((prefix) => code.indexOf(prefix) === 0)) {
    return "sz" + code;
  }
  if (SH_SYMBOL_CODE_REFIX.some((prefix) => code.indexOf(prefix) === 0)) {
    return "sh" + code;
  }
  return "";
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
