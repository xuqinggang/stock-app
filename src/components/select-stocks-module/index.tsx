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
import { SortedStocksList } from "./sorted-stocks-list";
import { Updater } from "use-immer";
import { CheckedStocksList } from "./checked-stocks-list";
import { useStocks } from "@/provider/stocks-provider";

interface IProps {
  stocksHotTopic?: IStockHotTopic[]; // 股票热点话题列表
  stockHotTopicMap: { [code: string]: IStockHotTopic }; // 股票热点话题 map
  stocks: IUpStockItemInfo[]; // 所有股票
  formatStocks: IUpStockItemInfo[];
  dimsConditions: IDimsCondition[];
  setFormatStocks: Updater<IUpStockItemInfo[]>;
}
export const SelectStocksModule = memo((props: IProps) => {
  const {
    stocks,
    formatStocks,
    stockHotTopicMap,
    dimsConditions,
    setFormatStocks,
  } = props;
  const { stocksStore } = useStocks();
  const { getStorageCheckedStocks } = stocksStore;

  const [clickedArea, setClickedArea] = useState<'sorted' | 'checked'>('sorted');
  // 可查看多个股票的自定义趋势图
  const [selectCodeStocks, setSelectCodeStocks] = useState<string[]>([]);
  // 选中的单个股票
  const [selectTagStock, setSelectTagStock] =
    useState<IUpStockItemInfo | null>();

  // checked=true的股票列表
  const [checkedStocks, setCheckedStocks] = useState<IUpStockItemInfo[]>(() => {
    const checkedCodes = getStorageCheckedStocks();
    console.log('xxxxxcheckedCodes', checkedCodes, stocks);
    const storageStocks = checkedCodes?.map(code => {
      return stocks?.find(item => item.code === code);
    })?.filter(Boolean) as IUpStockItemInfo[];
    return storageStocks;
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

  // 过滤后的股票列表 select options
  const options = useMemo(() => {
    return formatStocks?.map((item) => ({
      label: item.name,
      value: item.code,
    }));
  }, [formatStocks]);

  // 选中股票 - 趋势线
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

  // 选中股票 - K线图
  const kLineHist = useMemo(() => {
    return formatStockHistToKLine(selectTagStock!);
  }, [selectTagStock]);

  // 股票check选中
  const handleCheckStockItem = useMemoizedFn((stockItem: IUpStockItemInfo) => {
    console.log("xxxxhandleCheckStockItem", stockItem, formatStocks);

    // 有则删除, 无则添加
    const cIndex = checkedStocks?.findIndex(
      (item) => item.code === stockItem.code
    );
    if (cIndex >= 0) {
      setCheckedStocks(checkedStocks.filter((item) => item.code !== stockItem.code));
    } else {
      setCheckedStocks([...checkedStocks, stockItem]);
    }

    // 修改 checked 属性
    const tIndex = formatStocks?.findIndex(
      (item) => item.code === stockItem.code
    );
    setFormatStocks((draft) => {
      draft[tIndex].isChecked = !draft[tIndex].isChecked;
    });
  });
  // check选中的股票加权(放后)
  const handleWeightCheckedStockItem = useMemoizedFn((stockItem: IUpStockItemInfo) => {
    checkedStocks?.splice(checkedStocks?.findIndex(item => item.code === stockItem.code), 1);
    checkedStocks.push(stockItem);
    setCheckedStocks([...checkedStocks]);
  });

  const handleSelectStockChange = useMemoizedFn((value: string[]) => {
    setSelectCodeStocks(value);
    const lastV = value[value?.length - 1];
    if (lastV) {
      const stockItem = formatStocks?.find((item) => item.code === lastV);
      stockItem && setSelectTagStock(stockItem);
    }
  });

  // 选中某个股票
  const handleSelectClick = useMemoizedFn(
    (stockItem: IUpStockItemInfo, check?: boolean, area?: 'sorted' | 'checked') => {
      setClickedArea(area || 'sorted');
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
    if (clickedArea !== 'sorted') {
      return;
    }
    if (e.code === "Escape") {
    }
    if (e.code === "ArrowDown") {
      // 选择下一个
      setSelectTagStock(formatStocks[tIndex + 1] || null);
      return false;
    }
    if (e.code === "ArrowUp") {
      // 选择上一个
      setSelectTagStock(formatStocks[tIndex - 1] || null);
      return false;
    }
  });

  useEffect(() => {
    //监听键盘事件
    document.addEventListener("keyup", PopupKeyUp, false);
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "PageUp" ||
        event.key === "PageDown" ||
        event.key === "Space"
      ) {
        event.preventDefault();
      }
    });
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
          {/* 选择筛查股票可查看多个股票的趋势图 */}
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
        {multiLine?.length && divideGroup?.length && (
          <MultiLineChart multiLine={multiLine} divideGroup={divideGroup} />
        )}
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
      {/* 右侧筛选出的股票列表(可排序, 可选中某个) */}
      <SortedStocksList
        selectedStock={selectTagStock}
        onStockSelect={handleSelectClick}
        formatStocks={formatStocks}
        onStockCheck={handleCheckStockItem}
        setFormatStocks={setFormatStocks}
      />
      {/* 最右侧checked=true的股票列表 */}
      <CheckedStocksList
        className="ml-[10px]"
        selectedStock={selectTagStock}
        onStockSelect={handleSelectClick}
        checkedStocks={checkedStocks}
        formatStocks={formatStocks}
        clickedArea={clickedArea}
        onStockRemoveChecked={handleCheckStockItem}
        onStockWeightChecked={handleWeightCheckedStockItem}
      />
    </div>
  );
});
