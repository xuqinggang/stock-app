import { memo, useEffect, useState, useMemo } from "react";
import { Button, Card, Select, Space, Tag } from "antd";
import { useMemoizedFn } from "ahooks";
import { IUpStockItemInfo, IDimensions, IStockHotTopic } from "@api/types";
import { KLineChart } from "@/components/kline-chart";
import { MultiLineChart } from "@/components/multi-line-chart";
import dayjs from "dayjs";
import {
  formatStocksToMultiLine,
  formatStockHistToKLine,
} from "@/utils/format";
import { getStockAttributionCode } from "@/utils";
import { IDimsCondition } from "@/types";

interface IProps {
  stocksHotTopic?: IStockHotTopic[];
  stockHotTopicMap: { [code: string]: IStockHotTopic };
  stocks: IUpStockItemInfo[];
  formatStocks: IUpStockItemInfo[];
  dimsConditions: IDimsCondition[];
}
export const SelectStocksModule = memo((props: IProps) => {
  const { stocks, formatStocks, stockHotTopicMap, dimsConditions } = props;
  const [selectCodeStocks, setSelectCodeStocks] = useState<string[]>([]);
  const [selectTagStock, setSelectTagStock] = useState<IUpStockItemInfo | null>(
    null
  );
  // 市值/营收/利润排序(默认升序)
  const [sortMap, setSortMap] = useState({
    // 0: 升序 1: 降序 2:无排序
    market_recent: 0,
    income_recent_year: 2,
    profit_recent_year: 2,
  });

  // 选中的股票, 热点话题/主营业务
  const selectStockHotTopic = useMemo(() => {
    return stockHotTopicMap[selectTagStock?.code as string];
  }, [selectTagStock, stockHotTopicMap]);

  // 配置时间 分组
  const divideGroup = useMemo(() => {
    console.log("xxxxdimsConditions", dimsConditions);
    return dimsConditions?.map((item) => {
      return [
        dayjs(item?.range_date?.[0]).format("MM-DD"),
        dayjs(item?.range_date?.[1]).format("MM-DD"),
      ];
    }) as Array<[string, string]>;
  }, [dimsConditions]);

  const options = useMemo(() => {
    return formatStocks?.map((item) => ({
      label: item.name,
      value: item.code,
    }));
  }, [formatStocks]);

  // 趋势线
  const multiLine = useMemo(() => {
    console.log(
      "xxxxxselectCodeStocks",
      selectCodeStocks,
      formatStocks,
      formatStocks?.filter(({ code }) => selectCodeStocks.includes(code))
    );
    if (formatStocks?.length) {
      return formatStocksToMultiLine(
        formatStocks?.filter(
          ({ code }) =>
            selectCodeStocks?.includes(code) || selectTagStock?.code === code
        ) || []
      );
    }
    return [];
  }, [selectCodeStocks, selectTagStock, formatStocks]);

  // K线图
  const kLineHist = useMemo(() => {
    return formatStockHistToKLine(selectTagStock!);
  }, [selectTagStock]);

  const sortFormatStocks = useMemo(() => {
    const [sortK, sortV] =
      Object.entries(sortMap).find(([sortK, sortV]) => sortV <= 1) || [];
    if (sortK) {
      formatStocks?.sort((a: any, b: any) =>
        sortV === 0 ? a[sortK] - b[sortK] : b[sortK] - a[sortK]
      );
    } else {
      return formatStocks;
    }
  }, [formatStocks, sortMap]);

  const handleSelectStockChange = useMemoizedFn((value: string[]) => {
    setSelectCodeStocks(value);
    const lastV = value[value?.length - 1];
    if (lastV) {
      const stockItem = formatStocks?.find((item) => item.code === lastV);
      stockItem && setSelectTagStock(stockItem);
    }
  });

  const handleTagClick = useMemoizedFn(
    (stockItem: IUpStockItemInfo, check: boolean) => {
      console.log("xxxxxhandleTagClick", stockItem);
      setSelectTagStock(stockItem);
      if (!check) {
        setSelectTagStock(null);
      }
    }
  );

  const PopupKeyUp = useMemoizedFn((e) => {
    if (!selectTagStock) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const tIndex = formatStocks?.findIndex(
      (item) => item.code === selectTagStock.code
    );
    if (e.code === "Escape") {
    }
    if (e.code === "ArrowDown") {
      setSelectTagStock(formatStocks[tIndex + 1] || null);
      return false;
    }
    if (e.code === "ArrowUp") {
      setSelectTagStock(formatStocks[tIndex - 1] || null);
      return false;
    }
  });

  // 排序
  const handleSort = (
    key: "market_recent" | "income_recent_year" | "profit_recent_year"
  ) => {
    const sortTag = sortMap[key];
    setSortMap({
      ...sortMap,
      market_recent: 2,
      income_recent_year: 2,
      profit_recent_year: 2,
      [key]: (Number(sortTag) + 1) % 3,
    });
  };

  // useEffect(() => {
  //   if (selectTagStock) {
  //   selectCodeStocks?.find(item => item.)
  //   }
  // }, [selectTagStock]);

  useEffect(() => {
    //监听键盘事件
    document.addEventListener("keyup", PopupKeyUp, false);
    return () => {
      //销毁键盘事件
      document.removeEventListener("keyup", PopupKeyUp, false);
    };
  }, []);

  return (
    <div className="flex">
      {/* 中间趋势图+K线图 */}
      <div className="flex flex-col pl-[30px]">
        <div className="flex items-center">
          {/* 选择筛查股票数量 */}
          <Select
            mode="multiple"
            allowClear
            style={{ width: "260px" }}
            placeholder="Please select"
            value={selectCodeStocks}
            onChange={handleSelectStockChange}
            options={options}
          />
          <div className="whitespace-nowrap">
            筛查后的股票数量: {formatStocks?.length}/{stocks?.length}
          </div>
        </div>
        {multiLine?.length && divideGroup?.length && <MultiLineChart multiLine={multiLine} divideGroup={divideGroup} />}
        <div>
          <KLineChart hist={kLineHist} />
          <div className="flex flex-col items-center">
            <div>
              股票名称:{selectTagStock?.name}-{selectTagStock?.code}
              -相似度:{selectTagStock?.similarity?.toFixed(4)}
              -上升度:{selectTagStock?.percentage}
            </div>
            <div>
              市值:{selectTagStock?.market_recent}亿 营收:
              {selectTagStock?.income_recent_year}亿 利润:
              {selectTagStock?.profit_recent_year}亿
            </div>
            {/* 选中股票: 热点话题/主营业务 */}
            <div className="text-[14px] mt-[4px] flex flex-col w-[500px] gap-[4px]">
              <div>
                <span className="text-red">热点话题: </span>
                {selectStockHotTopic?.hot_topic?.join("、")}
              </div>
              <div>
                <span className="text-red">主营业务: </span>
                {selectStockHotTopic?.core_business}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 右侧筛选出的股票列表 */}
      <div className="flex flex-col">
        <div className="flex gap-[5px]">
          <div>
            市值:{" "}
            <Button size="small" onClick={() => handleSort("market_recent")}>
              {sortMap.market_recent === 0
                ? "升序"
                : sortMap.market_recent === 1
                ? "降序"
                : "无"}
            </Button>
          </div>
          <div>
            营收:{" "}
            <Button
              size="small"
              onClick={() => handleSort("income_recent_year")}
            >
              {sortMap.income_recent_year === 0
                ? "升序"
                : sortMap.income_recent_year === 1
                ? "降序"
                : "无"}
            </Button>
          </div>
          <div>
            利润:{" "}
            <Button
              size="small"
              onClick={() => handleSort("profit_recent_year")}
            >
              {sortMap.profit_recent_year === 0
                ? "升序"
                : sortMap.profit_recent_year === 1
                ? "降序"
                : "无"}
            </Button>
          </div>
        </div>
        <div
          className="flex flex-col h-[calc(100vh-60px)] px-[3px] gap-y-[5px] overflow-y-auto"
          style={{ border: "1px solid black" }}
        >
          {formatStocks?.map((stockItem) => {
            return (
              <div className="flex items-center gap-[3px]">
                <Tag className="w-[78px]">
                  {getStockAttributionCode(stockItem.code)}
                </Tag>
                <Tag.CheckableTag
                  className="cursor-pointer"
                  key={stockItem?.code}
                  checked={stockItem?.code === selectTagStock?.code}
                  onChange={(check) => handleTagClick(stockItem, check)}
                >
                  {stockItem.name} - 市值:{stockItem.market_recent?.toFixed(2)}{" "}
                  - 营收:{stockItem.income_recent_year?.toFixed(2)}
                </Tag.CheckableTag>
              </div>
            );
          })}
        </div>
      </div>
          <div></div>
    </div>
  );
});
