import { getStockAttributionCode } from "@/utils";
import { IUpStockItemInfo } from "@api/types";
import { Tag } from "antd";

interface IProps {
  formatStocks: IUpStockItemInfo[];
}

export const CheckedStocksList = (props: IProps) => {
  const { formatStocks } = props;
  return (
    <div className="flex flex-col">
      {formatStocks
        ?.filter((item) => item.isChecked)
        ?.map((stockItem) => (
          <div
            className="flex items-center justify-between"
            key={stockItem.code}
          >
            <Tag className="w-[78px]">
              {getStockAttributionCode(stockItem.code)}
            </Tag>
          </div>
        ))}
    </div>
  );
};
