import { memo, useState, useEffect } from "react";
import { useMemoizedFn } from "ahooks";
import { Divider, InputNumber, Button, Select, Input } from "antd";
import cls from "classnames";
import { DeleteOutlined, PauseCircleOutlined } from "@ant-design/icons";
import { IDimsCondition, IDimThresholdItem } from "@/types";
import { DIM_NAME } from "@shared/constant";

import { THRESHOLD_OPERATOR_OPTIONS } from "./constant";
import { DimThresholdItem } from "./dim-threshold-item";
import { AddItemBtn } from "./add-item-btn";

interface IProps {
  disabled?: boolean;
  value?: Array<IDimThresholdItem>;
  onChange?: (value: Array<IDimThresholdItem>) => void;
  dimsOptions: Array<{ label: string; value: string }>;
}
const DEFAULT_DIM_THRESHOLD = {
  name: DIM_NAME.TURNOVER_RATE_PER_DAY,
  operator: ">=",
  threshold: 1,
  unit: "%",
};
export const DimThresholdList = memo((props: IProps) => {
  const { disabled, value, onChange, dimsOptions } = props;
  const [innerValue, setInnerValue] = useState(value ?? []);
  console.log("xxxxvalue", value, dimsOptions);

  const handleItemChange = useMemoizedFn(
    (v: IDimThresholdItem, idx: number) => {
      const newValue = [...innerValue];
      newValue[idx] = v;
      console.log("xxxxxxonchange", onChange, newValue);
      onChange ? onChange?.(newValue) : setInnerValue(newValue);
    }
  );

  const handleItemDelete = useMemoizedFn((idx: number) => {
    console.log("xxxxxxonchange delete", idx, innerValue);
    const newValue = [
      ...innerValue.slice(0, idx),
      ...innerValue.slice(idx + 1),
    ];
    onChange ? onChange?.(newValue) : setInnerValue(newValue);
  });

  const handleItemDisable = useMemoizedFn((idx: number) => {
    const valueItem = innerValue[idx];
    valueItem.disabled = !valueItem.disabled;
    const newValue = [...innerValue];

    onChange ? onChange?.(newValue) : setInnerValue(newValue);
  });

  useEffect(() => {
    value && setInnerValue(value);
  }, [value]);

  if (!innerValue?.length) {
    return (
      <AddItemBtn
        btnNode="条件"
        onItemAdd={() =>
          handleItemChange(
            {
              ...DEFAULT_DIM_THRESHOLD,
              disabled,
            },
            innerValue.length
          )
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {innerValue.map((valueItem, idx) => {
        const showBtn = idx === innerValue.length - 1;
        return (
          <div
            key={`${idx}_${valueItem.name}`}
            className="flex items-center gap-[6px]"
          >
            <DimThresholdItem
              dimsOptions={dimsOptions}
              value={valueItem}
              onChange={(v) => v && handleItemChange(v, idx)}
            />
            <Divider type="vertical" style={{ height: 12, margin: "unset" }} />
            <DeleteOutlined
              onClick={() => {
                handleItemDelete(idx);
              }}
              className="cursor-pointer"
            />
            <PauseCircleOutlined onClick={() => handleItemDisable(idx)} />
            {showBtn && (
              <AddItemBtn
                btnNode={"条件"}
                onItemAdd={() =>
                  handleItemChange({
                    ...DEFAULT_DIM_THRESHOLD,
                    disabled,
                  }, innerValue.length)
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
});
