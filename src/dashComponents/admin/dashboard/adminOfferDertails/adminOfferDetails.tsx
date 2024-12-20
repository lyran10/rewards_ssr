import React from 'react'
import { useColors } from '../../../../customHooks/useColors'
import { DashboardHeader } from '../../../../commonComponents/dashboardHeader'
import { ValueTitlePair } from '../cleanliness/valueTitlePair'
import { AdminBarChart } from './adminBarChart'
import { useRedux } from '../../../../customHooks/useRedux'
import { ShadowLoader } from '../../../../commonComponents/shadowLoader'

export const AdminOfferDetails = () => {
const {selector} = useRedux()
const { adminDashData : {offerDetails} } = selector(state => state.apiData)
const { adminLoader } = selector(state => state.data)
const {bgColors} = useColors()
  return (
    <div className='overflow-hidden w-full md:w-[50%] lg:w-[50%] xl:w-[50%] h-full flex justify-center items-center gap-3 flex-col'>
        <div className={`h-full w-full shadow-chart rounded-md flex ${bgColors.white} p-3`}>
        <DashboardHeader head='Offer Details' classes='w-[30%] flex flex-col h-full'>
        { !adminLoader ? <><ValueTitlePair  classes='self-start pl-5' value={offerDetails && offerDetails.totalOffer || 0} valueColor="text-orange-600" valueSize='text-[2rem] md:text-[2.5rem] lg:text-[3rem]' title='Total Offers'/></> : <ShadowLoader/> }
        </DashboardHeader>

        {
         !adminLoader
         ?
          <>
          <AdminBarChart totalOffer={offerDetails && offerDetails.totalOffer || 0} claimOfferCount={offerDetails && offerDetails.claimOfferCount || 0} redeemOfferCount={offerDetails && offerDetails.redeemOfferCount || 0}/>
          </>
         :
          <ShadowLoader/>
        }
        </div>
    </div>
  )
}
