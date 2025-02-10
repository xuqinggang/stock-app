import { TPoints } from "@api/types";
// 斜率法判断趋势向上
function judgeTrendByCurve(points: TPoints) {
  if (points.length < 2) {
    return false;
  }

  let sumSlopes = 0;
  for (let i = 1; i < points.length; i++) {
    const currentSlope =
      (points[i][1] - points[i - 1][1]) / (points[i][0] - points[i - 1][0]);
    sumSlopes += currentSlope;
  }

  const averageSlope = sumSlopes / (points.length - 1);

  return averageSlope > 0;
}

// 差分法判断趋势
function judgeTrendByDifference(points: TPoints) {
  let differences = [];
  for (let i = 1; i < points.length; i++) {
    differences.push(points[i][1] - points[i - 1][1]);
  }

  let positiveCount = 0;
  let negativeCount = 0;

  for (let diff of differences) {
    if (diff > 0) {
      positiveCount++;
    } else if (diff < 0) {
      negativeCount++;
    }
  }

  return positiveCount > negativeCount;
}

export function judgeIfUpTrend(points: TPoints) {
  return judgeTrendByDifference(points) && judgeTrendByCurve(points);
}


const closePrices = [100, 102, 105, 103, 104, 106, 108, 107, 109, 110];

// 计算5日均线
// function calculateMA5(prices) {
//   const ma5 = [];
//   for (let i = 0; i < prices.length; i++) {
//     if (i < 4) {
//       // 前4天数据不足，取已有数据的平均值
//       const sum = prices.slice(0, i + 1).reduce((acc, val) => acc + val, 0);
//       ma5.push(sum / (i + 1));
//     } else {
//       const sum = prices.slice(i - 4, i + 1).reduce((acc, val) => acc + val, 0);
//       ma5.push(sum / 5);
//     }
//   }
//   return ma5;
// }

// const ma5Values = calculateMA5(closePrices);