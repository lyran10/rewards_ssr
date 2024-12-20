import React, { useEffect, useState } from 'react'
import { getAdminShopDetails } from '../store/adminAction'
import { useSession } from './useSession'
import { useRedux } from './useRedux'

export const useGetAdminShopDetails = () => {
    const {dispatch} = useRedux()
    const [shopDetails, setShopDetails] = useState<any[]>([])
    const [ loading, setLoading] = useState<boolean>(false)
    const {getValue} = useSession()

    const fetchOffers = async() => {
     setLoading(true)
        let { payload : {shopsDetails}  } = await dispatch(getAdminShopDetails({
              userName : getValue().userName,
              stateId : getValue().data.stateId,
              divId : getValue().data.divId,
              disId : getValue().data.disId,
              ulbId : getValue().data.appId,
              userId : getValue().data.aId
            })) 
        setShopDetails(shopsDetails)
        setLoading(false)
    }

    useEffect(() => {
        fetchOffers()
    },[])
  
    // useEffect(() => {
    //   fetchOffers()
    // },[selectedMenuItem])
  
    return {shopDetails, loading, fetchOffers}
}