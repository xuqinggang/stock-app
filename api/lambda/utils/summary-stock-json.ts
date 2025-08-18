// 将python 生成的json文件信息, 进行股票汇总

import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import { uniqBy } from "lodash";
import stockListHist from "@python/datas/stock-list-hist.json";
import stockListHist2 from "@python/datas/stock-list-hist2.json";
import stockListMarket from "@python/datas/stock-list-market.json";
import stockListIncome from "@python/datas/stock-list-income.json";
import stockListPartner from "@python/datas/stock-list-partner.json";
import { IStockItemInfo } from "@api/types";
import { convertToBillions } from "@api/utils";

export function summaryStockJson() {
  console.log("summaryStockJson");

  return (stockListHist as IStockItemInfo[]).map((stock) => {
    const targetStockHist = (stockListHist2 as IStockItemInfo[])?.find(
      (item2) => item2.code === stock.code
    )?.hist;
    let newHist = [...stock.hist];
    if (targetStockHist) {
      newHist = uniqBy([...stock.hist, ...targetStockHist], "日期");
    }

    const targetMarket = (stockListMarket as any).find(
      (item: any) => item["代码"] === stock.code
    );
    const targetIncome = (stockListIncome as any).find(
      (item: any) => item["股票代码"] === stock.code
    );
    const targetPartner = (stockListPartner as any).find(
      (item: any) => item["证券代码"] === stock.code
    );
    return {
      ...stock,
      hist: newHist,
      market_recent: convertToBillions(targetMarket?.["总市值"]), // 最新市值 亿元
      income_recent_year: convertToBillions(
        targetIncome?.["营业收入-营业收入"]
      ), // 营收 亿元
      profit_recent_year: convertToBillions(targetIncome?.["净利润-净利润"]), // 利润 亿元
      partner_recent_year: targetPartner?.["本期股东人数"], // 最新股东人数
    } as IStockItemInfo;
  });
}
