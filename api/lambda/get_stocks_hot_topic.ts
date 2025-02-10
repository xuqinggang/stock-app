/**
 * 获取所有股票信息(历史日行情k线数据
 */
import stocksHotTopic from "@shell/datas/stock_hot_topic.json";
import { formatResponse } from "@api/utils";

export const get = async () => {
  return formatResponse(stocksHotTopic);
};
