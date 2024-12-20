import React, { useEffect, useState } from 'react'
import { useRedux } from './useRedux'
import { useSession } from './useSession'
import { getShopProfileDetails } from '../store/actions'

export const useGetProfileDetails = () => {
  const {dispatch,selector} = useRedux()
  const {profileEdit} = selector(state => state.data)
  const {getValue, handleSession} = useSession()
  const [loading, setLoading] = useState<boolean>(false)
  const [profile, setProfileData] = useState<any>({})

  const fetchOffers = async() => {
  setLoading(true)
  const {payload} = await dispatch(getShopProfileDetails(getValue() && getValue().level || getValue().level === 0 ? getValue().data.aId : getValue().id))
  setProfileData(payload.shopProfileData)

  if(payload.status === "Success"){
    if(getValue() && getValue().level === undefined){
      handleSession({id: getValue().id, name: payload.shopProfileData.name, contactNo: payload.shopProfileData.contact_No, address: payload.shopProfileData.address, logo_Url: payload.shopProfileData.shopLogoURL})
    }
  }
  setLoading(false)
}

  useEffect(() => {
    if(!profileEdit) fetchOffers()
  },[profileEdit])

  return {profile, loading}
}
