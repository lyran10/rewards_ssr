import React, {useEffect, useState} from 'react'
import { useSession } from './useSession'
import { useRedux } from './useRedux'
import { toggleLogin } from '../store/reducers/loginReducer'

const isBrowser = typeof window !== 'undefined';

export const useShowLogin = () => {
    const {selector, dispatch} = useRedux()
    const {getLoginToggleValue, handleSessionLoginToggleValue} = useSession()
    const {login} = selector(state => state.loginData)

    useEffect(() => {
      if(getLoginToggleValue() === false){
        handleSessionLoginToggleValue(false)
        dispatch(toggleLogin(false))
      }else{
        handleSessionLoginToggleValue(true)
        dispatch(toggleLogin(true))
      } 
      },[])

      useEffect(() => {
        console.log(getLoginToggleValue())
    },[login])

  return 
}
