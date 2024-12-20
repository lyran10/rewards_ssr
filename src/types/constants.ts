export enum LENGTHS {
    PASS_MAX_LENGTH = 10,
    PASS_MIN_LENGTH = 4,
    USERNAME_MAX_LENGTH = 20,
    NAME_MAX_LENGTH = 50,
    NAME_MIN_LENGTH = 8,
    USERNAME_MIN_LENGTH = 6,
}

export enum ERRORS {
    FIELD_REQIURED = "All fields are reqiured.",
    DATE_FILTER = "No data for the date range. Please select another date.",
    NO_MATCH = "Passwords does not match.",
    ONLY_LETTERS = "User Name should contain only letters, no numbers or special characters.",
    PASSWORD_LENGTH = `Password should be minimum 4 characters.`,
    USERNAME_LENGTH = `User Name should be minimum 6 characters.`,
    NAME_LENGTH = `Name should be minimum 8 characters.`,
    USER_NAME_EXISTS = `User Name already exists.`,
    MOBILE_NO_LENGTH = "Mobile number needs to have 10 digits.",
    PIN_CODE_LENGTH = "Pin code needs to have 6 digits.",
    COUPON_CODE_LENGTH = "Length of Coupon code needs to be minimum 6."
}

export enum MSG {
    PASSWORD_MATCH = "Password Match.",
    NO_MATCH = "Passwords does not match.",
    MEETS_PASS_LENGTH = "Password meets the required length.",
    NOT_MEETS_PASS_LENGTH = "Password should be Minimum 4 characters.",
    USERNAME_EXISTS = "User Name exists.",
    USERNAME_DOES_NOT_EXISTS = "User Name can be used.",
    UPDATED_MSG = "Status is already updated."
}

export enum URL {
    SHOP_LOGIN = "Shops/ShopLogin",
    // regsitration
    SHOP_REG = "Shops/ShopRegistration",
    CATEGORY_LIST = "Account/GetCatagoryList",
    STATE_LIST = "Account/GetStateList",
    DIVISION_LIST ="Account/GetDivisionList",
    DISTRICT_LIST = "Account/GetDistrictList",
    ULB_LIST = "Account/GetULBList",
    // dashboard
    ADD_OFFER = "Shops/AddShopOffers",
    GET_OFFER_DETAILS = "Shops/GetOfferDetails",
    GET_REDEEM_OFFERS = "Shops/GetSubCatRedeemHistory",
    CLAIM_OFFER = "Shops/ClaimOffer",
    GET_CLAIM_OFFERS = "Shops/GetSubCatClaimHistory",
    GET_DASHBOARD_DETAILS = "Shops/GetDashboardDetails",
    // profile
    EDIT_PROFILE_DETAILS = "Shops/UpdateShopDetails",
    GET_SHOP_PROFILE_DETAILS = "Shops/GetShopProfileDetails",
    // admin
    ADMIN_LOGIN = "/Admin/AdminLogin",
    GET_MENULIST = "Admin/GetMenuList",
    GET_ADMIN_DASHBOARD_DETAILS = "Admin/GetAdminDashboardDetails",
    GET_ADMIN_GRIEVANCE_DETAILS = "Admin/GetCitizenGrievanceDetails",
    GET_ADMIN_GRIEVANCE_STATUS_DETAILS = "Admin/GetComplaintStatusDetails",
    GET_ADMIN_GRIEVANCE_STATUS_UPDATE = "Admin/UpdateComplaintStatus",
    GET_ADMIN_SHOP_DETAILS = "Admin/GetShopsDetails",
    GET_ADMIN_CITIZEN_DETAILS = "Admin/GetCitizenDetails",
    GET_ADMIN_EMPLOYEE_DETAILS = "Admin/GetEmployeeDetails"
   
}