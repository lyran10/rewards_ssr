import React from 'react'
import { AddOffers } from './dashComponents/addOffers/addOffers'
import { ClaimOffers } from './dashComponents/claimOffers/claimOffers'
import { Home } from './dashComponents/home/home'
import { Main } from './dashComponents/main'
import { OfferDetails } from './dashComponents/offerDetails/offerDetails'
import { Profile } from './dashComponents/profile/profile'
import { RedeemOffers } from './dashComponents/redeemOffers/redeemOffers'
import { Auth } from './pages/auth'
import { Dashboard } from './pages/dashboard'
import {Route, Routes} from "react-router-dom"
import { Grievance } from './dashComponents/admin/grievance/grievance'
import { AdminShopDetails } from './dashComponents/admin/adminShopDetails/adminShopDetails'
import { AdminCitizenDetails } from './dashComponents/admin/adminCitizenDetails/adminCitizenDetails'
import { AdminEmployeeDetails } from './dashComponents/admin/adminEmployeeDetails/adminEmployeeDetails'
// https://rewards.ictsbm.com/
// https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js
// testuser
// test@123
// admin
// rewardadmin	jhguy543@3	1	SUA
// nagpurdivision	gPNE7Uyj	1	B  
// nagpurdistrict	PJVyg5XR	1	C  
// kampteewadi	PJVyg5XR	1	D  
// kamptee	PJVyg5XR	1	E  
// npm install @vis.gl/react-google-maps


// https://citizen.ictsbm.com/Account/Login
// Username:- Appynitty@np.com
// PAssword:- Admin#123
const App = () => {
  return (
    // <Auth/>
    <Routes>
      <Route path='/' element={<Auth />}/>
      <Route path='/cms' element={<Dashboard  />} >
        <Route path='' element={<Main />} >
         <Route path='dashboard/home' element={<Home/>}/>   
          <Route path='offers/addOffers' element={<AddOffers/>}/>
          <Route path='offers/offerDetails' element={<OfferDetails/>}/>
          <Route path='redeem/redeemOffers' element={<RedeemOffers/>}/>
          <Route path='claim/claimOffers' element={<ClaimOffers/>}/>
          <Route path='profile/profileDetails' element={<Profile/>}/>
        </Route>
      </Route>

      {/* admin */}
      <Route path='/admin' element={<Auth />}/>
      <Route path='/admin/cms' element={<Dashboard/>} >
        <Route path='' element={<Main />} >
          <Route path='dashboard/home' element={<Home/>}/>   
          <Route path='offers/addOffers' element={<AddOffers/>}/>
          <Route path='offers/offerDetails' element={<OfferDetails/>}/>
          <Route path='redeem/redeemOffers' element={<RedeemOffers/>}/>
          <Route path='claim/claimOffers' element={<ClaimOffers/>}/>
          <Route path='profile/profileDetails' element={<Profile/>}/>
          <Route path='grievance/grievanceDetails' element={<Grievance/>}/>
          <Route path='shop/shopDetails' element={<AdminShopDetails/>}/>
          <Route path='citizen/citizenDetails' element={<AdminCitizenDetails/>}/>
          <Route path='employee/employeeDetails' element={<AdminEmployeeDetails/>}/>
        </Route>
      </Route>
      
    </Routes>
  
  )
}

export default App
