// 皮尔逊相关系数, 计算2条曲线相似度
export function pearsonCorrelationCoefficient(x: number[], y: number[]) {
  if (x.length !== y.length) {
    return 0;
  }

  const n = x.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i];
    sumY2 += y[i] * y[i];
  }

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
  );

  if (denominator === 0) {
    return 0;
  }

  return numerator / denominator;
}
// // 示例用法
// const curve1 = [1, 2, 2, 3, 2, 4, 3, 3, 4, 2, 4, 3, 5, 6];
// const curve2 = [1, 1, 1, 2, 3, 4, 3, 4, 4, 2, 4, 3, 5, 6];
// const similarity = pearsonCorrelationCoefficient(curve1, curve2);
// console.log('皮尔逊相关系数:', similarity);