import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./loginReducer";

export const dataState = createSlice({
    name: "State",
    initialState,
    reducers: {
     setHeader : (state, action) => { state.header = action.payload},
     setSubHeader : (state, action) => { state.subHeader = action.payload},
     setStartDate : (state, action) => { state.startDate = action.payload},
     setParam : (state, action) => { state.param = action.payload},
     setPageId : (state, action) => { state.pageId = action.payload},
     setImgLoading : (state, action) => { state.imgLoader = action.payload},
     setNoOffer : (state, action) => { state.noOffer = action.payload},
     setViewData : (state, action) => { state.viewData = action.payload},
     getViewInfo : (state, action) => { state.viewInfo = action.payload},
     setConfirmClaim : (state, action) => { state.confirmClaim = action.payload},
     getClaimInfo : (state, action) => { state.claimInfo = action.payload},
     setLogoutPopup : (state, action) => { state.logoutPopup = action.payload},
     //profile
     setProfileEdit : (state, action) => { state.profileEdit = action.payload},
     // admin
     setAdminDashData : (state, action) => { state.adminDashData = action.payload},
     setSelectedMenuItem : (state, action) => { state.selectedMenuItem = action.payload},
     setAdminLoader : (state, action) => { state.adminLoader = action.payload},
     // admin/grievance
     setGrieViewImage  : (state, action) => { state.grieViewImage = action.payload},
     setGrieViewImageInfo : (state, action) => { state.grieViewImageInfo = action.payload},
     setGrieStatus  : (state, action) => { state.grieStatus = action.payload},
     setGrieStateId : (state, action) => { state.grieStatusId = action.payload},
     setGrieStatusInfo : (state, action) => { state.grieStatusInfo = action.payload},
     setGrieStatusData : (state, action) => { state.grieStatusData = action.payload},
     // admin/ shop details
     setShowShopMap : (state, action) => { state.showShopMap = action.payload},
     setShopLocation : (state, action) => { state.shopLocation = action.payload}
    },
  });


  export const {
    // nav
    setLogoutPopup,
    setHeader,
    setSubHeader,
    setStartDate,
    setImgLoading,
    setParam,
    setPageId,
    setNoOffer,
    setViewData,
    getViewInfo,
    setConfirmClaim,
    getClaimInfo,
    // profile
    setProfileEdit,
    // admin
    setAdminDashData,
    setSelectedMenuItem,
    setAdminLoader,
    // admin/grievance
    setGrieViewImage,
    setGrieViewImageInfo,
    setGrieStatus,
    setGrieStateId,
    setGrieStatusInfo,
    setGrieStatusData,
   // admin/ shop details
    setShowShopMap,
    setShopLocation
    } = dataState.actions;
  