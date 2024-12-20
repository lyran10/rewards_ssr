// import Chart from 'react-apexcharts';
import React from "react"
import { useWeekBarChartData } from '../../../customHooks/useWeekBarChartData';
import useDynamicModules from "../../../customHooks/useDynamicModules";

type Props = {
  keys : {name : string, date : string, count : string},
  color : string,
  fadedColor : string,
  result : number,
  data : {redeemDayName: string, redeemDate: string, redeemCount: number}[] | {claimDayName: string, claimDate: string, claimCount: number}[] | undefined,
  position : string
}

const WeekBarChart = ({result, keys, color, fadedColor, data} : Props) => {
  const {chartOptions, chartSeries} = useWeekBarChartData({result, keys ,color, data, fadedColor})
  const ApexCharts = useDynamicModules({library : "react-apexcharts"})

  if (!ApexCharts) return <></>;
  

  return (
    <div className={`w-full h-full static md:absolute lg:absolute xl:absolute right-0`}>
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={"90%"}
      />
    </div>
  );
};

export default WeekBarChart;