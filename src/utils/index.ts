import { DIM_NAME, DIMS_INCLUDE } from "@shared/constant";
import { IDayK } from "@api/types";

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
// 是否阳上影线
export const isUpperShadowLines = (histItem: IDayK) => {
  const { 开盘, 收盘, 最高, 最低 } = histItem;
  return 收盘 > 开盘 && 最高 > 收盘 && 最高 - 收盘 > (收盘 - 开盘) / 3;
};
// 是否阴上影线
export const isDownShadowLines = (histItem: IDayK) => {
  const { 开盘, 收盘, 最高, 最低 } = histItem;
  return 开盘 > 收盘 && 最高 > 开盘 && 最高 - 开盘 > (开盘 - 收盘) / 3;
};
// 是否小阳线(涨幅在2%以内)
export const ifSmallUpperLines = (histItem: IDayK) => {
  const { 开盘, 收盘, 最高, 最低 } = histItem;
  return 收盘 > 开盘 && Number(((收盘 - 开盘) / 开盘).toFixed(3)) <= 0.02;
};
// 大阳线 >= 4%
export const ifBigUpperLines = (histItem: IDayK) => {
  const { 开盘, 收盘, 最高, 最低 } = histItem;
  return 收盘 > 开盘 && Number(((收盘 - 开盘) / 开盘).toFixed(3)) >= 0.04;
};

// 小阴线(跌幅2%以内)
export const ifSmallDownLines = (histItem: IDayK) => {
  const { 开盘, 收盘, 最高, 最低 } = histItem;
  return 收盘 < 开盘 && Number(((开盘 - 收盘) / 开盘).toFixed(4)) <= 0.02;
};
