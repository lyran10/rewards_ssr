import React from 'react'
import { DashboardHeader } from '../../../commonComponents/dashboardHeader'
import { ValueTitlePair } from './cleanliness/valueTitlePair'
import { useColors } from '../../../customHooks/useColors'
import { useRedux } from '../../../customHooks/useRedux'
import { ShadowLoader } from '../../../commonComponents/shadowLoader'

export const RegDetails = () => {
const {selector} = useRedux()
const { adminDashData : {registration} } = selector(state => state.apiData)
const {adminLoader} = selector(state => state.data)
const {bgColors} = useColors()
const data = [
  {
    classes : "border-r border-r-[2px] w-full",
    value : registration && registration.shops || 0,
    valueColor : "text-orange-600",
    valueSize : "text-[1rem] md:text-[2rem] lg:text-[2rem]",
    title : "Total Shops"
  },
  {
    classes : "border-r border-r-[2px] w-full",
    value : registration && registration.citizens || 0,
    valueColor : "text-green-400",
    valueSize : "text-[1rem] md:text-[2rem] lg:text-[2rem]",
    title : "Total Citizens"
  },
  {
    classes : "w-full",
    value : registration && registration.emp || 0,
    valueColor : "text-red-600",
    valueSize : "text-[1rem] md:text-[2rem] lg:text-[2rem]",
    title : "Total Gantagadi Emp"
  },
]
  return (
    <div className={`w-full h-[50%] shadow-chart rounded-md flex flex-col p-3 ${bgColors.white}`}>
    <DashboardHeader head='Registration Details' classes='self-start'/>
    <div className='flex justify-around items-center h-full'>
    {
          !adminLoader
          ?
          data.map(({classes, value, valueColor, valueSize, title}) => {
            return (
              <ValueTitlePair key={title} classes={classes} value={value} valueColor={valueColor} valueSize={valueSize} title={title}/>
            )
          })
          :
          <ShadowLoader/>
        } 
    </div>
  </div>
  )
}