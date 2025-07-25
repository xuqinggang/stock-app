import { DIM_NAME, DIMS_INCLUDE } from "@shared/constant";
import { IDayK } from "@api/types";

export function getLastHistItem(histItem: IDayK, allHistItem?: IDayK[]) {
  const defaultItem = {
    开盘: undefined,
    收盘: undefined,
    最高: undefined,
    最低: undefined,
  };
  const lastIndex =
    Number(allHistItem?.findIndex((item) => item.日期 === histItem.日期)) - 1;
  if (lastIndex > -2) {
    return allHistItem?.[lastIndex] || defaultItem;
  }
  return defaultItem;
}
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
export const isUpperShadowLines = (histItem: IDayK, allHistItem?: IDayK[]) => {
  const { 收盘, 最高, 最低 } = histItem;
  const 开盘 = getLastHistItem(histItem, allHistItem)?.收盘 || histItem.开盘;
  return 收盘 > 开盘 && 最高 > 收盘 && 最高 - 收盘 > (收盘 - 开盘) / 3;
};
// 是否阴上影线
export const isDownShadowLines = (histItem: IDayK, allHistItem?: IDayK[]) => {
  const { 收盘, 最高, 最低 } = histItem;
  const 开盘 = getLastHistItem(histItem, allHistItem)?.收盘 || histItem.开盘;
  return 开盘 > 收盘 && 最高 > 开盘 && 最高 - 开盘 > (开盘 - 收盘) / 3;
};
// 无下影线(下影线很短)
export const isNoDownShadowLines = (histItem: IDayK, allHistItem?: IDayK[]) => {
  const { 收盘, 最高, 最低 } = histItem;
  const 开盘 = getLastHistItem(histItem, allHistItem)?.收盘 || histItem.开盘;
  const minData = Math.min(开盘, 收盘);
  return Math.abs(minData - 最低) <= 0 || Number((Math.abs(minData - 最低) / (开盘 * 0.1)).toFixed(4)) <= 0.15
};
// 是否小阳线(涨幅在[0, 3%]以内)
export const ifSmallUpperLines = (histItem: IDayK, allHistItem?: IDayK[]) => {
  const { 收盘, 最高, 最低 } = histItem;
  const 开盘 = getLastHistItem(histItem, allHistItem)?.收盘 || histItem.开盘;
  return 收盘 >= 开盘 && Number(((收盘 - 开盘) / 开盘).toFixed(4)) <= 0.03;
};
// 大阳线 >= 3%,  [3%, ]
export const ifBigUpperLines = (histItem: IDayK, allHistItem?: IDayK[]) => {
  const { 收盘, 最高, 最低 } = histItem;
  const 开盘 = getLastHistItem(histItem, allHistItem)?.收盘 || histItem.开盘;
  return 收盘 > 开盘 && Number(((收盘 - 开盘) / 开盘).toFixed(4)) >= 0.03;
};
// 涨停数量 >= 9%
export const ifZhangTingLines = (histItem: IDayK, allHistItem?: IDayK[]) => {
  const { 收盘, 最高, 最低 } = histItem;
  const 开盘 = getLastHistItem(histItem, allHistItem)?.收盘 || histItem.开盘;
  return 收盘 > 开盘 && Number(((收盘 - 开盘) / 开盘).toFixed(4)) >= 0.09;
};

// 小阴线(跌幅[-2%, 0]以内)
export const ifSmallDownLines = (histItem: IDayK, allHistItem?: IDayK[]) => {
  const { 收盘, 最高, 最低 } = histItem;
  const 开盘 = getLastHistItem(histItem, allHistItem)?.收盘 || histItem.开盘;
  return 收盘 <= 开盘 && Number(((收盘 - 开盘) / 开盘).toFixed(4)) >= -0.02;
};

// 站在5日均线的数量
export const ifMA5 = (histItem: IDayK, allHistItem?: IDayK[]) => {
    const { 收盘, 日期 } = histItem;
    let maXNum = 5;
    let sum = 0;
    let tIndex = allHistItem?.findIndex(item => item.日期 === 日期);
    while(tIndex && maXNum--) {
      sum += (allHistItem?.[tIndex--]?.收盘 || 0);
    }
    const maPrice = Number(sum / 5);
    return 收盘 >= maPrice;
}

// 站在5日均线的数量
export const ifMA10 = (histItem: IDayK, allHistItem?: IDayK[]) => {
    const { 收盘, 日期 } = histItem;
    let maXNum = 10;
    let sum = 0;
    let tIndex = allHistItem?.findIndex(item => item.日期 === 日期);
    while(tIndex && maXNum--) {
      sum += (allHistItem?.[tIndex--]?.收盘 || 0);
    }
    const maPrice = Number(sum / 10);
    return 收盘 >= maPrice;
}