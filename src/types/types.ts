// export type LoginInputTypes = {
//     userName : string,
//     password : string
// }

export type RegistrationTypes = {
    Name : string,
    Username : string,
    Password : string,
    Contact_No : string,
    Address : string,
    PinCode : string | number,
    Lat : string | number,
    Long : string | number,
    CatId : string,
    ShopLogoImg : any,
    stateid : string,
    divid : string,
    disid : string,
    appid : string,

}

export type AddOfferTypes = {
userDetails : {
    Subcatid : number;
    OfferTitle : string;
    OfferDiscount : string;
    Start_Datetime : string;
    End_Datetime : string;
    Offer_Desc : string;
    Offer_terms : string;
    Req_Coins : string;
    IsActive : string;
    OfferImg : string;
    CouponCode : string
},
offerId : number
}

export type InputTypes = {
    // LoginInputTypes? : LoginInputTypes,
    // RegistrationInputTypes? : RegistrationInputTypes

    // login and registration
    name : string,
    userName : string,
    password : string,
    confirmPassword : string,
    mobileNo : string,
    address : string,
    pinCode : string,
    latitude : number,
    longitude : number,
    catId : string,
    logo : any,
    stateid : string,
    divid : string,
    disid : string,
    appid : string,

    // add offers
    OfferTitle : string,
    OfferDiscount : string,
    start_Date : string,
    end_Date : string,
    start_Time : number | string,
    end_Time : number | string,
    Offer_Desc : string,
    Offer_terms : string,
    Req_Coins : string,
    draggedImage : any,
    CouponCode : string,
    isActive : string

    // offer detail
    search : string

    // admin/grievance
    grieDetails : string
}

// offerDetails

export type Offer = {
    coupen_Code : string,
    offerDiscount : string
    offerId : number
    offerImgUrl : string
    offerTitle : string
    offer_EndTime : string
    offer_IsActive : boolean
    offer_StartTime : string,
    req_Points : number,
    offerDesc : string,
    offerTerms : string
}

// admin dshabord

export type AdminDashData = {
    cleanliness : {
        total : number,
        pending : number,
        processing : number,
        resolved : number,
        rejected : number,
    },
    registration : {
        shops : number,
        citizens : number,
        emp : number
    },
    todayStatus : {
        redeemCount : number,
        claimCount : number
    },
    offerDetails : {
        totalOffer : number,
        redeemOfferCount : number,
        claimOfferCount : number
    }
    lastSenvenDayClaim : {claimDayName: string, claimDate: string, claimCount: number}[],
    lastSenvenDayRedeem : {redeemDayName: string, redeemDate: string, redeemCount: number}[],
    shopLocationDetails : {latitude : number,longitude: number,shopAddress: string,shopName: string,ulbId: number |null}[]
}



// Redux

export type State = {
    // nav
    logoutPopup : boolean
    selectedMenuItem : {stateId :  number,divId : number,disId : number, ulbId :  number, userId : number} | null,
    // login state
    login : boolean | null,
    // userDetails : {id : number, name : string, contactNo : string, address :string, logo_Url : string} | null,
    msg : {status : string, content : string},
    coords : {lat : number,lon : number},
    btnLoader : boolean
    popOverId : string,
    // dashboard state
    pageId : string
    header : string,
    subHeader : string,
    startDate : Date | string | null
    imgLoader : boolean
    // add offers
    // editOffer : Offer | null
    param : string | null,
    inputError : boolean,
    noOffer : boolean
    // offer Details
    viewData : boolean,
    viewInfo : Offer | null
    //redeem Offer
    confirmClaim : boolean
    claimInfo : Offer | null,
    // profile
    profileEdit : boolean,
    // admin
    adminLoader : boolean
    adminDashData : AdminDashData
    // admin/grievance
    grieViewImage : boolean,
    grieViewImageInfo : any
    grieStatus : boolean,
    grieStatusId : string,
    grieStatusInfo : any,
    grieStatusData : any
    // admin/ shop details
    showShopMap : boolean,
    shopLocation : {latitude : number, longitude : number}

}


// Admin menu

export type Menu = {
    actionName : string
    controllerName : string
    districtId : number 
    divisionId : number
    isChecked : boolean
    linkText : string
    returnUrl : string
    stateId : number
    type : string
    ulbId : number
    }
    
    
    export type Selected = {
        ulbName : string | undefined
        divisionId: number,
        districtId: number,
        appId: number,
        userId : number,
        date : string
    }

    export type MenuListProps = {
        nestedDisId? : number | string
        list : any,
        ulbId : string,
        disId : string,
        setDisId :  React.Dispatch<React.SetStateAction<string>>,
        setULBId :  React.Dispatch<React.SetStateAction<string>>,
        current? : any,
        selectedMenuItem : any,
        handleClick : (e : React.MouseEvent<HTMLElement>,data : any) => void,
    }

    // admin / Grievance

    export type GrieStatusUpdate = {
        info : {
            ccId : number
            Status : string;
            Status_Des : string;
            StatusImg : string;
        },
        appId : number
        }