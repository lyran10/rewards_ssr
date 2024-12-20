import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./loginReducer";
import { addOffer, categoryList, claimOffer, editProfileDetails, getOfferDetails, getShopProfileDetails, login, registration } from "../actions";
import { adminGrievenceStatusUpdate, getAdminDashboardDetails, getAdminGrievenceDetails } from "../adminAction";

export const apiState = createSlice({
    name: "State",
    initialState,
    reducers: {
      setMsg: (state, action) => { state.msg = action.payload; },
    },
    extraReducers: (builder) => {
      // fullfilled
      builder.addCase(login.fulfilled, (state, action) => {
        state.msg = {status : action.payload.status === "Error" ? "error" : "success", content : action.payload.message}
      });
      builder.addCase(claimOffer.fulfilled, (state, action) => {
        state.msg = {status : action.payload.status === "Error" ? "error" : "success", content : action.payload.message}
      });
      builder.addCase(categoryList.fulfilled, (state, action) => { 
      });
      builder.addCase(registration.fulfilled, (state, action) => {
        state.msg = {status : action.payload.status === "Error" ? "error" : "success", content : action.payload.message}
    });

    // add offers
    builder.addCase(addOffer.fulfilled, (state, action) => {
    state.msg = {status : action.payload.status === "Error" ? "error" : "success", content : action.payload.message}
    });
  
    // admin
      builder.addCase(getAdminDashboardDetails.fulfilled, (state, action) => {
        const {payload : {data}} = action
        // state.msg = {status : action.payload.status === "Error" ? "error" : "success", content : action.payload.message}
        if(data){
          let obj : any = {
            cleanliness: {
              total: 0,
              pending: 0,
              processing: 0,
              resolved: 0,
              rejected: 0,
            },
            registration : {
              shops : 0,
              citizens : 0,
              emp : 0
          },
          todayStatus : {
            redeemCount : 0,
            claimCount : 0
        },
        offerDetails : {
          totalOffer : 0,
          redeemOfferCount : 0,
          claimOfferCount : 0
      },
        lastSenvenDayClaim : data[0].lastSenvenDayClaim,
        lastSenvenDayRedeem : data[0].lastSenvenDayRedeem,
        shopLocationDetails : data[0].shopLocationDetails
  
          };
  
          data[0].cleanlinessData.forEach(({totalGrievance, pendingGrievance, processingGrievance, resolvedGrievance, rejectedGrievance} : any) => {
            obj = {
              ...obj,
              cleanliness : {
                total : obj.cleanliness.total += totalGrievance,
                pending : obj.cleanliness.pending += pendingGrievance,
                processing :obj.cleanliness.processing += processingGrievance,
                resolved : obj.cleanliness.resolved += resolvedGrievance,
                rejected : obj.cleanliness.rejected += rejectedGrievance,
              }
            }
          })
  
          data[0].registrationDetails.forEach(({citizenCount, shopCount, empCount} : any) => {
            obj = {
              ...obj,
                registration : {
                  shops : obj.registration.shops += shopCount,
                  citizens : obj.registration.citizens += citizenCount,
                  emp : obj.registration.emp += empCount
              }
            }
          })
  
          data[0].todayStatusDetails.forEach(({redeemCount, claimCount} : any) => {
            obj = {
              ...obj,
                todayStatus : {
                  redeemCount : obj.todayStatus.redeemCount += redeemCount,
                  claimCount : obj.todayStatus.claimCount += claimCount,
              }
            }
          })
  
          data[0].offerCountDetails.forEach(({totalClaimCount, totalOfferCount, totalRedeemCount} : any) => {
            obj = {
              ...obj,
              offerDetails : {
                  totalOffer : obj.offerDetails.totalOffer += totalOfferCount,
                  redeemOfferCount : obj.offerDetails.redeemOfferCount += totalRedeemCount,
                  claimOfferCount : obj.offerDetails.claimOfferCount += totalClaimCount,
              }
            }
          })
  
          state.adminDashData = obj
          }
         
    });
    // builder.addCase(getAdminGrievenceDetails.fulfilled, (state, action) => {
    //   state.msg = {status : action.payload.status === "Error" ? "error" : "success", content : action.payload.message}
    // });
    builder.addCase(adminGrievenceStatusUpdate.fulfilled, (state, action) => {
      state.msg = {status : action.payload.status === "Error" ? "error" : "success", content : action.payload.message}
    });
  
    // profile
    builder.addCase(editProfileDetails.fulfilled, (state, action) => {
      state.msg = {status : action.payload.status === "Error" ? "error" : "success", content : action.payload.message}
    });
  
//   -----------------------------------------------------------------------------------------------

      // Rejected
      builder.addCase(login.rejected, (state, action : any) => {
        state.msg = {status : "error" , content : action.payload.message}
      });
      builder.addCase(registration.rejected, (state, action : any) => {
        state.msg = {status : "error" , content : action.payload.message}
      });
      builder.addCase(categoryList.rejected, (state, action : any) => {
            state.msg = {status : "error" , content : action.payload.message}
      });
    
     // add offers
      builder.addCase(addOffer.rejected, (state, action : any) => {
       if(action.payload.response.data.errors){
        if(action.payload.response.data.errors.Req_Coins){
          state.msg = {status : "error" , content : action.payload.response.data.errors.Req_Coins[0]}
        }
        if(action.payload.response.data.errors.CouponCode){
          state.msg = {status : "error" , content : action.payload.response.data.errors.CouponCode[0]}
        }
       }
      
       
      });  

      // offer details
      builder.addCase(getOfferDetails.rejected, (state, action : any) => {
        state.msg = {status : "error" , content : action.payload.message}
      });  

      // profile
      builder.addCase(editProfileDetails.rejected, (state, action : any) => {
        state.msg = {status : "error" , content : action.payload.message}
      });
      
      builder.addCase(getShopProfileDetails.rejected, (state, action : any) => {
        state.msg = {status : "error" , content : action.payload.message}
      });
      
      // admin 
      builder.addCase(getAdminGrievenceDetails.rejected, (state, action : any)  => {
        state.msg = {status : "error" , content : action.payload.message}
      });
    
      builder.addCase(adminGrievenceStatusUpdate.rejected, (state, action : any) => {
        state.msg = {status : action.payload.status === "Error" ? "error" : "success", content : action.payload.message}
      });
   }
});
  
export const {
setMsg,
} = apiState.actions;