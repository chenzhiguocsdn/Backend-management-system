import { useEffect, useRef } from "react";
import * as echarts from "echarts";
let NoPieOption = {
 // 图例文字颜色
 textStyle: {
    color: "#333",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
};

let PieOption = {
    tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
};
const MyEcharts = ({ style, chartData, isPie = false }) => {
  const divUseRef = useRef();
  const echartsRef = useRef(null);
  let option 
  useEffect(() => {
    echartsRef.current = echarts.init(divUseRef.current);
    if(!isPie) {
    console.log('Echarts中chartData.xAxis', chartData.xAxis)

        NoPieOption.xAxis.data = chartData.xAxis
        NoPieOption.series = chartData.series
        option = NoPieOption
    } else {
        PieOption.series = chartData.series
        option = PieOption
    }
    echartsRef.current.setOption(option)
  }, [chartData]);
  return <div style = {style} ref={divUseRef}></div>;
};
export default MyEcharts
