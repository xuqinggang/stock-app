import { memo, useState, useEffect } from "react";
import { useMemoizedFn } from "ahooks";
import { InputNumber, Button, Select, Input } from "antd";
import { THRESHOLD_OPERATOR_OPTIONS } from "./constant";
import {
  IDimsCondition,
  IDimInfoOption,
  IDimThresholdItem,
} from "@/types";

interface IProps {
  value: IDimThresholdItem;
  onChange: (value: IDimThresholdItem) => void;
  dimsOptions: Array<IDimInfoOption>;
}
export const DimThresholdItem = memo((props: IProps) => {
  const { value, onChange, dimsOptions } = props;
  const [unit, setUnit] = useState<string | null>(null);
  const [dimInfo, setDimInfo] = useState<IDimInfoOption | null>(
    () =>
      dimsOptions?.find((item) => item.value === value.name) as IDimInfoOption
  );

  // 维度选择
  const handleDimChange = useMemoizedFn((dimName: string) => {
    const selectDimInfo = dimsOptions?.find((item) => item.value === dimName);
    const unit =
      dimsOptions?.find((item) => item.value === dimName)?.unit || null;
    onChange({
      ...value,
      unit,
      name: dimName,
    });
    setDimInfo(selectDimInfo as IDimInfoOption);
    setUnit(unit);
  });

  const handleIncludeChange = useMemoizedFn((values: string | string[]) => {
    onChange({
      ...value,
      values: Array.isArray(values) ? values : [values],
    });
  });
  const handleOperatorChange = useMemoizedFn((operator: string) => {
    onChange({
      ...value,
      operator,
    });
  });

  const handleThresholdInput = useMemoizedFn((threshold) => {
    onChange({
      ...value,
      threshold: Number(threshold),
    });
  });

  useEffect(() => {
    if (!dimsOptions?.length || !value?.name) return;
    const selectDimInfo = dimsOptions?.find((item) => item.value === value.name) as IDimInfoOption;
    setDimInfo(selectDimInfo);
  }, [value, dimsOptions]);

  return (
    <div className="flex items-center whitespace-nowrap gap-[8px]">
      <Select
        className="!w-[200px]"
        value={value.name}
        options={dimsOptions}
        disabled={value?.disabled}
        onChange={handleDimChange}
      />
      {dimInfo?.is_multi || dimInfo?.is_tags ? (
        <>
          <Select
            className="!w-[170px]"
            placeholder="请选择"
            onChange={handleIncludeChange}
            disabled={value?.disabled}
            mode={dimInfo?.is_multi ? "multiple" : dimInfo?.is_tags ? "tags" : undefined}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              || (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
            }
            value={
              dimInfo?.is_tags ? value.values : (
              dimInfo?.is_multi
                ? value.values
                : value.values?.[0]
              )
            }
            options={dimInfo?._options}
          />
        </>
      ) : (
        <>
          <Select
            className="!w-[120px]"
            placeholder="请选择"
            onChange={handleOperatorChange}
            disabled={value?.disabled}
            value={(value as IDimThresholdItem)?.operator}
            options={THRESHOLD_OPERATOR_OPTIONS}
          />
          <InputNumber
            disabled={value?.disabled}
            className="!w-[140px]"
            placeholder="请输入阈值"
            onChange={handleThresholdInput}
            value={(value as IDimThresholdItem)?.threshold}
            addonAfter={unit || (value as IDimThresholdItem)?.unit}
          />
        </>
      )}
    </div>
  );
});
