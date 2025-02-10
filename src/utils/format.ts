import { IUpStockItemInfo, IStockItemInfo } from "@api/types";
import { DIM_NAME } from "@shared/constant";
import dayjs from "dayjs";
import { IProps } from "@/components/multi-line-chart";
import { getPointsByDayK, judgeIfUpTrend } from "@shared/utils";
import { IDimThresholdItem, IDimsCondition } from "@/types";
import _ from "lodash-es";

const ONE_YI = 100000000;

// 格式化选中的股票为K线图
export function formatStockHistToKLine(stockItem: IUpStockItemInfo) {
  return stockItem?.hist?.map((item) => {
    return {
      high: item.最高,
      low: item.最低,
      close: item.收盘,
      open: item.开盘,
      timestamp: item.日期,
      volume: item.成交量,
    };
  });
}

// 格式化选中的股票数据,为趋势线图
export function formatStocksToMultiLine(data: IUpStockItemInfo[]) {
  const values: IProps["multiLine"] = [];
  data?.forEach?.((item) => {
    return item?.points?.forEach((pointItem, index) => {
      values.push({
        x: dayjs(item?.hist[index]["日期"]).format("MM-DD"),
        y: pointItem[1],
        group: item.name,
      });
    });
  });
  return values;
}

export function judgeMatchThreshold(
  target: number,
  { operator, threshold }: { operator: string; threshold: number }
) {
  switch (operator) {
    case ">=": {
      return target >= threshold;
    }
    case "<=": {
      return target <= threshold;
    }
    case ">": {
      return target > threshold;
    }
    case "<": {
      return target < threshold;
    }
    case "=": {
      return target === threshold;
    }
    default: {
      return true;
    }
  }
}
export function formatStocksByIndicatorDims(
  data: IStockItemInfo[],
  dimsConditions: Array<IDimsCondition>
): IUpStockItemInfo[] {
  // 获取多个条件组筛查出的股票, 最终需要对其取交集
  const stocksRtArr = dimsConditions?.filter(item => !item.disabled)?.map((dimsConditionItem) => {
    return formaStockstByDimConditionItem(dimsConditionItem);
  }) as Array<IUpStockItemInfo[]>;

  console.log('formatStocksByIndicatorDims stocksRtArr', stocksRtArr, dimsConditions)
  return _.intersectionBy(...stocksRtArr, "code");

  function formaStockstByDimConditionItem(dimsConditionItem: IDimsCondition) {
    const { range_date, dims_threshold, is_up_trend } = dimsConditionItem;
    const [start_date, end_date] = range_date || [];
    return data
      ?.map((stockItem) => {
        let stockHist = [...stockItem.hist];
        // 获取选中时间范围内的股票行情, 来判断区间内趋势是否上行
        if (start_date && end_date) {
          stockHist = stockHist?.filter(
            (histItem) =>
              histItem["日期"] >= start_date && histItem["日期"] <= end_date
          );
        }
        const histLen = stockHist?.length;
        const rangePoints = getPointsByDayK(stockHist);
        // 时间区间内是否上行
        const isUp = judgeIfUpTrend(rangePoints);
        if (isUp) {
        console.log('xxxxxxxxxjudgeIfUpTrend', isUp, stockItem.name, start_date, end_date, rangePoints, stockHist, stockItem);
        }

        const filterCondition: Array<() => boolean> = [];
        dims_threshold?.filter(item => !item.disabled)?.forEach((dimThresholdItem) => {
          const { name, operator, threshold, values } =
            dimThresholdItem as Required<IDimThresholdItem>;
          switch (name) {
            // 日均换手率
            case DIM_NAME.TURNOVER_RATE_AVERAGE_DAY: {
              const turnover_rate_average_day = Number(
                (_.sumBy(stockHist, "换手率") / stockHist.length).toFixed(2)
              );
              filterCondition.push(() =>
                judgeMatchThreshold(turnover_rate_average_day, {
                  operator,
                  threshold,
                })
              );
              break;
            }
            // 每日换手率
            case DIM_NAME.TURNOVER_RATE_PER_DAY: {
              filterCondition.push(() =>
                stockHist?.every((stockItem) =>
                  judgeMatchThreshold(stockItem["换手率"], {
                    operator,
                    threshold,
                  })
                )
              );
              break;
            }
            // 最近换手率
            case DIM_NAME.TURNOVER_RATE_RECENT: {
              filterCondition.push(() =>
                judgeMatchThreshold(stockHist?.[histLen - 1]["换手率"], {
                  operator,
                  threshold,
                })
              );
              break;
            }
            // 最高换手率
            case DIM_NAME.TURNOVER_RATE_MAX: {
              filterCondition.push(() =>
                judgeMatchThreshold(
                  _.maxBy(stockHist, "换手率")?.["换手率"] as number,
                  { operator, threshold }
                )
              );
              break;
            }
            // 最低换手率
            case DIM_NAME.TURNOVER_RATE_MIN: {
              filterCondition.push(() =>
                judgeMatchThreshold(
                  _.minBy(stockHist, "换手率")?.["换手率"] as number,
                  { operator, threshold }
                )
              );
              break;
            }
            // 市值
            case DIM_NAME.MARKET_TOTAL: {
              filterCondition.push(() =>
                judgeMatchThreshold(stockItem.market_recent, {
                  operator,
                  threshold: threshold,
                })
              );
              break;
            }
            // 营收
            case DIM_NAME.INCOME_RECENT_YEAR: {
              filterCondition.push(() =>
                judgeMatchThreshold(stockItem.income_recent_year, {
                  operator,
                  threshold: threshold,
                })
              );
              break;
            }
            // 利润
            case DIM_NAME.PROFIT_RECENT_YEAR: {
              filterCondition.push(() =>
                judgeMatchThreshold(stockItem.profit_recent_year, {
                  operator,
                  threshold: threshold,
                })
              );
              break;
            }
            // 股票代码
            case DIM_NAME.STOCK_ATTRIBUTION_CODE: {
              filterCondition.push(() =>
                values?.includes("all")
                  ? true
                  : values.some(
                      (codePrefix) => stockItem.code.indexOf(codePrefix) === 0
                    )
              );
              break;
            }
            // 股东人数
            case DIM_NAME.PARTNER_RECENT_YEAR: {
              filterCondition.push(() =>
                judgeMatchThreshold(stockItem.partner_recent_year, {
                  operator,
                  threshold: threshold,
                })
              );
              break;
            }
            default: {
            }
          }
        });
        const isFilter =
          (is_up_trend ? isUp : !isUp) &&
          filterCondition?.every((funcCondition) => funcCondition());
        return isFilter
          ? ({
              ...stockItem,
              isUp,
              points: getPointsByDayK(stockItem.hist), // 全部时间内的点
              rangePoints, // 时间区间内的点
            } as IUpStockItemInfo)
          : null;
      })
      ?.filter(Boolean);
  }
}
