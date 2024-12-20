import React from "react"
import { Navbar } from '../dashComponents/navbar/navbar'
import { Outlet } from 'react-router-dom'
import { Toast } from '../commonComponents/toast'
import { useRedirectIfNotLoggedIn } from '../customHooks/useRedirectIfNotLoggedIn'
import { PopOver } from '../commonComponents/popOver'
import { useRedux } from '../customHooks/useRedux'
import { NoOfferPopup } from '../dashComponents/offerDetails/noOfferPopup'
import { View } from '../dashComponents/offerDetails/view/view'
import { ConfirmClaim } from '../dashComponents/redeemOffers/confirmClaim'
import { GrievViewImagePopup } from "../dashComponents/admin/grievance/grievViewImagePopup"
import { GrieStatusPopup } from "../dashComponents/admin/grievance/grieStatusPopup"
import { ShopMapLocationPopover } from "../dashComponents/admin/adminShopDetails/shopMapLocationPopover"

export const Dashboard = () => {
  const {selector} = useRedux()
  const {grieStatus, grieViewImage, noOffer, viewData, confirmClaim, pageId, showShopMap} = selector(state => state.data)
  useRedirectIfNotLoggedIn()

  return (
    <main className={`relative ${ pageId === "dashboard" ? "h-auto" : "h-screen"} md:h-screen lg:h-screen xl:h-screen w-full bg-[#f3e8ff] overflow-hidden`}>
        <Navbar/>
        <Outlet />
        <Toast/>

        <PopOver width='w-full' bg={`bg-[rgba(255,255,255,.8)]`} animation={`${noOffer ? "flex translate-y-0 transition-opacity delay-50 opacity-[1]" : "hidden translate-y-[1000px] transition-translate delay-300 opacity-0"} duration-300`}>
          <NoOfferPopup/>
        </PopOver>

        <PopOver width='w-full' bg={`bg-[rgba(255,255,255,.8)]`} animation={`${viewData ? "flex translate-y-0 transition-opacity delay-50 opacity-[1]" : "hidden translate-y-[1000px] transition-translate delay-300 opacity-0"} duration-300`}>
          <View/>
        </PopOver>

        <PopOver width='w-full' bg={`bg-[rgba(255,255,255,.8)]`} animation={`${confirmClaim ? "flex translate-y-0 transition-opacity delay-50 opacity-[1]" : "hidden translate-y-[1000px] transition-translate delay-300 opacity-0"} duration-300`}>
          <ConfirmClaim/>
        </PopOver>

        <PopOver width='w-full' bg='bg-[rgba(0,0,0,.6)]' animation={`${ grieViewImage ? "flex translate-y-0 transition-opacity delay-50 opacity-[1]" : "hidden translate-y-[1000px] transition-translate delay-300 opacity-0"} duration-300`}>
          <GrievViewImagePopup />
        </PopOver>

        <PopOver width='w-full' bg='bg-[rgba(0,0,0,.6)]' animation={`${ grieStatus ? "flex translate-y-0 transition-opacity delay-50 opacity-[1]" : "hidden translate-y-[1000px] transition-translate delay-300 opacity-0"} duration-300`}>
          <GrieStatusPopup />
        </PopOver>

        <PopOver width='w-full' bg='bg-[rgba(0,0,0,.6)]' animation={`${ showShopMap ? "flex translate-y-0 transition-opacity delay-50 opacity-[1]" : "hidden translate-y-[1000px] transition-translate delay-300 opacity-0"} duration-300`}>
          <ShopMapLocationPopover/>
        </PopOver>
    </main>
  )
}
