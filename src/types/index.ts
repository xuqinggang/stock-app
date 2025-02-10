// 表单, 指标阈值/包含
export interface IDimThresholdItem {
  desc?: string; // 维度名
  name: string; //维度名
  operator?: string; // >=,<=,=,<,>
  threshold?: number;
  unit?: string | null;
  values?: Array<string>;
  disabled?: boolean; // 指标项是否禁用
}
// 表单过滤条件
export interface IDimsCondition {
  range_date?: [number, number];
  is_up_trend?: boolean; // 是否时间区间内, 趋势上涨
  dims_threshold: Array<IDimThresholdItem>;
  disabled?: boolean; // 配置组是否禁掉
}

// k线图历史行情数据
export type TKlineHist = Array<{
  close: number;
  high: number;
  low: number;
  open: number;
  timestamp: number;
  volume: number;
}>;

export interface IDimInfoOption {
  label: string;
  value: string;
  _options?: Array<{ label: string; value: string }>;
  unit?: string;
  is_multi?: boolean;
}
