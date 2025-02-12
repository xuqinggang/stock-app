/**
 * 获取趋势向上的股票信息(历史日行情k线数据
 */
import stockList from "@python/datas/stock-list.json";
import stockListInfo from "@python/datas/stock-list-hist.json";
import {
  judgeIfUpTrend,
  formatResponse,
  getStockSymbol,
  getPointsByDayK,
} from "@api/utils";
import axios from "axios";
import fs from "fs";
import { IStockItemInfo } from "@api/types";
import { summaryStockJson } from "@api/utils";

const STOCK_LIST_INFO = stockListInfo as Array<IStockItemInfo>;

interface IParams {}

const SUMMARY_STOCK_JSON = summaryStockJson();

export const get = async ({}: IParams) => {
  // const data = SUMMARY_STOCK_JSON?.map((stockItem) => {
  //   const points = getPointsByDayK(stockItem.hist);
  //   const isUp = judgeIfUpTrend(points);
  //   return {
  //     ...stockItem,
  //     points,
  //     isUp,
  //   };
  // });
  // return formatResponse(data);
};

// export const get = async ({ datalen = 5 }: IParams) => {
//   // 趋势向上的股票
//   const upStocks = await Promise.all(stockList.map(stock => {
//     return axios.get(
//       // "http://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=sh688378&scale=240&ma=no&datalen=5",
//       "http://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData",
//       {
//         params: {
//           symbol: getStockSymbol(stock.code),
//           scale: 240,
//           ma: "no",
//           datalen,
//         },
//       }
//     ).then(res => {
//       const points = getPointsByDayK(res.data);
//       const isUp = judgeIfUpTrend(points);
//       const data = {
//         stock,
//         points,
//         orgin: res.data,
//         isUp,
//       };
//       return data;
//     }).catch(err => {
//       return null;
//     });
//   }));
//   fs.writeFileSync(SAVE_FILE_PATH, JSON.stringify(upStocks, null, 2));
//   console.log('xxxxxxdddupStockList', upStocks);
//   return formatResponse(upStocks);
// };
