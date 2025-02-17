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

// 方法3：累计变化率法, 计算相邻点间的变化率并累加，反映过程中的总波动强度。
function trendByTotalChange(points: TPoints) {
  const sorted = points;
  if (sorted.length < 2) return { isUp: false, percentage: 0 };
  // if (sorted.length < 2) return { direction: 'neutral', percentage: 0 };

  let total = 0;
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1][1];
    const curr = sorted[i][1];
    if (prev === 0) return { isUp: false, percentage: 0 };
    // if (prev === 0) return { direction: 'neutral', percentage: 0 };
    total += (curr - prev) / prev;
  }

  const percentage = total * 100;
  return {
    // direction: percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'neutral',
    isUp: percentage > 0 ? true : false,
    percentage: Math.abs(percentage),
  };
}

export function judgeIfUpTrend(points: TPoints) {
  const { isUp, percentage } = trendByTotalChange(points);
  return {
    isUp,
    percentage,
  };
  // const isUp = judgeTrendByDifference(points) && judgeTrendByCurve(points);
  // return {
  //   isUp,
  //   percentage: 0,
  // };
}
