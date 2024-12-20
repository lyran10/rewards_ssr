import { createSlice } from "@reduxjs/toolkit";
import { AdminDashData, State } from "../../types/types";

export const initialState: State = {
    // nav
     logoutPopup : false,
   // admin/menu
     selectedMenuItem : null,
   // login state
     login : true,
     // userDetails : null,
     msg : {status : "", content : ""},
     coords : {lat : 0,lon : 0},
     btnLoader : false,
     popOverId : "",
   // dashboard
   pageId : "dashboard",
   header : "Dashboard",
   subHeader : "Home",
   startDate : null,
   imgLoader : false,
    // addOffers
   //  editOffer : null,
    param : null,
    inputError : false,
    noOffer : false,
    // offerDetails
    viewData : false,
    viewInfo : null,
    // redeem offers
    confirmClaim : false,
    claimInfo : null,
    // profile
    profileEdit : false,
    // admin
    adminLoader : false,
    adminDashData : {} as AdminDashData,
    // admin/grievance
    grieViewImage : false,
    grieViewImageInfo : null,
    grieStatus : false,
    grieStatusId : "",
    grieStatusInfo : null,
    grieStatusData : null,
    // admin/ shop details
    showShopMap : false,
    shopLocation : {latitude : 0, longitude : 0}
 };
 
 export const loginState = createSlice({
   name: "State",
   initialState,
   reducers: {
    setBtnLoader: (state, action) => { state.btnLoader = action.payload;},
    toggleLogin : (state, action) => { state.login = action.payload},
    setPopoverId : (state, action) => { state.popOverId = action.payload},
    getCoord : (state, action) => { state.coords = action.payload},
    setInputError : (state, action) => { state.inputError = action.payload},
   },
 });

export const {
    toggleLogin,
    setBtnLoader,
    getCoord,
    setPopoverId,
    setInputError
    } = loginState.actions;