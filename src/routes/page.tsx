import { useEffect, useState, useMemo } from "react";
import { VChart as VChartComp } from "@visactor/react-vchart";
import { Select, Space } from "antd";
import { useMemoizedFn } from "ahooks";
import { IDimsCondition } from "@/types";

import { IUpStockItemInfo } from "@api/types";
import VChart, { ILineChartSpec } from "@visactor/vchart";
import { KLineChart } from "@/components/kline-chart";
import { MultiLineChart } from "@/components/multi-line-chart";
import { formatStocksToMultiLine } from "@/utils/format";
import { useGetUpStocks } from "@/hooks/use-get-upstocks";
import { StocksProvider } from "@/provider/stocks-provider";
import { FilterForm } from "@/components/filter-form";
import { observer } from "mobx-react-lite";
import { useStocks } from "@/provider/stocks-provider";
import { formatStocksByIndicatorDims } from "@/utils/format";
import { SelectStocksModule } from "@/components/select-stocks-module";
import { useImmer } from "use-immer";

const Index = observer(() => {
  const { stocksStore } = useStocks();
  const { stocks, stockHotTopicMap, setDimsConditions, dimsConditions, getStorageCheckedStocks } =
    stocksStore;
  console.log("xxxxstocks", stocks);

  // 筛查后且排序后的股票列表
  const [formatStocks, setFormatStocks] = useImmer<IUpStockItemInfo[]>([]);

  const handleQuery = useMemoizedFn((dimsConditions: IDimsCondition[]) => {
    setDimsConditions(dimsConditions);

    if (dimsConditions) {
      const formatStocks = formatStocksByIndicatorDims(stocks, dimsConditions, {
        stockHotTopicMap,
      });
      // 缓存里的, 需修正isChecked
      const checkedCodes = getStorageCheckedStocks();
      formatStocks?.forEach(item => {
        if (checkedCodes?.includes(item.code)) {
          item.isChecked = true;
        }
      })
      setFormatStocks(formatStocks);
      console.log("xxxxxhandleQuery-formatStocks", formatStocks);
    }
  });

  useEffect(() => {}, []);
  // console.log("xxxxxmul", multiLine, data);
  return (
    <StocksProvider>
      <div className="flex">
        <FilterForm onQuery={handleQuery} />
        <div className="ml-[6px]">
          {stocks?.length && <SelectStocksModule
            stocks={stocks}
            stockHotTopicMap={stockHotTopicMap}
            formatStocks={[...formatStocks]}
            dimsConditions={dimsConditions}
            setFormatStocks={setFormatStocks}
          />}
        </div>
        {/* <Select
          mode="multiple"
          allowClear
          style={{ width: "800px" }}
          placeholder="Please select"
          value={selectCodeStocks}
          // defaultValue={['a10', 'c12']}
          onChange={handleSelectStockChange}
          options={options}
        /> */}
        {/* <MultiLineChart multiLine={multiLine} /> */}
        {/* <VChartComp spec={spec} /> */}
        {/* <KLineChart /> */}
      </div>
    </StocksProvider>
  );
});

export default Index;
