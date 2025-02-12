// export enum ESZ_SYMBOL_CODE_REFIX
// export interface IDayK {
//   close: string;
//   day: string;
//   high: string;
//   low: string;
//   open: string;
//   volume: string; // 成交量
// }
export interface IDayK {
  日期: number;
  开盘: number; // float64
  收盘: number; // float64
  最高: number; // float64
  最低: number; // float64
  成交量: number; // 手
  换手率: number; // %
  涨跌幅: number; // %
  成交额: number; // 元
}

export interface IStockItemInfo {
  code: string;
  name: string;
  hist: Array<IDayK>; // 历史行情数据
  market_recent: number; // 最近市值 亿元
  income_recent_year: number; // 最近年份 营收 亿元
  profit_recent_year: number; // 最近年份 利润 亿元
  partner_recent_year: number; // 最近年份 股东人数
}
export interface IUpStockItemInfo extends IStockItemInfo {
  points?: TPoints;
  rangePoints?: TPoints;
  isUp?: boolean;
  similarity?: number; // 皮尔逊相似度
}

// 股票热点话题/主营业务
export interface IStockHotTopic {
  name: string;
  code: string;
  core_business: string;
  hot_topic: Array<string>;
}

export type TPoints = Array<[number, number]>;

export interface IDimensions {
  dims_threshold_enums: Array<{ desc: string; name: string; unit?: string }>;
  dims_include_enums: Array<{
    desc: string;
    name: string;
    is_multi?: boolean; // mode="multiple"
    is_tags?: boolean; // mode="tags"
    is_stocks_options?: boolean; // options为股票列表
    options: Array<{ label: string; value: string }>;
  }>;
}

// ((turnover_rate_per_day <= 10 && turnover_rate_per_day >= 2) || turnover_rate_max <= 16) && turnover_rate_min >= 1
