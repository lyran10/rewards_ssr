import React from "react"
import { DisplayWeekBarChart } from './charts/displayWeekBarChart'
import { DisplayOfferDetailsTable } from './offerDetailsTable/displayOfferDetailsTable'
import { DisplayPieChart } from './charts/displayPieChart'
import { DisplayTotalMonthChart } from './charts/displayTotalMonthChart'
import { useGetDashboardDetails } from '../../customHooks/useGetDashboardDetails'
import { CleanlinessData } from "../admin/dashboard/cleanliness/cleanlinessData"
import { RegDetails } from "../admin/dashboard/regDetails"
import { useSession } from "../../customHooks/useSession"
import { AdminOfferDetails } from "../admin/dashboard/adminOfferDertails/adminOfferDetails"
import { useRedux } from "../../customHooks/useRedux"
import { AdminMap } from "../admin/dashboard/adminMap"

export const Home = () => {
    const {selector} = useRedux()
    const { adminDashData } = selector(state => state.apiData)
    const { adminLoader } = selector(state => state.data)
    const {getValue} = useSession()
    const {dashDetails, loading} = useGetDashboardDetails()

  return (
  <>
    <div className='w-full h-full flex justify-center items-center gap-3 flex-col'>
        <div className='w-full h-full md:h-[67%] lg:h-[67%] xl:h-[67%] flex justify-center items-center gap-3 flex-col md:flex-row lg:flex-row xl:flex-row'>
            {
                getValue() && getValue().level || getValue() && getValue().level === 0
                ?
                <div className='relative h-full w-full md:w-[50%] lg:w-[50%] xl:w-[50%] flex-col rounded-md overflow-hidden flex gap-3 shadow-chart ${bgColors.white}'>
                    <CleanlinessData/>
                    <RegDetails/>
                </div>
                :
                <DisplayOfferDetailsTable data={dashDetails.offerData} loading={loading}/>
            }
            <div className='relative z-[10] h-full w-full md:w-[50%] lg:w-[50%] xl:w-[50%] flex gap-3 flex-col md:flex-row lg:flex-row xl:flex-row'>
            <DisplayPieChart
            loader={getValue() && getValue().level || getValue() && getValue().level === 0 ? adminLoader : loading}
            data={getValue() && getValue().level || getValue() && getValue().level === 0? adminDashData.todayStatus : dashDetails.todayStatus}/>
            <div className='w-full md:w-[55%] lg:w-[60%] xl:w-[70%] h-full flex gap-3 flex-col'>
                <DisplayWeekBarChart loader={getValue() && getValue().level || getValue() && getValue().level === 0 ? adminLoader : loading} keys={{name : "redeemDayName",date: "redeemDate", count :"redeemCount"}} header='Total Redeem' data={getValue() && getValue().level || getValue() && getValue().level === 0 ? adminDashData.lastSenvenDayRedeem : dashDetails.lastSenvenDayRedeem} BarChartColor='#62BBAB' fadedColor="rgba(98,187,171,0.4)"/>
                <DisplayWeekBarChart loader={getValue() && getValue().level || getValue() && getValue().level === 0 ? adminLoader : loading} keys={{name : "claimDayName",date: "claimDate", count :"claimCount"}} header='Total Claim'  data={getValue() && getValue().level || getValue() && getValue().level === 0 ? adminDashData.lastSenvenDayClaim : dashDetails.lastSenvenDayClaim} BarChartColor='#8E8CF6' fadedColor="rgba(142,140,246,0.4)"/>
            </div>
        </div>
    </div>
    <div className='relative z-[11] w-full h-full md:h-[30%] lg:h-[30%] xl:h-[30%] flex justify-center items-center gap-3 flex-col md:flex-row lg:flex-row xl:flex-row'>
        {
            getValue() && getValue().level || getValue() && getValue().level === 0
            ?
            <>
            <AdminOfferDetails />
            <AdminMap/>
            {/* <NewMap /> */}
            {/* <DisplayTotalMonthChart loader={loading} content='Total Claim of the month' keys={{name : "claimDayName",date: "claimDate", count :"claimCount"}} header='Total Claim'  data={dashDetails.lastMonthClaim} BarChartColor='#8E8CF6'/> */}
            </>
            :
            <>
             <DisplayTotalMonthChart loader={loading} content='Total Redeem of the month' keys={{name : "redeemDayName",date: "redeemDate", count :"redeemCount"}} header='Total Redeem' data={dashDetails.lastMonthRedeem} BarChartColor='#62BBAB'/>
             <DisplayTotalMonthChart loader={loading} content='Total Claim of the month' keys={{name : "claimDayName",date: "claimDate", count :"claimCount"}} header='Total Claim'  data={dashDetails.lastMonthClaim} BarChartColor='#8E8CF6'/>
            </>
       
        }
    </div>
</div>
</>
  )
}
