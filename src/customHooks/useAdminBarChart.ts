import { ApexOptions } from 'apexcharts';
import { count, categories } from './useWeekBarChartData';
import { useRedux } from './useRedux';
import { useEffect, useState } from 'react';
import useDynamicModules from './useDynamicModules';

// type Props = {
//   keys? : {name : string, date : string, count : string},
//   color? : string[],
//   data? : {redeemDayName: string, redeemDate: string, redeemCount: number}[] | {claimDayName: string, claimDate: string, claimCount: number}[] | undefined
// }


const tootip = ["Total Redeem", "Total Claim"]
const tootipColor = ["#62BBAB", "#8E8CF6"]
export const useAdminBarChart = () => {

    const chartOptions : ApexOptions = {
      chart: {
      type: 'bar',
      // height: 300,
      // width : "100%",
      offsetY: 0,
      stacked: false,
      toolbar: {
        show: false
      },
    },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '120%',
            barHeight: '90%', // Ensures bars have the same height
            // borderRadius: 4,
            // dataLabels: {
            //   position: 'outsideTop'
            // } 
          },
       
        },
      //   stroke: {
      //     show: true,
      //     curve: 'straight',
      //     lineCap: 'butt',
      //     colors: ["white"],
      //     width: 2,
      //     dashArray: 0, 
      // },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            let total = opts.config.series[0].data[0].result
            const { seriesIndex } = opts;
            if (seriesIndex === 0) {
              return Math.round((val as number * total) / 100); 
            } else if (seriesIndex === 1) {
              return Math.round((val as number * total) / 100);
            }
          } as (val: string | number | number[], opts?: any) => string | number,
          style: {
              colors: ['white', "white"], // Set the color of the data labels here
              fontSize: '15px', // Optional: Adjust the font size
              fontWeight: 'bold', // Optional: Adjust the font weight
            },
          enabledOnSeries: [0,1],
          textAnchor: "middle",
          // offsetX: -10,
          background: {
            enabled: false,
            foreColor: 'white',
            // borderWidth: 0
          }
        },
        // colors: tootipColor, // Background and real bar colors
        xaxis: {
          // categories: ["total redeem", "total claim"],
          axisBorder: {
            show: false, // Removes the axis line
          },
          axisTicks: {
            show: false, // Removes the ticks on the axis
          },
          labels: {
            show : false,
            style: {
              // colors: tootipColor,
              fontSize: '9px'
            },
          },
          offsetY: -10, // Adjust horizontal offset of axis labels
        },
        yaxis: {
            labels: {
              show: false
            },
            axisBorder: {
                show: false, // Removes the axis line
              },
              axisTicks: {
                show: false, // Removes the ticks on the axis
              },
            // max: maxValue, 
          },
          tooltip: {
            // shared: true,
            // intersect: false,
            custom: function({ series, seriesIndex, dataPointIndex, w }) {
              let value = (series[seriesIndex][dataPointIndex] * w.config.series[0].data[0].result) / 100
              return (
                `<div style="padding:10px;font-size: 12px;background-color : ${tootipColor[seriesIndex]}; color : white; border :none;">` +
                "<span style='font-weight:bold;'>" + tootip[seriesIndex] + "</span> : " + Math.round(value) +
                "</div>"
              );
            }
          },
        legend: {
          show: false,
        },
        grid: {
            show: false, // Optionally hide the grid for a cleaner look
          },
      };
      
       return {chartOptions}
}
