import { DIM_NAME, DIMS_INCLUDE } from "@shared/constant";

// 获取股票代码板块
export function getStockAttributionCode(code: string) {
  const { options } =
    DIMS_INCLUDE?.find(
      (item) => item.name === DIM_NAME.STOCK_ATTRIBUTION_CODE
    ) || {};

  return options
    ?.filter((item) => item.value !== "60" && item.value !== "00")
    ?.find((item) => code.indexOf(item.value) === 0)?.label;
}