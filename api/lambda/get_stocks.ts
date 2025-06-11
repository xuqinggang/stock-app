/**
 * 获取所有股票信息(历史日行情k线数据
 */
// import stockListInfo from "@python/datas/stock-list-hist.json";
import { judgeIfUpTrend, formatResponse, getStockSymbol, getPointsByDayK } from "@api/utils";
import { IStockItemInfo } from "@api/types";
import {summaryStockJson} from '@api/utils';

export const get = async () => {
  return formatResponse(summaryStockJson());
}
