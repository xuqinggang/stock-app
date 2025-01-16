import { useEffect, useState, useMemo } from "react";
import { VChart as VChartComp } from "@visactor/react-vchart";

import { get as hello } from "@api/hello";
import { get as getDayK } from "@api/get_day_k";
import VChart, { ILineChartSpec } from "@visactor/vchart";
import "./index.css";

const Index = () => {
  const [multiValues, setMultiValues] = useState([
    [1, 3, 8, 19],
    [1, 2, 8],
  ]);
  const spec: ILineChartSpec = useMemo(() => {
    // const maxItems = multiValues.reduce((acc, item) => item?.length > acc ? item.length : acc, 0)
    const values: any = [];
    multiValues?.forEach((groupValues, groupKey) => {
      groupValues?.forEach((yValue, xKey) => {
        values.push({
          x: xKey + 1,
          y: yValue,
          group: `group_${groupKey}`,
        });
      });
    });
    return {
      type: "line",
      // padding: 16,
      width: 1000,
      height: 500,
      data: {
        values,
      },
      xField: "x",
      yField: "y",
      seriesField: "group",
      line: {
        style: {
          curveType: "monotone",
        },
      },
    };
  }, [multiValues]);
  useEffect(() => {
    hello();
    getDayK({});
  }, []);
  return (
    <div className="container-box">
      <VChartComp spec={spec} />
    </div>
  );
};

export default Index;
