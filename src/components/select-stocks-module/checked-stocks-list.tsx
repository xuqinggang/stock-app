import { useStocks } from "@/provider/stocks-provider";
import { getStockAttributionCode } from "@/utils";
import { IUpStockItemInfo } from "@api/types";
import { useMemoizedFn } from "ahooks";
import { Button, message, Tag } from "antd";
import cls from "classnames";
import { memo, useEffect, useMemo } from "react";
import _ from "lodash-es";

interface IProps {
  className?: string;
  formatStocks: IUpStockItemInfo[];
  // checked=true的股票列表
  checkedStocks: IUpStockItemInfo[];
  selectedStock?: IUpStockItemInfo | null;
  onStockSelect?: (
    stockItem: IUpStockItemInfo,
    isSelected?: boolean,
    area?: "sorted" | "checked"
  ) => void;
  onStockRemoveChecked?: (stockItem: IUpStockItemInfo) => void;
  onStockWeightChecked?: (stockItem: IUpStockItemInfo) => void;
  // 点击选中的模块
  clickedArea?: "sorted" | "checked";
}

export const CheckedStocksList = memo((props: IProps) => {
  const {
    formatStocks,
    className,
    selectedStock,
    clickedArea,
    checkedStocks,
    onStockSelect,
    onStockRemoveChecked,
    onStockWeightChecked,
  } = props;

  const { stocksStore } = useStocks();
  const { stocks, setStorageCheckedStocks, getStorageCheckedStocks } =
    stocksStore;

  // const checkedStocksList = useMemo(() => {
  //   const checkedCodes = getStorageCheckedStocks();
  //   const storageStocks = checkedCodes?.map(code => {
  //     return stocks?.find(item => item.code === code);
  //   })
  //   return _.uniqBy(
  //     [...storageStocks, ...formatStocks?.filter((item) => item.isChecked)],
  //     "code"
  //   );
  // }, [formatStocks]);

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
    console.log(
      "xxxxxxxclickedup",
      clickedArea,
      e.code,
      tIndex,
      checkedStocks,
      selectedStock
    );
    if (clickedArea !== "checked" || tIndex === -1) {
      return;
    }
    if (e.code === "Escape") {
    }
    if (e.code === "ArrowDown") {
      // 选择下一个
      onStockSelect?.(checkedStocks[tIndex + 1] || null, true, "checked");
      return false;
    }
    if (e.code === "ArrowUp") {
      console.log("xxxxxxxclickedup", tIndex, checkedStocks);
      // 选择上一个
      onStockSelect?.(checkedStocks[tIndex - 1] || null, true, "checked");
      return false;
    }
  });

  // 复制导出股票
  const exportStockClick = useMemoizedFn(async () => {
    const copyText = checkedStocks
      ?.map((stock) => `${stock.name}(${stock.code})`)
      .join("，");
    await navigator.clipboard.writeText(copyText);
    message.info("复制成功");
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
      <div className="flex justify-end gap-x-[10px]">
        <Button size="small" type="primary" onClick={exportStockClick}>
          复制
        </Button>
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
          <div className="flex items-center gap-x-[2px]" key={stockItem?.code}>
            <Tag.CheckableTag
              className="cursor-pointer"
              key={stockItem?.code}
              checked={stockItem?.code === selectedStock?.code}
              onChange={(check) => onStockSelect?.(stockItem, check, "checked")}
            >
              {stockItem?.name} - 市值:{stockItem?.market_recent?.toFixed(2)} -
              营收:{stockItem.income_recent_year?.toFixed(2)}
            </Tag.CheckableTag>
            <Button
              className="px-0 mr-[2px]"
              type="link"
              size="small"
              onClick={() => onStockRemoveChecked?.(stockItem)}
            >
              移除
            </Button>
            <Button
              className="px-0"
              type="link"
              size="small"
              onClick={() => onStockWeightChecked?.(stockItem)}
            >
              加权
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
});
