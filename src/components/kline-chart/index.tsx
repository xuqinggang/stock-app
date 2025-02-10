import { useEffect } from "react";
import { init, dispose, registerLocale } from "klinecharts";
import { TKlineHist } from "@/types";

interface IProps {
  hist: TKlineHist;
}

registerLocale("zh-CN", {
  time: "时间：",
  open: "开：",
  high: "高：",
  low: "低：",
  close: "收：",
  volume: "成交量：",
  turnover: "成交额：",
  change: "涨幅：",
});
export const KLineChart = (props: IProps) => {
  const { hist } = props;
  useEffect(() => {
    const chart = init("chart", {
      styles: {
        candle: {
          bar: {
            upColor: "#F92855",
            downColor: "#2DC08E",
            downBorderColor: "#2DC08E",
            upBorderColor: "#F92855",

            downWickColor: "#2DC08E",
            upWickColor: "#F92855",
          },
        },
      },
    });

    chart?.applyNewData(hist);

    return () => {
      dispose("chart");
    };
  }, [hist]);

  return <div id="chart" style={{ width: 500, height: 300 }} />;
};
