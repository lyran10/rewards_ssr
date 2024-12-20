import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from './useSession'

export const useRedirectIfNotLoggedIn = () => {
//   const status = selector(state => state.loginData.status)
  const navigate = useNavigate()
  const {handleSessionLoginToggleValue, getValue} = useSession()

  useEffect(() => {
    if(getValue() === null) navigate("/")
      // handleSessionLoginToggleValue(true)
  },[])

  return 
}