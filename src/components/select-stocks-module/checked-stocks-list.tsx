import { useStocks } from "@/provider/stocks-provider";
import { getStockAttributionCode } from "@/utils";
import { IUpStockItemInfo } from "@api/types";
import { useMemoizedFn } from "ahooks";
import { Button, Tag } from "antd";
import cls from "classnames";
import { useEffect, useMemo } from "react";
import _ from "lodash-es";

interface IProps {
  className?: string;
  formatStocks: IUpStockItemInfo[];
  selectedStock?: IUpStockItemInfo | null;
  onStockSelect?: (stockItem: IUpStockItemInfo, isSelected?: boolean, area?: 'sorted' | 'checked') => void;
  // 点击选中的模块
  clickedArea?: 'sorted' | 'checked';
}

export const CheckedStocksList = (props: IProps) => {
  const { formatStocks, className, onStockSelect, selectedStock, clickedArea } = props;

  const { stocksStore } = useStocks();
  const { stocks, setStorageCheckedStocks, getStorageCheckedStocks } =
    stocksStore;
    console.log('xxxxxclicked', clickedArea);

  const checkedStocks = useMemo(() => {
    const checkedCodes = getStorageCheckedStocks();
    const storageStocks = stocks?.filter((item) =>
      checkedCodes?.includes(item.code)
    );
    return _.uniqBy(
      [...storageStocks, ...formatStocks?.filter((item) => item.isChecked)],
      "code"
    );
  }, [formatStocks]);

  // 本地保存
  const handleSaveClick = useMemoizedFn(() => {
    const checkedCodes = checkedStocks?.map((item) => item.code);
    setStorageCheckedStocks(checkedCodes);
  });

  const PopupKeyUp = useMemoizedFn((e) => {
    if (!selectedStock) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const tIndex = checkedStocks?.findIndex(
      (item) => item.code === selectedStock.code
    );
      console.log('xxxxxxxclickedup', clickedArea, e.code, tIndex, checkedStocks, selectedStock);
    if (clickedArea !== 'checked' || tIndex === -1) {
      return;
    }
    if (e.code === "Escape") {
    }
    if (e.code === "ArrowDown") {
      // 选择下一个
      onStockSelect?.(checkedStocks[tIndex + 1] || null, true, 'checked');
      return false;
    }
    if (e.code === "ArrowUp") {
      console.log('xxxxxxxclickedup', tIndex, checkedStocks);
      // 选择上一个
      onStockSelect?.(checkedStocks[tIndex - 1] || null, true, 'checked');
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
    <div className={cls("flex flex-col", className)}>
      <div className="flex justify-end">
        <Button size="small" type="primary" onClick={handleSaveClick}>
          本地保存
        </Button>
      </div>
      <div
        className={cls(
          "flex flex-col h-[calc(100vh-60px)] px-[3px] gap-y-[5px] overflow-y-auto"
        )}
        style={{ border: "1px solid black" }}
      >
        {checkedStocks?.map((stockItem) => (
          <div
            className="flex items-center justify-between"
            key={stockItem.code}
          >
            <Tag.CheckableTag
              className="cursor-pointer"
              key={stockItem?.code}
              checked={stockItem?.code === selectedStock?.code}
              onChange={(check) => onStockSelect?.(stockItem, check, 'checked')}
            >
              {stockItem.name} - 市值:{stockItem.market_recent?.toFixed(2)} -
              营收:{stockItem.income_recent_year?.toFixed(2)}
            </Tag.CheckableTag>
          </div>
        ))}
      </div>
    </div>
  );
};
