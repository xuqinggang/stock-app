/**
 * 右侧排序的股票列表, 可选中查看K线图、热点话题等信息
 */
import { IUpStockItemInfo } from "@api/types";
import { useMemoizedFn } from "ahooks";
import { getStockAttributionCode } from "@/utils";
import { Button, Card, message, Select, Space, Tag } from "antd";
import { useEffect, useMemo, useState } from "react";
import { CheckSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Updater } from "use-immer";

interface IProps {
  formatStocks: IUpStockItemInfo[];
  setFormatStocks: Updater<IUpStockItemInfo[]>;
  onStockSelect?: (
    stockItem: IUpStockItemInfo,
    isSelected?: boolean,
    area?: "sorted" | "checked"
  ) => void;
  onStockCheck?: (stockItem: IUpStockItemInfo) => void;

  selectedStock?: IUpStockItemInfo | null;
}
export const SortedStocksList = (props: IProps) => {
  const {
    formatStocks,
    setFormatStocks,
    onStockSelect,
    onStockCheck,
    selectedStock,
  } = props;

  // 市值/营收/利润排序(默认升序)
  const [sortMap, setSortMap] = useState({
    // 0: 升序 1: 降序 2:无排序
    market_recent: 0,
    income_recent_year: 2,
    profit_recent_year: 2,
  });

  // 排序
  const handleSort = useMemoizedFn(
    (key: "market_recent" | "income_recent_year" | "profit_recent_year") => {
      const sortTag = sortMap[key];
      setSortMap({
        ...sortMap,
        market_recent: 2,
        income_recent_year: 2,
        profit_recent_year: 2,
        [key]: (Number(sortTag) + 1) % 3,
      });
    }
  );

  // 排序后的股票列表
  // const sortedFormatStocks = useMemo(() => {
  //   const [sortK, sortV] =
  //     Object.entries(sortMap).find(([sortK, sortV]) => sortV <= 1) || [];
  //   if (sortK) {
  //     return formatStocks?.sort((a: any, b: any) =>
  //       sortV === 0 ? a[sortK] - b[sortK] : b[sortK] - a[sortK]
  //     );
  //   }
  //   return formatStocks;
  // }, [formatStocks, sortMap]);

  // 监听键盘事件, 股票添加到备选列表
  const PopupKeyUp = useMemoizedFn((e) => {
    if (!selectedStock) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();

    // 回车确认选择, 添加到备选
    if (e.code === "Enter") {
      onStockCheck?.(selectedStock);
    }
  });

  // 复制导出股票
  const exportStockClick = useMemoizedFn(async () => {
    const copyText = formatStocks
      ?.map((stock) => `${stock.name}(${stock.code})`)
      .join("，");
    await navigator.clipboard.writeText(copyText);
    message.info("复制成功");
  });

  useEffect(() => {
    //监听键盘事件
    document.addEventListener("keyup", PopupKeyUp, false);
    return () => {
      //销毁键盘事件
      document.removeEventListener("keyup", PopupKeyUp, false);
    };
  }, []);

  useEffect(() => {
    const [sortK, sortV] =
      Object.entries(sortMap).find(([_, sortV]) => sortV <= 1) || [];

    if (sortK) {
      setFormatStocks(
        [...formatStocks]?.sort((a: any, b: any) =>
          sortV === 0 ? a[sortK] - b[sortK] : b[sortK] - a[sortK]
        )
      );
    }
  }, [sortMap]);

  return (
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
          <Button size="small" onClick={() => handleSort("income_recent_year")}>
            {sortMap.income_recent_year === 0
              ? "升序"
              : sortMap.income_recent_year === 1
              ? "降序"
              : "无"}
          </Button>
        </div>
        <div>
          利润:{" "}
          <Button size="small" onClick={() => handleSort("profit_recent_year")}>
            {sortMap.profit_recent_year === 0
              ? "升序"
              : sortMap.profit_recent_year === 1
              ? "降序"
              : "无"}
          </Button>
        </div>
        <Button size="small" type="primary" onClick={exportStockClick}>
          复制
        </Button>
      </div>
      <div
        className="flex flex-col h-[calc(100vh-60px)] px-[3px] gap-y-[5px] overflow-y-auto"
        style={{ border: "1px solid black" }}
      >
        {formatStocks?.map((stockItem) => {
          return (
            <div
              className="flex items-center justify-between"
              key={stockItem.code}
            >
              <div className="flex items-center gap-[3px]">
                <Tag className="w-[78px]">
                  {getStockAttributionCode(stockItem.code)}
                </Tag>
                <Tag.CheckableTag
                  className="cursor-pointer"
                  key={stockItem?.code}
                  checked={stockItem?.code === selectedStock?.code}
                  onChange={(check) =>
                    onStockSelect?.(stockItem, check, "sorted")
                  }
                >
                  {stockItem.name} - 市值:{stockItem.market_recent?.toFixed(2)}{" "}
                  - 营收:{stockItem.income_recent_year?.toFixed(2)}
                </Tag.CheckableTag>
              </div>
              {stockItem?.isChecked ? (
                <CheckSquareOutlined
                  style={{ color: "green" }}
                  onClick={() => onStockCheck?.(stockItem!)}
                />
              ) : (
                <PlusSquareOutlined
                  onClick={() => onStockCheck?.(stockItem!)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
