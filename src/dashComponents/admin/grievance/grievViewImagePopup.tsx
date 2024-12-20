import React from 'react'
import { useRedux } from '../../../customHooks/useRedux'
import { ViewImage } from '../../../authComponents/registration/viewImage'
import { setGrieViewImage } from '../../../store/reducers/dataReducer'
import { useColors } from '../../../customHooks/useColors'

export const GrievViewImagePopup = () => {
    const {selector, dispatch} = useRedux()
    const {textColors} = useColors()
    const {grieViewImage, grieViewImageInfo} = selector(state => state.data)
  return (
    <div className={`shadow-chart relative w-[80%] h-[80%] bg-white rounded-md flex justify-center items-center flex-col gap-10 ${grieViewImage ? "transition-opacity delay-75 opacity-[1]" : " opacity-0"} duration-300`}>
        <ViewImage classes="w-[30%] h-[50%]" handleClick={() => dispatch(setGrieViewImage(false))} image={grieViewImageInfo && grieViewImageInfo.image}/>

            {
               grieViewImageInfo && grieViewImageInfo.date
               ?
               <div className={`${textColors.grayish_blue} text-[15px] font-semibold absolute bottom-5 flex flex-col justify-center items-center gap-2`}>
               <span className='text-start w-full'><span className={`${textColors.slate800}`}>Date : </span> {grieViewImageInfo && grieViewImageInfo.date}</span>
               <span className='text-start w-full'><span className={`${textColors.slate800}`}>Address : </span> : {grieViewImageInfo && grieViewImageInfo.address}</span>
               </div>
               :
                null
            }

    </div>
  )
}
