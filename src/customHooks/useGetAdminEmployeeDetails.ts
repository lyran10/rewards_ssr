import React, { useEffect, useState } from 'react'
import { getAdminEmployeeDetails } from '../store/adminAction'
import { useSession } from './useSession'
import { useRedux } from './useRedux'

export const useGetAdminEmployeeDetails = () => {
    const {dispatch} = useRedux()
    const [employeeDetails, setEmployeeDetails] = useState<any[]>([])
    const [ loading, setLoading] = useState<boolean>(false)
    const {getValue} = useSession()

    const fetchOffers = async() => {
     setLoading(true)
        let { payload  } = await dispatch(getAdminEmployeeDetails({
              userName : getValue().userName,
              stateId : getValue().data.stateId,
              divId : getValue().data.divId,
              disId : getValue().data.disId,
              ulbId : getValue().data.appId,
              userId : getValue().data.aId
            })) 
            setEmployeeDetails(payload.employeesDetails)
            setLoading(false)
    }

    useEffect(() => {
        fetchOffers()
    },[])
  
    // useEffect(() => {
    //   fetchOffers()
    // },[selectedMenuItem])
  
    return {employeeDetails, loading, fetchOffers}
}