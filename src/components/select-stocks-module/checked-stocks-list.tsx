import { useStocks } from "@/provider/stocks-provider";
import { getStockAttributionCode } from "@/utils";
import { IUpStockItemInfo } from "@api/types";
import { useMemoizedFn } from "ahooks";
import { Button, Tag } from "antd";
import cls from "classnames";
import { useMemo } from "react";
import _ from "lodash-es";

interface IProps {
  className?: string;
  formatStocks: IUpStockItemInfo[];
  selectedStock?: IUpStockItemInfo | null;
  onStockSelect?: (stockItem: IUpStockItemInfo, isSelected?: boolean) => void;
}

export const CheckedStocksList = (props: IProps) => {
  const { formatStocks, className, onStockSelect, selectedStock } = props;

  const { stocksStore } = useStocks();
  const { stocks, setStorageCheckedStocks, getStorageCheckedStocks } =
    stocksStore;

  console.log("xxxxxxformatStocks", formatStocks);

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
              onChange={(check) => onStockSelect?.(stockItem, check)}
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
