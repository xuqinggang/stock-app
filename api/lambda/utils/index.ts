export * from "./formatResponse";
import { SZ_SYMBOL_CODE_REFIX, SH_SYMBOL_CODE_REFIX } from "@api/constant";

export function getStockSymbol(code: string) {
  if (SZ_SYMBOL_CODE_REFIX.some((prefix) => code.indexOf(prefix) === 0)) {
    return "sz" + code;
  }
  if (SH_SYMBOL_CODE_REFIX.some((prefix) => code.indexOf(prefix) === 0)) {
    return "sh" + code;
  }
  return "";
}
