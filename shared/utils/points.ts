import { IDayK } from "@api/types";

export function genePoints() {}

// 计算股票Y点的类型
export enum EMedianPointType {
  LOW_HIGH = "low_high", // 中位点 low + (high - low) /2
  OPEN_CLOSE = "open_close", // 中位点 open + (close - open) /2
  ONLY_CLOSE = "only_close", // close
}

export function getPointsByDayK(
  data: IDayK[],
  type: EMedianPointType = EMedianPointType.OPEN_CLOSE
): Array<[number, number]> {
  return data?.map((item, index) => {
    let start = Number(item["开盘"]),
      end = Number(item["收盘"]),
      min: number;
    if (type === EMedianPointType.ONLY_CLOSE) {
      return [index, end];
    }
    if (type === EMedianPointType.OPEN_CLOSE) {
      start = Number(item["开盘"]);
      end = Number(item["收盘"]);
    }
    if (type === EMedianPointType.LOW_HIGH) {
      start = Number(item["最低"]);
      end = Number(item["最高"]);
    }
    min = Math.min(start!, end!);
    const diff = Math.abs(Number(start) - Number(end)) / 2;
    const pointY = Number((min + diff).toFixed(2));

    return [index, pointY];
  });
}
