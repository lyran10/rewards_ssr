import React from "react"
import { PieChart } from './pieChart'
import { useColors } from '../../../customHooks/useColors'
import { DashboardHeader } from "../../../commonComponents/dashboardHeader"
import { useRedux } from "../../../customHooks/useRedux"
import { useSession } from "../../../customHooks/useSession"
import { ShadowLoader } from "../../../commonComponents/shadowLoader"

type Props = {
  data : {redeemCount: number, claimCount: number},
  loader : boolean
}

export const DisplayPieChart = ({loader,data} : Props) => {
    const {bgColors} = useColors()

  return (
      <div className={`relative w-full md:w-[45%] lg:w-[40%] xl:w-[30%] h-auto flex justify-between items-center flex-col rounded-md shadow-chart p-3 ${bgColors.white}`}>
          <span className='font-semibold text-[14px] self-start'>Today's Status</span>
          {!loader ? <PieChart data={data}/> : <ShadowLoader/>}
      </div>
  )
}
