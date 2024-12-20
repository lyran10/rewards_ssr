import React from 'react'
import { AdminGoogleMap } from '../dashboard/googleMap'
import { ClosePopOverButton } from '../../../authComponents/closePopOverButton'
import { useRedux } from '../../../customHooks/useRedux'
import { setShowShopMap } from '../../../store/reducers/dataReducer'

export const ShopMapLocationPopover = () => {
    const {dispatch, selector} = useRedux()
    const { shopLocation, showShopMap } = selector(state => state.data)

  return (
    <div className={`w-full h-full justify-center items-center flex ${showShopMap ? "transition-opacity delay-75 opacity-[1]" : " opacity-0"} duration-300`}>
     <AdminGoogleMap id="shopMap" data={[shopLocation]}/>
     <ClosePopOverButton handlePopOverClose={() => dispatch(setShowShopMap(false))}/>
    </div>
  )
}
