import React from 'react'
import { useColors } from '../customHooks/useColors'

type Props = {
  id? : string
}

export const UploadButton = ({id} : Props) => {
    const {textColors, bgColors} = useColors()
  return (
      <div className={`cursor-pointer mt-2 ${id === "grevienceImageUpload"  ? "absolute -bottom-5 md:-bottom-3": "absolute"} w-auto flex gap-2 m-auto justify-center items-center font-semibold  text-[13px]`}>
        <div className='flex justify-center items-center flex-col gap-2'>
          <span className={`${bgColors.blue} ${textColors.white_smoke} px-4 py-1 rounded-md`}>Browse</span>
          <span className={`w-[100px] text-center top-[105%] text-[10px] ${textColors.grayish_blue}`}>(Supports png, jpg)</span>
        </div>
      </div>
  )
}
