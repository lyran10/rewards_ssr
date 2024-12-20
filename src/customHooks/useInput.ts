import React,{ useState, useEffect } from 'react'
import { InputTypes } from '../types/types'
import { useRedux } from './useRedux'
import { useLocation } from 'react-router-dom'

export const UseInput = ()  => {
const location = useLocation()
const { selector } = useRedux()
const { coords : {lat, lon} } = selector(state => state.loginData)
const [data,setData] = useState({
    name : "",
    userName : "", 
    password : "", 
    confirmPassword : "", 
    CouponCode : "", 
    Req_Coins : "", 
    isActive : `true`,
    mobileNo : "",
    address : "",
    pinCode : "",
    latitude : lat,
    longitude : lon,
    catId : "",
    logo : "",
    disid : "",
    divid : '',
    appid : "",
    stateid : "",

    // add offers
    OfferTitle : "",
    OfferDiscount : "",
    start_Date : new Date().toISOString().split("T")[0],
    end_Date : new Date().toISOString().split("T")[0],
    start_Time : "",
    end_Time : "",
    Offer_Desc : "",
    Offer_terms : "",
    draggedImage : "",

    // offer detail
    search : "",
    // admin/grievance
    grieDetails : ""
} as InputTypes) // create a state

useEffect(() => {
    setData({...data, latitude : lat, longitude : lon})
},[lat, lon])

useEffect(() => {
    if(location.pathname.split("/")[3] === "addOffers"){
        setData({...data, start_Date : "", end_Date : ""})
      }
},[])

const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) =>{
    setData({...data,[e.currentTarget.name] : e.currentTarget.value}) // handle the change event 
}  

return {data, handleChange, setData} // return date and handle change function
}
