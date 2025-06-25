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
    name: "中京电子模板",
    getFormValues: (stocks: IUpStockItemInfo[]) => {
      const lastHistItem = stocks?.[0]?.hist?.[stocks?.[0]?.hist?.length - 1];
      return {
        dim_conditions: [{
          disabled: false,
          is_up_trend: true,
          // 最近3天
          range_date: [dayjs(lastHistItem?.日期).subtract(3, "days"), dayjs(lastHistItem?.日期)],
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
              name: DIM_NAME.UPPER_SHADOW_LINE,
              operator: ">=",
              threshold: 1,
            },
            {
              // 有一个阴上影线
              name: DIM_NAME.DOWN_SHADOW_LINE,
              operator: ">=",
              threshold: 1,
            },
            {
              name: DIM_NAME.TURNOVER_RATE_PER_DAY,
              operator: ">=",
              threshold: 2,
            },
            {
              name: DIM_NAME.TURNOVER_RATE_PER_DAY,
              operator: "<=",
              threshold: 10,
            },
            {
              name: DIM_NAME.TREND_PERCENTAGE,
              operator: "<=",
              threshold: 5,
            },
          ],
        }],
      };
    },
  },
  {
    name: "湘潭电化模板",
  },
];
