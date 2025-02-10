import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { IDimsCondition } from "@/types";
import dayjs from "dayjs";
import {
  Button,
  Select,
  Card,
  DatePicker,
  Form,
  Switch,
  Input,
  InputNumber,
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useStocks } from "@/provider/stocks-provider";
import { DimThresholdList } from "./dim-threshold-list";
import { useMemoizedFn } from "ahooks";

const { RangePicker } = DatePicker;

interface IProps {
  onQuery: (query: IDimsCondition[]) => void;
}
export const FilterForm = observer((props: IProps) => {
  const { onQuery } = props;
  const [form] = Form.useForm();
  const userName = Form.useWatch("dim_conditions", form);
  console.log("xxxxxx000", userName);

  const { stocksStore } = useStocks();
  const { enableRangeDate, dimsOptions, setStorage, getStorageFormValues } =
    stocksStore;

  const handleQueryClick = useMemoizedFn(() => {
    const formValues = form.getFieldsValue();
    setStorage(formValues);
    const dimConditions = formValues?.dim_conditions?.map((item: any) => ({
      ...item,
      range_date: [
        item.range_date?.[0]?.valueOf(),
        item.range_date?.[1].add(1, 'day')?.valueOf(),
      ],
    }));
    console.log("xxxxxx formValues", formValues, dimConditions);
    onQuery(dimConditions);
  });

  // 配置组-禁用
  const handleGroupDisable = useMemoizedFn((name, value) => {
    const dimConditionsValues = form.getFieldValue("dim_conditions");
    console.log("xxxxxxdimConditionsValues", dimConditionsValues, name, value);
    const curGroupValue = dimConditionsValues[name];
    const newDimsThresholdValue = curGroupValue.dims_threshold?.map?.(
      (item: any) => ({
        ...item,
        disabled: value,
      })
    );
    form.setFieldValue(
      ["dim_conditions", name, "dims_threshold"],
      newDimsThresholdValue
    );
  });

  useEffect(() => {
    const formValues = getStorageFormValues();
    console.log("xxxxxformValues", formValues);
    const initValues = formValues?.dim_conditions?.map((item: any) => ({
      ...item,
      range_date: [
        item.range_date?.[0] ? dayjs(item.range_date?.[0]) : undefined,
        item.range_date?.[1] ? dayjs(item.range_date?.[1]) : undefined,
      ],
    }));
    form.setFieldsValue({
      dim_conditions: initValues,
    });
    // HACK:待数据请求后
    setTimeout(() => handleQueryClick(), 1000);
  }, []);

  const DEFAULT_DIM_CONDITION = {
    range_date: enableRangeDate,
    is_up_trend: true,
    disabled: false,
  };
  return (
    <Form
      form={form}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      layout="horizontal"
      // disabled={componentDisabled}
      style={{ maxWidth: 700 }}
    >
      <Form.List name="dim_conditions">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map(({ key, name, ...restField }) => {
              const dimConditionsValue = form.getFieldValue("dim_conditions");
              const ifDisabled = dimConditionsValue?.[name]?.disabled;
              return (
                <Card
                  size="small"
                  title={`配置组 ${name + 1}`}
                  style={{ color: "gray" }}
                  key={key}
                  extra={
                    <div className="flex items-center gap-[20px]">
                      <Form.Item
                        {...restField}
                        name={[name, "disabled"]}
                        className="mb-[0px]"
                        // hidden={true}
                      >
                        <Switch
                          className="w-[60px]"
                          checkedChildren="禁用"
                          onChange={(value) => handleGroupDisable(name, value)}
                          // unCheckedChildren="关闭"
                        />
                      </Form.Item>
                      {/* <Button onClick={() => handleDisabled(name)}>禁用</Button> */}
                      <CloseOutlined
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    </div>
                  }
                >
                  <div
                    key={key}
                    style={{ display: "flex-col", marginBottom: 8 }}
                  >
                    {/* <Form.Item
                    {...restField}
                    name={[name, "disabled"]}
                    hidden={true}
                  >
                    <Switch />
                  </Form.Item> */}
                    <Form.Item
                      {...restField}
                      name={[name, "range_date"]}
                      label="时间范围"
                      rules={[{ required: true }]}
                    >
                      <RangePicker
                        disabled={ifDisabled}
                        minDate={enableRangeDate?.[0]}
                        maxDate={enableRangeDate?.[1]}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "is_up_trend"]}
                      label="是否上涨"
                      rules={[{ required: true }]}
                    >
                      <Select
                        disabled={ifDisabled}
                        className="!w-[120px]"
                        options={[
                          { value: true, label: "是" },
                          { value: false, label: "否" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "dims_threshold"]}
                      label="指标过滤"
                    >
                      <DimThresholdList
                        dimsOptions={dimsOptions}
                        disabled={ifDisabled}
                      />
                    </Form.Item>
                  </div>
                </Card>
              );
            })}
            <div className="flex justify-between px-[10px]">
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add(DEFAULT_DIM_CONDITION)}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleQueryClick}>
                  查询
                </Button>
              </Form.Item>
            </div>
          </div>
        )}
      </Form.List>
    </Form>
  );
});
