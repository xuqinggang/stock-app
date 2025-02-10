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

const Index = observer(() => {
  const { stocksStore } = useStocks();
  const { stocks, stocksHotTopic, stockHotTopicMap, setDimsConditions, dimsConditions } = stocksStore;
  console.log("xxxxstocks", stocks);

  const [formatStocks, setFormatStocks] = useState<IUpStockItemInfo[]>([]);

  const handleQuery = useMemoizedFn((dimsConditions: IDimsCondition[]) => {
    console.log("xxxxxhandleQuery-dimsCondition", dimsConditions);
    setDimsConditions(dimsConditions);
    if (dimsConditions) {
      const formatStocks = formatStocksByIndicatorDims(stocks, dimsConditions);
      setFormatStocks(formatStocks);
      console.log("xxxxxhandleQuery-formatStocks", formatStocks);
    }
  });

  useEffect(() => {
  }, []);
  // console.log("xxxxxmul", multiLine, data);
  return (
    <StocksProvider>
      <div className="flex">
        <div className="w-[720px]">
          <FilterForm onQuery={handleQuery} />
        </div>
        <div>
          <SelectStocksModule stocks={stocks} stockHotTopicMap={stockHotTopicMap} formatStocks={formatStocks} dimsConditions={dimsConditions}/>
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
