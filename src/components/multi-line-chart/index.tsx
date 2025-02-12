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
      width: 530,
      height: 270,
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
          // stroke: (datum) => {
          //   const xValue = datum.x;
          //   console.log("xxxxdatum", datum);
          //   if (
          //     xValue >= divideGroup?.[0]?.[0] &&
          //     xValue <= divideGroup?.[0]?.[1]
          //   ) {
          //     return "red";
          //   }
          //   if (
          //     xValue >= divideGroup?.[1]?.[0] &&
          //     xValue <= divideGroup?.[1]?.[1]
          //   ) {
          //     return "green";
          //   }
          //   return "undefined";
          // },
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
      point: {
        style: {
          fill: (datum) => {
            const xValue = datum.x;
            if (
              xValue >= divideGroup?.[0]?.[0] &&
              xValue <= divideGroup?.[0]?.[1]
            ) {
              return {
                gradient: "linear",
                stops: [
                  {
                    offset: 1,
                    color: "red",
                  },
                ],
              };
            }
            if (
              xValue >= divideGroup?.[1]?.[0] &&
              xValue <= divideGroup?.[1]?.[1]
            ) {
              return {
                gradient: "linear",
                stops: [
                  {
                    offset: 1,
                    color: "green",
                  },
                ],
              };
            }
            return {
              gradient: "linear",
              stops: [
                {
                  offset: 1,
                  color: "#1664ff",
                },
              ],
            };
          },
        },
      },
    };
  }, [multiLine, divideGroup]);

  return <VChartComp className="!h-[270px]" spec={spec} />;
});
