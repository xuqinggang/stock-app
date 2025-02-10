// 深圳股票前缀
export const SH_SYMBOL_CODE_REFIX = ["60", "688", "900"];
// 上海股票前缀
export const SZ_SYMBOL_CODE_REFIX = ["000", "002", "300", "200"];

export const DIM_NAME = {
  // 换手率
  TURNOVER_RATE_AVERAGE_DAY: "turnover_rate_average_day", // 日均换手率
  TURNOVER_RATE_PER_DAY: "turnover_rate_per_day", // 每日换手率
  TURNOVER_RATE_RECENT: "turnover_rate_recent", // 最近换手率
  TURNOVER_RATE_MAX: "turnover_rate_max", // 最高换手率
  TURNOVER_RATE_MIN: "turnover_rate_min", // 最低换手率

  MARKET_TOTAL: "market_total", // 最新市值
  PARTNER_RECENT_YEAR: "partner_recent_year", // 股东人数
  INCOME_RECENT_YEAR: "income_recent_year", // 营收
  PROFIT_RECENT_YEAR: "profit_recent_year", // 利润
  STOCK_ATTRIBUTION_CODE: "stock_attribution_code", // 板块
};

// 维度, 包含筛选, 多选/单选
export const DIMS_INCLUDE = [
  {
    // https://licai.cofool.com/ask/qa_2922273.html
    // https://blog.csdn.net/qq_15071263/article/details/108445896
    // https://stock.hexun.com/2024-05-23/212942848.html
    name: DIM_NAME.STOCK_ATTRIBUTION_CODE,
    desc: "股票板块",
    options: [
      {
        label: "全部",
        value: "all",
      },
      {
        label: "科创板",
        value: "688",
      },
      {
        label: "创业板",
        value: "30",
      },
      {
        label: "上交-全部", // "上交主板",
        value: "60",
      },
      {
        label: "上交-传统", // "上交主板-传统",
        value: "600",
      },
      {
        label: "上交-蓝筹", // "上交主板-大型国有",
        value: "601",
      },
      {
        label: "上交-中小", // "上交主板-中小型",
        value: "603",
      },
      {
        label: "上交-新兴", // "上交主板-新兴产业",
        value: "605",
      },
      {
        label: "深交-全部", // "深交主板",
        value: "00",
      },
      {
        label: "深交-传统",
        value: "000",
      },
      {
        label: "深交-蓝筹",
        value: "001",
      },
      {
        label: "深交-中小", // "深交中小板",
        value: "002",
      },
      {
        label: "深交-新中小", // "深交中小板",
        value: "003",
      },
      {
        label: "北交所-9",
        value: "920",
      },
      {
        label: "北交所-8",
        value: "8",
      },
      {
        label: "北交所-4",
        value: "4",
      },
      {
        label: "上交-B股",
        value: "900",
      },
      {
        label: "深交-B股",
        value: "200",
      },
    ],
    is_multi: true,
  },
];
// 维度, 阈值筛选, 数字比较
export const DIMS_THRESHOLD = [
  // {
  //   name: "is_up_trend",
  //   desc: "是否趋势上涨",
  // },
  // {
  //   name: "up_trend_value",
  //   desc: "曲线上涨趋势度",
  // },
  // {
  //   name: "up_trend_by_period",
  //   desc: "所选日期趋势上涨",
  // },
  // {
  //   name: "",
  //   desc: "曲线上涨趋势度",
  // },
  {
    name: DIM_NAME.TURNOVER_RATE_AVERAGE_DAY,
    desc: "日均换手率",
    unit: "%",
  },
  {
    name: DIM_NAME.TURNOVER_RATE_PER_DAY,
    desc: "每日换手率",
    unit: "%",
  },
  {
    name: DIM_NAME.TURNOVER_RATE_RECENT,
    desc: "昨日换手率",
    unit: "%",
  },
  {
    name: DIM_NAME.TURNOVER_RATE_MAX,
    desc: "最高换手率",
    unit: "%",
  },
  {
    name: DIM_NAME.TURNOVER_RATE_MIN,
    desc: "最低换手率",
    unit: "%",
  },
  {
    name: DIM_NAME.MARKET_TOTAL,
    desc: "最新市值",
    unit: "亿",
  },
  {
    name: DIM_NAME.PROFIT_RECENT_YEAR,
    desc: "20240930三季报利润", // 依赖api/python/constant.py
    unit: "亿",
  },
  {
    name: DIM_NAME.INCOME_RECENT_YEAR,
    desc: "20240930三季报营收", // 依赖api/python/constant.py
    unit: "亿",
  },
  {
    name: DIM_NAME.PARTNER_RECENT_YEAR,
    desc: "20240930最新股东人数", // 依赖api/python/constant.py
    unit: "人",
  },
  // {
  //   name: "income_recent_3_year",
  //   desc: "近3年营收",
  //   unit: "亿",
  // },
  // {
  //   name: "income_recent_2_year",
  //   desc: "近2年营收",
  //   unit: "亿",
  // },
  // {
  //   name: "income_recent_1_year",
  //   desc: "近1年营收",
  //   unit: "亿",
  // },
  // {
  //   name: "profit_recent_3_year",
  //   desc: "近3年利润",
  //   unit: "亿",
  // },
  // {
  //   name: "profit_recent_2_year",
  //   desc: "近2年利润",
  //   unit: "亿",
  // },
  // {
  //   name: "profit_recent_2_year",
  //   desc: "近1年利润",
  //   unit: "亿",
  // },
];
