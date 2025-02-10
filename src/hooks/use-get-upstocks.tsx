import { useEffect, useState } from "react";
import { useMemoizedFn, useRequest } from "ahooks";
import { get as getUpStocks } from "@api/get_up_stocks";
import { IUpStockItemInfo } from "@api/types";
import { formatStocksByIndicatorDims } from "@/utils/format";

console.log("xxxxgetUpStocks", getUpStocks);
export const useGetUpStocks = () => {
  const [data, setData] = useState<IUpStockItemInfo[]>();
  const { loading, runAsync } = useRequest(
    () => {
      return getUpStocks({});
    },
    {
      manual: true,
    }
  );
  const fetchUpStocks = useMemoizedFn(() =>
    runAsync().then((res) => {
      // setData(
      //   // formatStocksByIndicatorDims(
      //   //   res.data?.filter((item) => item.isUp),
      //   //   {
      //   //     dims_threshold: [
      //   //       {
      //   //         name: "turnover_rate_per_day",
      //   //         operator: ">=",
      //   //         threshold: 3,
      //   //       },
      //   //       {
      //   //         name: "turnover_rate_per_day",
      //   //         operator: "<=",
      //   //         threshold: 8,
      //   //       },
      //   //     ],
      //   //   }
      //   // )
      // );
    })
  );

  useEffect(() => {
    fetchUpStocks();
  }, []);
  return {
    loading,
    data,
  };
};
