import React from "react"
import { useColors } from '../../../customHooks/useColors'
import WeekBarChart from './weekBarChart'
import { DashboardHeader } from "../../../commonComponents/dashboardHeader";
import { ShadowLoader } from "../../../commonComponents/shadowLoader";


type Props = {
    loader : boolean
    BarChartColor : string,
    fadedColor : string
    header : string,
    data : {redeemDayName: string, redeemDate: string, redeemCount: number}[] | {claimDayName: string, claimDate: string, claimCount: number}[] | undefined
    keys : {name : string, date : string, count : string}
}

export const sum = (data : {redeemDayName: string, redeemDate: string, redeemCount: number}[] | {claimDayName: string, claimDate: string, claimCount: number}[] | undefined, keys : {name : string, date : string, count : string}) => {
    let total = 0
    let {count} = keys
        if(data && data.length){
            for(let i = 0; i < data.length;i++){
                const currentData = data[i] as any;
                total += currentData[count]
            }
        }
        return total
    }

export const DisplayWeekBarChart = ({loader, BarChartColor, fadedColor,header, data, keys } : Props) => {
    const result = sum(data,keys)
    const {bgColors, textColors} = useColors()

  return (
    <div className={`w-full h-[50%] shadow-chart rounded-md flex ${bgColors.white}`}>
        <DashboardHeader head={header} classes="w-[40%] md:w-[30%] lg:w-[40%] xl:w-[40%] p-3 flex flex-col justify-between">
        {!loader ?   <span className='font-semibold text-[50px] md:text-[35px] lg:text-[50px] xl:text-[50px] self-start'>{result}</span> : <ShadowLoader/>}
      
        </DashboardHeader>
        <div className='relative w-[60%] md:w-[70%] lg:w-[60%] xl:w-[60%] h-full justify-between self-end p-3 flex flex-col gap-2'>
            <span className={`font-semibold text-[14px] self-end px-2 ${textColors.grayish_blue}`}>Last Week</span>
            {
                !loader
                ?
                <>
                  <WeekBarChart result={result} fadedColor={fadedColor} keys={keys} data={data} color={BarChartColor} position="right-0"/>
                </>
                :
                <ShadowLoader/>
            }
           
        </div>
    </div>
  )
}