import React from 'react'
import { useColors } from '../../../../customHooks/useColors'
import { DashboardHeader } from '../../../../commonComponents/dashboardHeader'
import { ValueTitlePair } from './valueTitlePair'
import { useAdminDashboardDetails } from '../../../../customHooks/useAdminDashboardDetails'
import { useRedux } from '../../../../customHooks/useRedux'
import { ShadowLoader } from '../../../../commonComponents/shadowLoader'

export const CleanlinessData = () => {
const {selector} = useRedux()
const {adminDashData : {cleanliness}} = selector(state => state.apiData)
const {adminLoader} = selector(state => state.data)
const {bgColors, textColors} = useColors()
useAdminDashboardDetails()
const data = [
  {
    classes : "w-full text-[12px]",
    value : cleanliness && cleanliness.total || 0,
    valueColor : textColors.green,
    valueSize : "text-[2rem] md:text-[3rem] lg:text-[3rem]",
    title : "Total Grievance"
  },
  {
    classes : "border-r border-r-[2px] w-full",
    value : cleanliness && cleanliness.pending || 0,
    valueColor : "text-blue-500",
    valueSize : "text-[1rem] md:text-[2rem] lg:text-[2rem]",
    title : "Pending"
  },
  {
    classes : "border-r border-r-[2px] w-full",
    value : cleanliness && cleanliness.processing || 0,
    valueColor : "text-orange-600",
    valueSize : "text-[1rem] md:text-[2rem] lg:text-[2rem]",
    title : "Processing"
  },
  {
    classes : "border-r border-r-[2px] w-full",
    value : cleanliness && cleanliness.resolved || 0,
    valueColor : "text-green-400",
    valueSize : "text-[1rem] md:text-[2rem] lg:text-[2rem]",
    title : "Resolved"
  },
  {
    classes : "w-full",
    value : cleanliness && cleanliness.rejected || 0,
    valueColor : "text-red-600",
    valueSize : "text-[1rem] md:text-[2rem] lg:text-[2rem]",
    title : "Rejected"
  },
]
  return (
    <div className={`w-full h-[50%] shadow-chart rounded-md flex flex-col p-3 ${bgColors.white}`}>
      <DashboardHeader head='Cleanliness Grievance' classes='self-start'/>
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