import React, { useEffect } from "react";
import { Offer } from "../types/types";

type AdminType = {
  level : number,
  data : {aId: number, aName: string, aType: string, citizenModule: boolean, empModule: boolean},
  userName : string
}

const isBrowser = typeof window !== 'undefined';

export const useSession = () => {
  // console.log(isBrowser)
  useEffect(() => {
    if(getLoginToggleValue() === null) sessionStorage.setItem("login", JSON.stringify(true));
  },[])

  // Handles saving user details in sessionStorage
  const handleSession = (userDetails: {id: number, name: string, contactNo: string, address: string, logo_Url: string} 
    | AdminType) => {
    if (isBrowser) { // Ensure this only runs on the browser
      // if (!sessionStorage.getItem("user")) {
        sessionStorage.setItem("user", JSON.stringify(userDetails));
      // }
    }
  };

  // Stores the offer in sessionStorage
  const storeEditOffer = (offer: Offer) => {
    if (isBrowser) {
      sessionStorage.setItem("offerEdit", JSON.stringify(offer));
    }
  };

  // Removes the user and offer data from sessionStorage
  const removeSession = () => {
    if (isBrowser) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("offerEdit");
    }
  };

  // Retrieves user data from sessionStorage
  const getValue = () => {
    if (isBrowser) {
      const values = sessionStorage.getItem("user");
      if (values !== null) return JSON.parse(values);
      return null;
    }
    return null; // Server-side, return null
  };

  // Retrieves offer data from sessionStorage
  const getOfferValues = () => {
    if (isBrowser) {
      const values = sessionStorage.getItem("offerEdit");
      if (values !== null) return JSON.parse(values);
      return null;
    }
    return null; // Server-side, return null
  };

  // Removes offer data from sessionStorage
  const removeOfferValues = () => {
    if (isBrowser) {
      sessionStorage.removeItem("offerEdit");
    }
  };

  // Removes offer data from sessionStorage
  const handleSessionLoginToggleValue = (boolean : boolean) => {
    if (isBrowser) {
      sessionStorage.setItem("login", JSON.stringify(boolean));
    }
  };

  const getLoginToggleValue = () => {
    if (isBrowser) {
      const values = sessionStorage.getItem("login");
      if (values !== null) return JSON.parse(values);
      return true
    }else{
      return true
    }
    // return null; // Server-side, return null
  };

  return {
    handleSession,
    removeSession,
    getValue,
    storeEditOffer,
    getOfferValues,
    removeOfferValues,
    handleSessionLoginToggleValue,
    getLoginToggleValue
  };
};
