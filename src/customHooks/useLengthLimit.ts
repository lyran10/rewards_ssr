import React from 'react'
import { LENGTHS } from '../types/constants'

export const checkDateLimit = (str : string) => {
  let date = str.split("-")
  if(date[0].length > 4) return false
  return true
}

export const useLengthLimit = () => {
  
const checkLimit = (e : React.ChangeEvent<HTMLInputElement>) => {
        // if((e.currentTarget.name === "password" || e.currentTarget.name === "confirmPassword" ) && e.currentTarget.value.length > LENGTHS.PASS_MAX_LENGTH) return false
        if(e.currentTarget.name === "name" && e.currentTarget.value.length > LENGTHS.NAME_MAX_LENGTH) return false
        else if(( e.currentTarget.name === "userName" ) && e.currentTarget.value.length > LENGTHS.USERNAME_MAX_LENGTH) return false
        else if((e.currentTarget.name === "password" || e.currentTarget.name === "confirmPassword" ) && e.currentTarget.value.length > 20) return false
        else if(e.currentTarget.name === "mobileNo" && e.currentTarget.value.length > 10) return false
        else if(e.currentTarget.name === "CouponCode" && e.currentTarget.value.length > 10) return false
        else if(e.currentTarget.name === "OfferTitle" && e.currentTarget.value.length > 50) return false
        else if(e.currentTarget.name === "OfferDiscount" && e.currentTarget.value.length > 50) return false
        else if(e.currentTarget.name === "pinCode" && e.currentTarget.value.length > 6) return false
        else if((e.currentTarget.name === "end_Date" || e.currentTarget.name === "start_Date") && !checkDateLimit(e.currentTarget.value)) return false
        return true
}
  return { checkLimit } 
}