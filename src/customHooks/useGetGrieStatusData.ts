import React, { useEffect, useState } from 'react'
import { useRedux } from './useRedux'
import { getAdminGrievenceStatusDetails } from '../store/adminAction'
import { useSession } from './useSession'
import { setGrieStatusData } from '../store/reducers/dataReducer'
import { setBtnLoader } from '../store/reducers/loginReducer'


export const useGetGrieStatusData = () => {
    const {dispatch} = useRedux()
    const {getValue} = useSession()
    const [buttonId, setButtonId] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchStatusData = async(ccId : number) => {
      setLoading(true)
    let { payload } = await dispatch(getAdminGrievenceStatusDetails({
          appid : getValue() && getValue().data.appId,
          ccId: ccId,
        })) 
        dispatch(setGrieStatusData(payload.complaintData))
        setLoading(false)
        return payload
    }
  
    return {loading, fetchStatusData, buttonId, setButtonId}
}
