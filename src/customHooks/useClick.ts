import { FormEvent } from 'react'
import { AdminDashData, InputTypes, Offer } from '../types/types'
import { useRedux } from './useRedux'
import { addOffer, claimOffer, editProfileDetails, getShopProfileDetails, login, registration } from '../store/actions'
import { useValidation } from './useValidation'
import { setMsg } from '../store/reducers/apiReducer'
import { getCoord, setBtnLoader, setInputError, toggleLogin } from '../store/reducers/loginReducer'
import { getClaimInfo, getViewInfo, setAdminDashData, setConfirmClaim, setGrieStateId, setGrieStatus, setImgLoading, setLogoutPopup, setNoOffer, setPageId, setParam, setProfileEdit, setSelectedMenuItem, setShopLocation, setShowShopMap, setStartDate, setViewData } from '../store/reducers/dataReducer'
import { ERRORS, MSG, URL } from '../types/constants'
import { useSession } from './useSession'
import { useNavigate,useLocation } from 'react-router-dom'
import { isActive } from '../dashComponents/offerDetails/offerDetails'
import { adminGrievenceStatusUpdate } from '../store/adminAction'

export const useClick = () => {
const location = useLocation().pathname.split("/")[1]
const {getLoginToggleValue, getValue, getOfferValues, removeSession , storeEditOffer, handleSession, removeOfferValues, handleSessionLoginToggleValue} = useSession()
const navigate = useNavigate()
const {dispatch} = useRedux()
const {loginValidation, registrationValidation, addOffersValidation, grieStatusUpdateValidation, editProfileValidation} = useValidation()

// login
const handleLogin = async(e : FormEvent, data : InputTypes) => {
e.preventDefault()
dispatch(setBtnLoader(true))

if(!loginValidation(data)){
  dispatch(setMsg({status : "error", content : ERRORS.FIELD_REQIURED}))
  dispatch(setInputError(true))
  dispatch(setBtnLoader(false))
  return
}

if(loginValidation(data) === "less then min"){
  dispatch(setMsg({status : "error", content : ERRORS.PASSWORD_LENGTH}))
  dispatch(setBtnLoader(false))
  return
}

let res
if(location.toLowerCase() === "admin") res = await dispatch(login({loginData : data as InputTypes, url : URL.ADMIN_LOGIN}))
else res = await dispatch(login({loginData : data as InputTypes, url : URL.SHOP_LOGIN}))
dispatch(setBtnLoader(false))

if(res.payload.status === "Success"){
  if(res.payload.level || res.payload.level === 0) handleSession({data : res.payload.data, level : res.payload.level, userName : data.userName});
  else handleSession(res.payload.data);
  dispatch(setInputError(false))
  navigate("cms/dashboard/home")
 }
}

// registration
const handleRegistration = async(e : FormEvent,data : InputTypes) => {
    e.preventDefault()
    dispatch(setBtnLoader(true))
    
    if(!registrationValidation(data)){
      dispatch(setMsg({status : "error", content : ERRORS.FIELD_REQIURED}))
      dispatch(setInputError(true))
      dispatch(setBtnLoader(false))
      return
    }

    if(registrationValidation(data) === "noMatch"){
      dispatch(setMsg({status : "error", content : ERRORS.NO_MATCH}))
      dispatch(setBtnLoader(false))
      return
    }

    if(registrationValidation(data) === "lessThen10"){
      dispatch(setMsg({status : "error", content : ERRORS.MOBILE_NO_LENGTH}))
      dispatch(setBtnLoader(false))
      return
    }

    if(registrationValidation(data) === "lessThen6"){
      dispatch(setMsg({status : "error", content : ERRORS.PIN_CODE_LENGTH}))
      dispatch(setBtnLoader(false))
      return
    }

    let formData = new FormData();

    let instance = formData
    // Append each property manually
    instance.append('Name', data.name);
    instance.append('Username', data.userName);
    instance.append('Password', data.password);
    instance.append('Contact_No', data.mobileNo);
    instance.append('Address', data.address);
    instance.append('PinCode', `${data.pinCode}`);
    instance.append('Lat', `${data.latitude}`);
    instance.append('Long', `${data.longitude}`);
    instance.append('CatId', `${data.catId}`);
    instance.append('ShopLogoImg', data.logo ? data.logo : data.draggedImage);
    instance.append('stateid', `${data.stateid}`);
    instance.append('divid', `${data.divid}`);
    instance.append('disid', `${data.disid}`);
    instance.append('appid', `${data.appid}`);

    const {payload : {status}} = await dispatch(registration(instance as any))
    dispatch(setBtnLoader(false))
    if(status === "Success"){
      dispatch(toggleLogin(true))
      handleSessionLoginToggleValue(true)
    }
  }

const handleLoginToggle = (handleResetData : (setData : any) => void, setData : React.Dispatch<React.SetStateAction<InputTypes>>) => {
      handleResetData(setData)
      dispatch(toggleLogin(true))
      handleSessionLoginToggleValue(true)
      dispatch(setInputError(false))
  }

const handleCoordinates = (coordinates : any, handleShowConfirmed : () => void, handleRemoveConfirmed : () => void) => {
  dispatch(getCoord(coordinates))
  handleShowConfirmed()

  setTimeout(() => {
    handleRemoveConfirmed()
  }, 3000)
}

function handleViewImage(e : React.FormEvent, data : InputTypes,str : string, handleImageChange : (data : InputTypes) => void, handlePopOverShow : (str : string) => void) {
e.preventDefault()
dispatch(setImgLoading(true))
handleImageChange(data)
handlePopOverShow(str)
}

function handleGeolocation(e : React.FormEvent, str : string ,handlePopOverShow : (str : string) => void) {
  e.preventDefault()
  handlePopOverShow(str)
}

// add offers
const handleAddOffers = async(e : FormEvent,data : InputTypes) => {
e.preventDefault()
dispatch(setBtnLoader(true))

if(!addOffersValidation(data)){
  dispatch(setMsg({status : "error", content : ERRORS.FIELD_REQIURED}))
  dispatch(setInputError(true))
  dispatch(setBtnLoader(false))
  return
}

if(addOffersValidation(data) === "lessThen6"){
  dispatch(setMsg({status : "error", content : ERRORS.COUPON_CODE_LENGTH}))
  dispatch(setBtnLoader(false))
  return
}

const sendImage = (logo : any, dragged : any) => {

    if(dragged) return dragged
    if(logo && typeof(logo) === "string") return null
    return logo
}

let formData = new FormData();
let instance = formData
// Append each property manually
instance.append('Subcatid', getValue().id);
instance.append('OfferTitle', data.OfferTitle);
instance.append('OfferDiscount', data.OfferDiscount);
instance.append('Start_Datetime', `${data.start_Date} ${data.start_Time}${getOfferValues() ? "" : ":00"}`);
instance.append('End_Datetime', `${data.end_Date} ${data.end_Time}${getOfferValues() ? "" : ":00"}`);
instance.append('Offer_Desc', data.Offer_Desc);
instance.append('Offer_terms', `${data.Offer_terms}`);
instance.append('Req_Coins', `${data.Req_Coins}`);
instance.append('IsActive', `${data.isActive}`);
instance.append('OfferImg', sendImage(data.logo, data.draggedImage));
instance.append('CouponCode', `${data.CouponCode}`);
instance.append('updateImg', `${!getOfferValues()  ? false : getOfferValues() && (data.logo && typeof(data.logo) === "string") ? false : true}`);

const { payload } = await dispatch(addOffer({userDetails :instance as any, offerId : getOfferValues() ? getOfferValues().offerId : 0}))
dispatch(setBtnLoader(false))
if(payload.status === "Success") navigate("/cms/offers/offerDetails")

}

// profile
const handleEditProfieData = async(e : FormEvent,data : InputTypes) => {
  e.preventDefault()
  dispatch(setBtnLoader(true))
 
  if(!editProfileValidation(data)){
    dispatch(setMsg({status : "error", content : ERRORS.FIELD_REQIURED}))
    dispatch(setInputError(true))
    dispatch(setBtnLoader(false))
    return
  }

  if(editProfileValidation(data) === "lessThen10"){
    dispatch(setMsg({status : "error", content : ERRORS.MOBILE_NO_LENGTH}))
    dispatch(setBtnLoader(false))
    return
  }

    let formData = new FormData();
  console.log(data)
    let instance = formData
    // Append each property manually
    instance.append('Name', data.name);
    // instance.append('Username', `null`);
    // instance.append('Password', `null`);
    instance.append('Contact_No', data.mobileNo);
    instance.append('Address', data.address);
    instance.append('PinCode', `0`);
    instance.append('Lat', `0`);
    instance.append('Long', `0`);
    instance.append('CatId', `0`);
    instance.append('ShopLogoImg', data.logo ? data.logo : data.draggedImage);
    instance.append('stateid', `0`);
    instance.append('divid', `0`);
    instance.append('disid', `0`);
    instance.append('appid', `0`);

    const {payload} = await dispatch(editProfileDetails({id : getValue().id, profileData : instance as any}))
    if(payload.status === "Success"){
      dispatch(setProfileEdit(false))
    } 
    console.log(payload)
    dispatch(setBtnLoader(false))
}

const generateCoupon = (e : FormEvent, data : InputTypes, setData : React.Dispatch<React.SetStateAction<InputTypes>>) => {
  e.preventDefault()
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let coupon = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    coupon += characters[randomIndex];
  }

  setData({...data, CouponCode : coupon})
}

