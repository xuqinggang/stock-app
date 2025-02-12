import { autorun, flow, makeAutoObservable, observable, reaction } from "mobx";
import { IStockHotTopic, IUpStockItemInfo, IDimensions } from "@api/types";
import { get as getStocks } from "@api/get_stocks";
import { get as getStocksHotTopic } from "@api/get_stocks_hot_topic";
import { get as getDims } from "@api/get_dims";
import { IDimInfoOption, IDimsCondition } from "@/types";
import dayjs from "dayjs";

const STORAGE_KEY = "stock-app-formvalues";
export class StocksStore {
  // 所有股票
  stocks: Array<IUpStockItemInfo> = [];
  // 股票热点话题
  stocksHotTopic: Array<IStockHotTopic> = [];
  // 股票热点话题 map
  stockHotTopicMap: { [code: string]: IStockHotTopic } = {};

  dimensions: IDimensions | null = null;
  dimsConditions: IDimsCondition[] = [];

  constructor() {
    makeAutoObservable(this, {
      stocks: observable.ref,
      stocksHotTopic: observable.ref,
      stockHotTopicMap: observable.ref,
      dimensions: observable.ref,
      dimsConditions: observable.ref,
    });

    this.fetchStocks();
    this.fetchStocksHotTopic();
    this.fetchDims();
  }

  get dimsOptions(): Array<IDimInfoOption> {
    const stocksOptions = this.stocks?.map(({ name, code }) => ({
      label: name,
      value: code,
    }));
    console.log("xxxxxstocksOptions", stocksOptions);
    return (
      this.dimensions?.dims_threshold_enums?.map(({ name, desc, unit }) => ({
        label: desc,
        value: name,
        unit,
      })) || []
    ).concat(
      (this.dimensions?.dims_include_enums?.map(
        ({ name, desc, options, is_multi, is_tags, is_stocks_options }) => ({
          label: desc,
          value: name,
          _options: options || (is_stocks_options && stocksOptions),
          is_multi,
          is_tags,
        })
      ) as any) || []
    );
  }

  // 获取可选的时间范围
  get enableRangeDate() {
    const hist = this.stocks?.[0]?.hist;

    if (hist) {
      return [dayjs(hist?.[0]?.日期), dayjs(hist?.[hist?.length - 1]?.日期)];
    }
    return [];
  }

  fetchStocksHotTopic = flow(function* (this: StocksStore) {
    try {
      const { data } = yield getStocksHotTopic();
      if (data) {
        console.log("fetchStocksHotTopic", data);
        this.stocksHotTopic = data;
        this.stocksHotTopic?.forEach((item) => {
          this.stockHotTopicMap[item.code] = item;
        });
      }
    } catch (e) {}
  });

  // 获取所有股票信息
  fetchStocks = flow(function* (this: StocksStore) {
    try {
      const { data } = yield getStocks();
      if (data) {
        console.log("fetchStocks", data);
        this.stocks = data;
      }
    } catch (e) {}
  });

  // 获取维度项
  fetchDims = flow(function* (this: StocksStore) {
    try {
      const { data } = yield getDims();
      if (data) {
        this.dimensions = data;
      }
    } catch (e) {}
  });

  setDimsConditions = (dimsConditions: IDimsCondition[]) => {
    this.dimsConditions = dimsConditions;
  };

  setStorage = (formValues: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
  };

  getStorageFormValues = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
    } catch (e) {
      return {};
    }
  };
}

export default new StocksStore();
