import React from 'react'
import { Toast } from '../commonComponents/toast'
import { useColors } from '../customHooks/useColors'
import { useMouseFollower } from '../customHooks/useMouseFollower'
// import { useRedux } from '../customHooks/useRedux'
import { Login } from './login/login'
import { Registration } from './registration/registration'
import { useSession } from '../customHooks/useSession'
import { useShowLogin } from '../customHooks/useShowLogin'
import { useRedux } from '../customHooks/useRedux'

export const AuthMain = () => {
    const {getLoginToggleValue} = useSession()
    const { selector } = useRedux() 
    const { login } = selector(state => state.loginData)
    const { transform } = useMouseFollower({num : 10})
    const {bgColors : { blue, purple, slate900, white }, textColors : {slate800 }} = useColors()
    useShowLogin()
    
  return (
    <div className={`absolute flex justify-center items-center w-full h-full`}>
      <div className={`relative duration-500 flex ${getLoginToggleValue() === true ? "translate-x-0 scale-100" : "-translate-x-[500px] scale-0"} justify-end items-center p-3 w-[80%] h-[60%] ${white} shadow-chart bg-rewards`}>
      <div
          style={{
            transform,
            transition: 'transform 0.1s ease-in-out',
          }}
          // ${blue}
          // #5293c9
          // #5f9ccf
         className={`absolute left-[3%] -top-10 w-[50%] h-[120%]  bg-[#5f9ccf] shadow-chart hidden md:block lg:block`}>
          <img src="./Reward-CMS.png" className='m-auto mt-10 w-[80%] h-[80%]' alt="" />
        </div>
        <Login/>
      </div>
      <Registration/>
      <Toast/>
    </div>
  )
}
