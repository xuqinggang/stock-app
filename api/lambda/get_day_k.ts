/**
 * 获取历史日行情k线数据
 */
import stockList from "@python/datas/stock-list.json";
import { formatResponse, getStockSymbol } from "@api/utils";
import axios from "axios";

interface IParams {
  datalen?: Number;
  code?: string;
}
export const get = async ({ datalen = 5, code = "688378" }: IParams) => {
  const res = await axios.get(
    // "http://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=sh688378&scale=240&ma=no&datalen=5",
    "http://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData",
    {
      params: {
        symbol: getStockSymbol(code),
        scale: 240,
        ma: "no",
        datalen,
      },
    }
  );
  console.log('xxxxres', getStockSymbol(code), datalen, code);
  return formatResponse(res.data);
};
