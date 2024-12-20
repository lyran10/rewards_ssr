import React from "react";
import { FaUser, FaEye, FaEyeSlash, FaArrowRightLong } from "react-icons/fa6";
import { useColors } from '../../customHooks/useColors'
import { Form } from '../form';
import { useClick } from '../../customHooks/useClick';
import { UseInput } from '../../customHooks/useInput';
import { Button } from '../button';
import { Avatar } from '../../commonComponents/avatar';
import { useCheckLimitAndLettersValidation } from '../../customHooks/useCheckLimitAndLettersValidation';
import { MSG } from '../../types/constants';
import { useMinimumPassLength } from '../../customHooks/useMinPassLength';
import { useResetData } from '../../customHooks/useResetData';
import { SignUpButton } from "./signUpButton";
import { useLocation } from "react-router-dom";

export const Login = () => {
  const location = useLocation().pathname.split("/")[1]
  const { bgColors ,textColors } = useColors()
  const {data, handleChange, setData} = UseInput()
  const { length } = useMinimumPassLength({value : data.password})
  const {Validation} = useCheckLimitAndLettersValidation({handleChange, data, setData})
  const {handleLogin} = useClick()
  const inputs = [
    {
      type : "text",
      name : "userName",
      label : "User Name",
      placeholder : "",
      value : data.userName
    },
    {
      type : "password",
      name : "password",
      label : "Password",
      placeholder : "",
      showIcon : <FaEye className='text-[#a1a1aa] duration-300' size={15}/>,
      hideIcon : <FaEyeSlash className='text-[#a1a1aa] duration-300' size={15}/>,
      value : data.password,
      valid : length,
      validMsg : MSG.MEETS_PASS_LENGTH,
      invalidMsg : MSG.NOT_MEETS_PASS_LENGTH
    }
  ]
  useResetData({setData, data})

  return (
    <section className='w-full md:w-[45%] lg:w-[45%] h-full flex justify-center items-center flex-col'>
      {/* <MouseFollower/> */}
      <div className='w-[95%] h-full flex flex-col justify-center gap-1 items-center self-center md:self-start lg:self-start'>
      <div className={`flex gap-2 justify-start items-center text-[15px] ${textColors.purple} font-semibold self-start`}>
      <Avatar text={textColors.grayish_blue} bg="" position="" width="w-9" height="h-9" icon={<FaUser/>} shadow='shadow-chart'/>
      <header>SIGN IN</header>
      </div>
      <Form
        handleClick={handleLogin} 
        classes={`flex flex-col gap-7 w-full mt-5 md:mt-6 lg:mt-8`} 
        inputs={inputs} 
        handleChange={(e) => Validation(e)}
        data={data}
        children={<Button id='login' loaderClasses='w-5 h-5 before:w-6 before:h-6' handleClick={() => {}} icon={<FaArrowRightLong />} classes={`h-[35px] text-[10px] md:text-[13px] lg:text-[14px] py-2 px-3 ${textColors.white_smoke} ${bgColors.blue} self-end py-2 px-4`} content={"Sign In"}/> }
        setData={setData}
        />
        {
          location.toLowerCase() !== "admin"
          ?
          <>
            <SignUpButton data={data} setData={setData}/>
            {/* <span className={`${textColors.slate800} text-center font-semibold text-[13px] ${catList.length ? "mt-0" :"mt-10"}`}>Exciting <span className={`${textColors.slate800}`}>rewards</span> await – sign in to discover your benefits.</span> */}
          </>
          :
          null
        }
      </div>
    </section>
  
  )
}