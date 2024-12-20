import React from 'react'
import { useColors } from '../../../customHooks/useColors'
import { MapComponent } from '../../../map/map'
import { useRedux } from '../../../customHooks/useRedux'
import { ShadowLoader } from '../../../commonComponents/shadowLoader'
import { AdminGoogleMap } from './googleMap'

export const AdminMap = () => {
const {selector} = useRedux()
const {bgColors} = useColors()
const {adminDashData : {shopLocationDetails}} = selector(state => state.apiData)
const {adminLoader} = selector(state => state.data)
  return (
    <div className='overflow-hidden w-full md:w-[50%] lg:w-[50%] xl:w-[50%] h-[200px] md:h-full flex justify-center items-center gap-3 flex-col'>
    <div className={`h-full w-full shadow-chart rounded-md flex ${bgColors.white}`}>
      {
        !adminLoader
        ?
        <AdminGoogleMap id='adminGoogleMap' data={shopLocationDetails}/>
        :
        <ShadowLoader/>
      }
    
    </div>
</div>
  )
}
