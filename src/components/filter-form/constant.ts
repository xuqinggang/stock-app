import { IUpStockItemInfo } from "@api/types";
import { DIM_NAME } from "@shared/constant";
import dayjs from "dayjs";

export const THRESHOLD_OPERATOR_OPTIONS = [
  { label: ">=", value: ">=" },
  { label: ">", value: "<" },
  { label: "<=", value: "<=" },
  { label: "<", value: "<" },
  { label: "=", value: "=" },
];

export const FORM_TEMPLATE_LIST = [
  {
    name: "大阳小阴小阳模板(中京电子)",
    getFormValues: (stocks: IUpStockItemInfo[]) => {
      const len = stocks?.[0]?.hist?.length;
      const endHistItem = stocks?.[0]?.hist?.[len - 1];
      const startHistItem = stocks?.[0]?.hist?.[len - 4];

      const startHistItem2 = stocks?.[0]?.hist?.[len - 13];
      const endHistItem2 = stocks?.[0]?.hist?.[len - 4];
      return {
        dim_conditions: [
          {
            disabled: false,
            is_up_trend: true,
            // 最近3天
            range_date: [dayjs(startHistItem?.日期), dayjs(endHistItem?.日期)],
            dims_threshold: [
              {
                // 有一个大阳线 >=3%
                name: DIM_NAME.BIG_UPPER_LINES,
                operator: ">=",
                threshold: 1,
              },
              {
                // 有一个小阴线
                name: DIM_NAME.SMALL_DOWN_LINES,
                operator: ">=",
                threshold: 1,
              },
              {
                // 有一个小阳线
                name: DIM_NAME.SMALL_UPPER_LINES,
                operator: ">=",
                threshold: 1,
              },
              {
                // 有一个阳上影线
                name: DIM_NAME.YANG_UPPER_SHADOW_LINE,
                operator: ">=",
                threshold: 1,
              },
              {
                // 有一个阴上影线
                name: DIM_NAME.YIN_UPPER_SHADOW_LINE,
                operator: ">=",
                threshold: 1,
              },
              // 每日换手率 >=1%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: ">=",
                threshold: 1,
              },
              // 每日换手率 <= 10%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: "<=",
                threshold: 10,
              },
              // 曲线趋势度
              {
                name: DIM_NAME.TREND_PERCENTAGE,
                operator: "<=",
                threshold: 5,
              },
            ],
          },
          {
            disabled: false,
            is_up_trend: true,
            range_date: [
              dayjs(startHistItem2?.日期),
              dayjs(endHistItem2?.日期),
            ],
            dims_threshold: [
              // 每日换手率 >=1%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: ">=",
                threshold: 1,
              },
              // 每日换手率 <= 10%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: "<=",
                threshold: 10,
              },
            ],
          },
        ],
      };
    },
  },
  {
    name: "三个小阳两个小阴模板(湘潭电化)",
    getFormValues: (stocks: IUpStockItemInfo[]) => {
      const len = stocks?.[0]?.hist?.length;
      const endHistItem = stocks?.[0]?.hist?.[len - 1];
      const startHistItem = stocks?.[0]?.hist?.[len - 6];

      const startHistItem2 = stocks?.[0]?.hist?.[len - 40];
      const endHistItem2 = stocks?.[0]?.hist?.[len - 6];
      return {
        dim_conditions: [
          {
            disabled: false,
            is_up_trend: true,
            // 最近5天
            range_date: [dayjs(startHistItem?.日期), dayjs(endHistItem?.日期)],
            dims_threshold: [
              {
                // 有3个小阳线
                name: DIM_NAME.SMALL_UPPER_LINES,
                operator: ">=",
                threshold: 3,
              },
              {
                // 有2个小阴线
                name: DIM_NAME.SMALL_DOWN_LINES,
                operator: ">=",
                threshold: 2,
              },
              {
                // 有一个阳上影线
                name: DIM_NAME.YANG_UPPER_SHADOW_LINE,
                operator: ">=",
                threshold: 1,
              },
              // 每日换手率 >= 1%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: ">=",
                threshold: 1,
              },
              // 每日换手率 <= 10%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: "<=",
                threshold: 10,
              },
              // 曲线趋势度
              {
                name: DIM_NAME.TREND_PERCENTAGE,
                operator: "<=",
                threshold: 5,
              },
              // 曲线趋势度
              // {
              //   name: DIM_NAME.TREND_PERCENTAGE,
              //   operator: "<=",
              //   threshold: 5,
              // },
            ],
          },
          {
            disabled: false,
            is_up_trend: true,
            range_date: [
              dayjs(startHistItem2?.日期),
              dayjs(endHistItem2?.日期),
            ],
            dims_threshold: [
              // 每日换手率 >=1%
              // {
              //   name: DIM_NAME.TURNOVER_RATE_PER_DAY,
              //   operator: ">=",
              //   threshold: 1,
              // },
              // 每日换手率 <= 10%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: "<=",
                threshold: 10,
              },
              // 市值 <= 100亿
              {
                name: DIM_NAME.MARKET_TOTAL,
                operator: "<=",
                threshold: 100,
              },
            ],
          },
        ],
      };
    },
  },
  {
    name: "近5天大阳小阴模板",
    getFormValues: (stocks: IUpStockItemInfo[]) => {
      const len = stocks?.[0]?.hist?.length;
      const endHistItem = stocks?.[0]?.hist?.[len - 1];
      const startHistItem = stocks?.[0]?.hist?.[len - 5];

      const startHistItem2 = stocks?.[0]?.hist?.[len - 30];
      const endHistItem2 = stocks?.[0]?.hist?.[len - 10];
      return {
        dim_conditions: [
          {
            disabled: false,
            is_up_trend: true,
            // 最近5天
            range_date: [dayjs(startHistItem?.日期), dayjs(endHistItem?.日期)],
            dims_threshold: [
              {
                // 有一个大阳线 >=3%
                name: DIM_NAME.BIG_UPPER_LINES,
                operator: ">=",
                threshold: 1,
              },
              {
                // 有一个小阴线
                name: DIM_NAME.SMALL_DOWN_LINES,
                operator: ">=",
                threshold: 2,
              },
              {
                // 有一个小阳线
                name: DIM_NAME.SMALL_UPPER_LINES,
                operator: ">=",
                threshold: 1,
              },
              {
                // 有一个阳上影线
                name: DIM_NAME.YANG_UPPER_SHADOW_LINE,
                operator: ">=",
                threshold: 1,
              },
              {
                // 有一个阴上影线
                name: DIM_NAME.YIN_UPPER_SHADOW_LINE,
                operator: ">=",
                threshold: 1,
              },
              // 每日换手率 >=1%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: ">=",
                threshold: 1,
              },
              // 每日换手率 <= 10%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: "<=",
                threshold: 10,
              },
              // 曲线趋势度
              // {
              //   name: DIM_NAME.TREND_PERCENTAGE,
              //   operator: "<=",
              //   threshold: 5,
              // },
            ],
          },
          // 最近一天 小阴
          {
            disabled: false,
            is_up_trend: false,
            range_date: [
              dayjs(stocks?.[0]?.hist?.[len - 1]?.日期),
              dayjs(stocks?.[0]?.hist?.[len - 1]?.日期),
            ],
            dims_threshold: [
              {
                // 有一个小阴线
                name: DIM_NAME.SMALL_DOWN_LINES,
                operator: ">=",
                threshold: 1,
              },
            ],
          },
          // 最近前一天 小阴
          {
            disabled: false,
            is_up_trend: false,
            range_date: [
              dayjs(stocks?.[0]?.hist?.[len - 2]?.日期),
              dayjs(stocks?.[0]?.hist?.[len - 2]?.日期),
            ],
            dims_threshold: [
              {
                // 有一个小阴线
                name: DIM_NAME.SMALL_DOWN_LINES,
                operator: ">=",
                threshold: 1,
              },
            ],
          },
          {
            disabled: false,
            is_up_trend: true,
            range_date: [
              dayjs(startHistItem2?.日期),
              dayjs(endHistItem2?.日期),
            ],
            dims_threshold: [
              // 每日换手率 >=1%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: ">=",
                threshold: 1,
              },
              // 每日换手率 <= 10%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: "<=",
                threshold: 10,
              },
              // 市值 <= 100亿
              {
                name: DIM_NAME.MARKET_TOTAL,
                operator: "<=",
                threshold: 100,
              },
            ],
          },
        ],
      };
    },
  },
  {
    name: "2~3连续小阳模板",
    getFormValues: (stocks: IUpStockItemInfo[]) => {
      const len = stocks?.[0]?.hist?.length;
      const endHistItem = stocks?.[0]?.hist?.[len - 1];
      const startHistItem = stocks?.[0]?.hist?.[len - 2];

      const startHistItem2 = stocks?.[0]?.hist?.[len - 30];
      const endHistItem2 = stocks?.[0]?.hist?.[len - 10];
      return {
        dim_conditions: [
          {
            disabled: false,
            is_up_trend: true,
            // 最近2天
            range_date: [dayjs(startHistItem?.日期), dayjs(endHistItem?.日期)],
            dims_threshold: [
              {
                // 有一个小阳线
                name: DIM_NAME.SMALL_UPPER_LINES,
                operator: ">=",
                threshold: 2,
              },
              {
                // 有一个阳上影线
                name: DIM_NAME.YANG_UPPER_SHADOW_LINE,
                operator: ">=",
                threshold: 1,
              },
              {
                // 无下影线
                name: DIM_NAME.NO_DOWN_SHADOW_LINE,
                operator: ">=",
                threshold: 2,
              },
              // 每日换手率 >=1%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: ">=",
                threshold: 1,
              },
              // 每日换手率 <= 10%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: "<=",
                threshold: 10,
              },
            ],
          },
          {
            disabled: false,
            is_up_trend: true,
            range_date: [
              dayjs(startHistItem2?.日期),
              dayjs(endHistItem2?.日期),
            ],
            dims_threshold: [
              // 每日换手率 <= 10%
              {
                name: DIM_NAME.TURNOVER_RATE_PER_DAY,
                operator: "<=",
                threshold: 10,
              },
              // 市值 <= 100亿
              {
                name: DIM_NAME.MARKET_TOTAL,
                operator: "<=",
                threshold: 100,
              },
              // 曲线趋势度
              {
                name: DIM_NAME.TREND_PERCENTAGE,
                operator: "<=",
                threshold: 5,
              },
            ],
          },
        ],
      };
    },
  },
];