// offer details
const navigateToEdit = (data : Offer) => {
  if(!isActive(data.offer_IsActive, data.offer_EndTime)) return dispatch(setNoOffer(true))
    storeEditOffer(data)
    navigate("/cms/offers/addOffers")
}

const navigateToview = (data : Offer) => {
  dispatch(setViewData(true))
  dispatch(getViewInfo(data))
}

// redeemOffer
const confirmClaim = (claim : Offer) => {
dispatch(setConfirmClaim(true))
dispatch(getClaimInfo(claim))
}

const claim = async(claim : any) => {
  dispatch(setBtnLoader(true))
  await dispatch(claimOffer({WalletId : claim.walletId, SubCatId : getValue() && getValue().level || getValue().level === 0 ? getValue().data.aId : getValue().id,  offerid : claim.offerid,}))
  dispatch(setBtnLoader(false))
  dispatch(setConfirmClaim(false))
  }

//nav
const handleNavListItem = (navi : string, id : string) => {

  if(getOfferValues() && navi.split("/")[1] === "addOffers"){
      dispatch(setParam(navi.split("/")[1]))
  }else dispatch(setParam(null))

  

  // dispatch(setEditOffer(null))
  removeOfferValues()
  dispatch(setProfileEdit(false))
  dispatch(setStartDate(null))
  dispatch(setInputError(false))
  dispatch(setSelectedMenuItem(null))
  dispatch(setAdminDashData({} as AdminDashData))
  navigate(navi)
  dispatch(setPageId(id))
}

