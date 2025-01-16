import stockList from "@python/datas/stock-list.json";
import { formatResponse } from "@api/utils";

export const get = async () => formatResponse(stockList);
