import React, { useEffect, useState } from 'react'
import { useRedux } from './useRedux'
import { useSession } from './useSession'
import { getAdminGrievenceDetails } from '../store/adminAction'
import { setAdminLoader } from '../store/reducers/dataReducer'
import { InputTypes } from '../types/types'

type Props = {
  setData : React.Dispatch<React.SetStateAction<InputTypes>>,
  data : InputTypes
}

export const useAdminGrievanceDetails = ({setData, data}  : Props) => {
  const {dispatch, selector} = useRedux()
  const {start_Date, end_Date, isActive} = data
    const { adminLoader, grieStatus } = selector(state => state.data)
    const [grievanceData, setGrievanceData] = useState<any[]>([])
    const {getValue} = useSession()

    const fetchOffers = async() => {
      dispatch(setAdminLoader(true))
    let { payload } = await dispatch(getAdminGrievenceDetails({
          appid : getValue() && getValue().data.appId,
          fromDate : start_Date ? start_Date : new Date().toISOString().split("T")[0],
          toDate : end_Date ? end_Date : new Date().toISOString().split("T")[0],
          sType : isActive === "true" ? "All" : isActive,
        })) 
        setGrievanceData(() => payload.data && payload.data.length ? [...payload.data] : [])
        dispatch(setAdminLoader(false))
    }
  
    useEffect(() => {
      if(!grieStatus) fetchOffers()
    },[grieStatus])

    return {grievanceData, adminLoader, fetchOffers}
}
