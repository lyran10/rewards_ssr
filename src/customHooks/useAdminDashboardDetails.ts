import React, { useEffect } from 'react'
import { getAdminDashboardDetails } from '../store/adminAction'
import { useSession } from './useSession'
import { useRedux } from './useRedux'
import { setAdminLoader, setSelectedMenuItem } from '../store/reducers/dataReducer'

export const useAdminDashboardDetails = () => {
    const {dispatch, selector} = useRedux()
    const { selectedMenuItem } = selector(state => state.data)
    const {getValue} = useSession()

    const fetchOffers = async() => {
      if(selectedMenuItem){
        dispatch(setAdminLoader(true))
        let { payload } = await dispatch(getAdminDashboardDetails({
              userName : getValue().userName,
              stateId : selectedMenuItem.stateId,
              divId : selectedMenuItem.divId,
              disId : selectedMenuItem.disId,
              ulbId : selectedMenuItem.ulbId,
              userId : getValue() && getValue().level === 4 ? getValue().data.aId : 0
            })) 
        dispatch(setAdminLoader(false))
      }
    }

    useEffect(() => {
      dispatch(setSelectedMenuItem({
        stateId : getValue() && getValue().data.stateId,
        divId : getValue() && getValue().data.divId,
        disId : getValue() && getValue().data.disId,
        ulbId :  getValue() && getValue().data.appId,
        userId : getValue() && getValue().level === 4 ? getValue().data.aId : 0
    }))
    },[])
  
    useEffect(() => {
      fetchOffers()
    },[selectedMenuItem])
  
    return 
}


