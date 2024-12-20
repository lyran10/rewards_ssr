import React, { useEffect, useState } from 'react'
import { getAdminCitizenDetails } from '../store/adminAction'
import { useSession } from './useSession'
import { useRedux } from './useRedux'

export const useGetAdminCitizenDetails = () => {
    const {dispatch} = useRedux()
    const [citizenDetails, setcitizenDetails] = useState<any[]>([])
    const [ loading, setLoading] = useState<boolean>(false)
    const {getValue} = useSession()

    const fetchOffers = async() => {
     setLoading(true)
        let { payload  } = await dispatch(getAdminCitizenDetails({
              userName : getValue().userName,
              stateId : getValue().data.stateId,
              divId : getValue().data.divId,
              disId : getValue().data.disId,
              ulbId : getValue().data.appId,
              userId : getValue().data.aId 
            })) 
            setcitizenDetails(payload.citizensDetails)
            setLoading(false)
    }

    useEffect(() => {
        fetchOffers()
    },[])
  
    // useEffect(() => {
    //   fetchOffers()
    // },[selectedMenuItem])
  
    return {citizenDetails, loading, fetchOffers}
}