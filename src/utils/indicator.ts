import { IUpStockItemInfo, IStockItemInfo } from "@api/types";

// 计算5日均线
export function calculateMA5(hist: IStockItemInfo['hist']) {
  const prices = hist?.map(item => item.收盘);
  const ma5 = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < 4) {
      // 前4天数据不足，取已有数据的平均值
      const sum = prices.slice(0, i + 1).reduce((acc, val) => acc + val, 0);
      ma5.push(sum / (i + 1));
    } else {
      const sum = prices.slice(i - 4, i + 1).reduce((acc, val) => acc + val, 0);
      ma5.push(sum / 5);
    }
  }
  return ma5;
}
// const closePrices = [100, 102, 105, 103, 104, 106, 108, 107, 109, 110];
// const ma5Values = calculateMA5(closePrices);