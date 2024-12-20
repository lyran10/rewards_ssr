import { ApexOptions } from 'apexcharts';
import useDynamicModules from './useDynamicModules';

type Props = {
  keys : {name : string, date : string, count : string},
  color : string,
  fadedColor : string,
  result : number
  data : {redeemDayName: string, redeemDate: string, redeemCount: number}[] | {claimDayName: string, claimDate: string, claimCount: number}[] | undefined
}

export let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] 

export const count = (data : any[] | undefined, keys : {name : string, date : string, count : string}) => { 
  let array = []
  let { count } = keys
  if(data && data.length){
    for(let i = 0; i < data.length;i++){
      array.push(data[i][`${count}`])
    }
  }
  return array
}

export const categories = (data : any[] | undefined, keys : {name : string, date : string, count : string}) => {
  let array = []
  let {name } = keys
    if(data && data.length){
      for(let i = 0; i < data.length;i++){
        const cat = data[i] as any
        array.push(`${cat[`${name}`][0].toUpperCase()}${cat[`${name}`][1]}`)
      }
    }
  return array
}

export const barData = (result : number, data : any[] | undefined, keys : {name : string, date : string, count : string}, color : string) => {
  let obj : any = {}

  const {name, date, count} = keys
    if(data){
    for(let i = 0; i < data.length;i++){
      obj[data[i][name]] = {
        value : data[i][count],
        date : data[i][date],
        day : data[i][name]
      }
    }
    }
 
  let daysData : any = days.map((day) => {
      return {
          x: day,
          y: obj[day] ? (obj[day].value / result) * 100 : 0,
          goals: [
            {
              name: 'Expected',
              value: 100,
              // fillColor: '#EB8C87',
              strokeHeight : 500,
              // strokeWidth: 100,
              strokeColor: color
            }
          ],
        }
  })

  const dates = days.map((day) => {
    if(obj[day]){
      return obj[day].date
    }else{
      return null
    }
  })

  const values = days.map((day) => {
    if(obj[day]){
      return obj[day].value
    }else{
      return null
    }
  })

  const day = days.map((day) => {
    if(obj[day]){
      return obj[day].day
    }else{
      return null
    }
  })

  const showData = {
    data : daysData,
    date : dates,
    values : values,
    days : day
  }

  return showData
  }




export const useWeekBarChartData = ({result, keys, color, fadedColor,data} : Props) => {

  const chartOptions : ApexOptions = {
    chart: {
      type: 'bar',
      height: 300,
      offsetY: 10,
      stacked: false,
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        barHeight: "100%", // Ensures bars have the same height
        borderRadius: 0
      },
    },
    colors: [color, color], // Background and real bar colors
    fill: {
      opacity: [1, 0.4,], // Opacity for background and real bars
    },
    dataLabels: {
      enabled: false,
    },
    // categories(data, keys)
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: {
        show: false, // Removes the axis line
      },
      axisTicks: {
        show: false, // Removes the ticks on the axis
      },
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '7.5px'
        },
      },
      offsetY: -10, // Adjust horizontal offset of axis labels
    },
    yaxis: {
        labels: {
          show: false
        },
        // max: maxValue, 
      },
      tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
         
          const values = barData(result, data,keys, fadedColor)?.values
          let value = values ? values[dataPointIndex] : 0
          const item = barData(result, data,keys, fadedColor)?.date[dataPointIndex] as any
          let split =   item.split("-")
          let date1 = `${split[2]}-${split[1]}-${split[0]}`
          const days = barData(result, data,keys, fadedColor)?.days
          let day = days ? days[dataPointIndex] : ""
          return (
            `<div style="padding:10px;font-size: 12px;background-color : ${color}; color : white; border :none;">` +
            '<span style="font-weight:bold;">Date: </span>' + day +
            "<br/>" +
            '<span style="font-weight:bold;">Date: </span>' + date1 +
            "<br/>" +
            '<span style="font-weight:bold;">Count: </span>' + value +
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

  let chartSeries = [
    {
      name: 'data',
      data: barData(result, data,keys, fadedColor)?.data
    },
  ]

  return {chartOptions, chartSeries}
}