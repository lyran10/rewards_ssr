import { createAsyncThunk } from "@reduxjs/toolkit";
import { headers } from "./actions";
import {AxiosError} from "axios";
import { axiosInstance } from "./actions";
import { URL } from "../types/constants";
import { GrieStatusUpdate } from "../types/types";


export const getMenuList = createAsyncThunk(
    "rewards/getMenuList",
    async(userName : string, {rejectWithValue}) => {
        try {
            const { data } = await axiosInstance.get(URL.GET_MENULIST,{
                headers : {
                    ...headers,
                    AUsername : userName,
                }
            });
          return data
        } catch (error) {
            let axiosError = error as AxiosError
            return rejectWithValue(axiosError)
        }
    }
)

export const getAdminDashboardDetails = createAsyncThunk(
    "rewards/getAdminDashboardDetails",
    async({userName , stateId, divId, disId, ulbId, userId } : 
        {userName : string, stateId : number, divId : number, disId : number, ulbId : number, userId : number}, {rejectWithValue}) => {
        try {
            const { data } = await axiosInstance.get(URL.GET_ADMIN_DASHBOARD_DETAILS,{
                headers :  {
                    ...headers,
                    AUsername : userName,
                    StateId: stateId,
                    DivId: divId,
                    DisId: disId,
                    AppId: ulbId,
                    Userid : userId
                }, 
            });
          return data
        } catch (error) {
            let axiosError = error as AxiosError
            return rejectWithValue(axiosError)
        }
    }
)

export const getAdminGrievenceDetails = createAsyncThunk(
    "rewards/getAdminGrievenceDetails",
    async({appid, fromDate, toDate, sType } : { appid : number, fromDate : string, toDate : string, sType : string}, {rejectWithValue}) => {
        try {
            const { data } = await axiosInstance.get(URL.GET_ADMIN_GRIEVANCE_DETAILS,{
                headers : {
                    ...headers,
                    Appid : appid,
                    Fdate : fromDate,
                    Tdate : toDate,
                    Stype : sType
                }
            });
          return data
        } catch (error) {
            let axiosError = error as AxiosError
            return rejectWithValue(axiosError)
        }
    }
)

export const getAdminGrievenceStatusDetails = createAsyncThunk(
    "rewards/getAdminGrievenceStatusDetails",
    async({appid, ccId } : { appid : number, ccId : number}, {rejectWithValue}) => {
        try {
            // console.log(appid)
            // console.log(ccId)
            const { data } = await axiosInstance.get(URL.GET_ADMIN_GRIEVANCE_STATUS_DETAILS,{
                headers : {
                    ...headers,
                    Appid : appid,
                    ccid : ccId,
                }
            });
          return data
        } catch (error) {
            let axiosError = error as AxiosError
            return rejectWithValue(axiosError)
        }
    }
)

export const adminGrievenceStatusUpdate = createAsyncThunk(
    "rewards/adminGrievenceStatusUpdate",
    async({info, appid } : { info : GrieStatusUpdate, appid : number}, {rejectWithValue}) => {
        // console.log(info)
        // console.log(appid)
        try {
            const { data } = await axiosInstance.post(URL.GET_ADMIN_GRIEVANCE_STATUS_UPDATE,info,{
                headers : {
                    ...headers,
                    Appid : appid,
                }
            });
          return data
        } catch (error) {
            let axiosError = error as AxiosError
            return rejectWithValue(axiosError)
        }
    }
)

export const getAdminShopDetails = createAsyncThunk(
    "rewards/getAdminShopDetails",
    async({userName , stateId, divId, disId, ulbId, userId } : 
        {userName : string, stateId : number, divId : number, disId : number, ulbId : number, userId : number}, {rejectWithValue}) => {
        try {
            const { data } = await axiosInstance.get(URL.GET_ADMIN_SHOP_DETAILS,{
                headers :  {
                    ...headers,
                    AUsername : userName,
                    StateId: stateId,
                    DivId: divId,
                    DisId: disId,
                    AppId: ulbId,
                    Userid : userId
                }, 
            });
          return data
        } catch (error) {
            let axiosError = error as AxiosError
            return rejectWithValue(axiosError)
        }
    }
)

export const getAdminCitizenDetails = createAsyncThunk(
    "rewards/getAdminCitizenDetails",
    async({userName , stateId, divId, disId, ulbId, userId } : 
        {userName : string, stateId : number, divId : number, disId : number, ulbId : number, userId : number}, {rejectWithValue}) => {
        try {
            const { data } = await axiosInstance.get(URL.GET_ADMIN_CITIZEN_DETAILS,{
                headers :  {
                    ...headers,
                    AUsername : userName,
                    StateId: stateId,
                    DivId: divId,
                    DisId: disId,
                    AppId: ulbId,
                    Userid : userId
                }, 
            });
          return data
        } catch (error) {
            let axiosError = error as AxiosError
            return rejectWithValue(axiosError)
        }
    }
)

export const getAdminEmployeeDetails = createAsyncThunk(
    "rewards/getAdminEmployeeDetails",
    async({userName , stateId, divId, disId, ulbId, userId } : 
        {userName : string, stateId : number, divId : number, disId : number, ulbId : number, userId : number}, {rejectWithValue}) => {
        try {
            const { data } = await axiosInstance.get(URL.GET_ADMIN_EMPLOYEE_DETAILS,{
                headers :  {
                    ...headers,
                    AUsername : userName,
                    StateId: stateId,
                    DivId: divId,
                    DisId: disId,
                    AppId: ulbId,
                    Userid : userId
                }, 
            });
          return data
        } catch (error) {
            let axiosError = error as AxiosError
            return rejectWithValue(axiosError)
        }
    }
)
