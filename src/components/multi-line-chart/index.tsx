import { memo, useEffect, useState, useMemo } from "react";

import { VChart as VChartComp } from "@visactor/react-vchart";
import { ILineChartSpec } from "@visactor/vchart";

export interface IProps {
  multiLine: Array<{ x: string; y: number; group: string }>;
  // 用于线, 分段标识
  divideGroup: Array<[string, string]>;
}
export const MultiLineChart = memo((props: IProps) => {
  const { multiLine, divideGroup } = props;
  console.log("xxxxdivideGroup", divideGroup);
  const spec: ILineChartSpec = useMemo(() => {
    return {
      type: "line",
      // padding: 16,
      width: 500,
      height: 300,
      data: {
        values: multiLine,
      },
      xField: "x",
      yField: "y",
      seriesField: "group",
      // lineLabel: { visible: true },
      legends: [{ visible: true, position: "middle", orient: "bottom" }],
      line: {
        style: {
          //         stroke: () => {
          // return 'color';
          //         },
          curveType: "monotone",
          // fill: (datum) => {
          //   console.log("xxxxdatum", datum);
          //   return {
          //     gradient: "linear",
          //     // x0: 0.5,
          //     // y0: 0,
          //     // x1: 0.5,
          //     // y1: 1,
          //     stops: [
          //       {
          //         offset: 1,
          //         color: "#000",
          //       },
          //       {
          //         offset: 1,
          //         color: "#000",
          //       },
          //     ],
          //   };
          // },
        },
      },
      // point: {
      //   style: {
      //     fill: (datum) => {
      //       console.log("xxxxdatum", datum);
      //       if (datum.x)
      //         // return {};
      //       return {
      //         gradient: "linear",
      //         // x0: 0.5,
      //         // y0: 0,
      //         // x1: 0.5,
      //         // y1: 1,
      //         stops: [
      //           {
      //             offset: 0,
      //             color: "red",
      //           },
      //           {
      //             offset: 1,
      //             color: "red",
      //           },
      //         ],
      //       };
      //     },
      //   },
      // },
    };
  }, [multiLine]);

  return <VChartComp className="!h-[300px]" spec={spec} />;
});