const logout = () => {
  if(getValue().level || getValue().level === 0){
    dispatch(setSelectedMenuItem(null))
    navigate("/admin")
  } else navigate("/#")
  removeSession()
  dispatch(setProfileEdit(false))
  dispatch(setAdminDashData({} as AdminDashData))
  dispatch(setSelectedMenuItem(null))
  dispatch(setMsg({status : "success", content : "Logged out Successfully."}))
  dispatch(setLogoutPopup(false))
}

// admin / nav
const handleAdminMenuListItem = (e : React.MouseEvent<HTMLElement | HTMLButtonElement>,data : any) => {
  e.stopPropagation()
  dispatch(setSelectedMenuItem(data))
}

// admin  grievance
const getStatusData = async(e : React.FormEvent<Element>, ccId : number, setButtonId : React.Dispatch<React.SetStateAction<number | null>>, fetchStatusData : (ccId : number) => any) => {
  setButtonId(ccId)
  const target = e.currentTarget.id;
  if(target === "Resolved" || target === "Rejected"){
    dispatch(setMsg({status :target === "Resolved" ? "success" : "error", content : MSG.UPDATED_MSG}))
  }else{
    const data = await fetchStatusData(ccId)
    if(data && data.status === "Success"){
      dispatch(setGrieStateId(target))
      dispatch(setGrieStatus(true))
      // dispatch(setGrieStatusInfo({image, address, date }))
    }
    // else{
    //   dispatch(setMsg({status : "error", content : data.message}))
    // }
  }   
} 

const handleCloseGriePopover = (setData : React.Dispatch<React.SetStateAction<InputTypes>>, handleResetData : (setData : React.Dispatch<React.SetStateAction<InputTypes>>) => void,  setImagePreview : any) => {
  dispatch(setGrieStatus(false))
  handleResetData(setData)
  setImagePreview(null)
}

const handleStatusUpdate = async(e : React.FormEvent, data : InputTypes, ccId: number, setBtnId : React.Dispatch<React.SetStateAction<string>>) => {
  e.preventDefault()
  dispatch(setBtnLoader(true))
  const target = e.currentTarget.id
  setBtnId(target)
  if(!grieStatusUpdateValidation(data)){
    dispatch(setMsg({status : "error", content : ERRORS.FIELD_REQIURED}))
    dispatch(setInputError(true))
    dispatch(setBtnLoader(false))
    return
  }
  let formData = new FormData();
  console.log(ccId)
  formData.append('CcId', `${ccId}`);
  formData.append('Status', `${target === "Rej" ? "Rejected" : target === "Res" ? "Resolved" : "Processing"}`);
  formData.append('Status_Des', `${data.grieDetails}`);
  formData.append('StatusImg', data.logo);

  const res = await dispatch(adminGrievenceStatusUpdate({info : formData as any, appid :getValue() && getValue().data.appId}))

  if(res && res.payload.status == "Success"){
    dispatch(setMsg({status : res.payload.status, content : res.payload.message}))
    setTimeout(() => {
      dispatch(setGrieStateId(""))
      dispatch(setGrieStatus(false))
    },500)
  }
  // else{
  //   dispatch(setMsg({status : res.payload.status, content : res.payload.message}))
  // }
   dispatch(setBtnLoader(false))
}

// admin/ shopDetails

const getShopLocation = (location : {latitude : number, longitude : number}) => {
  dispatch(setShopLocation(location))
  dispatch(setShowShopMap(true))
}

  return {
     handleLogin,
     handleRegistration,
     handleLoginToggle,
     handleCoordinates,
     handleViewImage,
     handleGeolocation,
     handleAddOffers,
     handleEditProfieData,
     generateCoupon,
     navigateToEdit,
     navigateToview,
     confirmClaim,
     claim,
     handleNavListItem,
     logout,
     handleAdminMenuListItem,
     getStatusData,
     handleCloseGriePopover,
     handleStatusUpdate,
     getShopLocation
    }
}