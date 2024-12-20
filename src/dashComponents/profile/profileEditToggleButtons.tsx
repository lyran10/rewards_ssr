import React from 'react'
import { FaEdit, FaUser } from "react-icons/fa";
import { useRedux } from '../../customHooks/useRedux';
import { setProfileEdit } from '../../store/reducers/dataReducer';
import { useColors } from '../../customHooks/useColors';
import { Button } from '../../authComponents/button';

export const ProfileEditToggleButtons = () => {
    const {dispatch} = useRedux()
    const {textColors} = useColors()

  return (
   <>
      <Button id='closeProfileEdit' loaderClasses=''  classes={`relative before:text-[12px] before:font-semibold before:hidden before:absolute before:bg-white before:-top-9 before:-right-4 before:content-['Profile'] before:shadow-chart before:p-1 before:rounded-md hover:before:block`} handleClick={() => dispatch(setProfileEdit(false))} icon={<FaUser className={`text-[12px] ${textColors.grayish_blue}`}/>}  content={""}/>
      <Button id='openProfileEdit' loaderClasses=''  classes={`relative before:text-[12px] before:font-semibold before:hidden before:absolute before:bg-white before:-top-9 before:-right-4 before:content-['Edit'] before:shadow-chart before:p-1 before:rounded-md hover:before:block`} handleClick={() => dispatch(setProfileEdit(true))} icon={ <FaEdit className={`text-[12px] ${textColors.grayish_blue}`}/>}  content={""}/>
   </>
  )
}