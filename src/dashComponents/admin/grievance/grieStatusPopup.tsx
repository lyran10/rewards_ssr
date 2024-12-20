import React from 'react'
import { useRedux } from '../../../customHooks/useRedux'
import { ClosePopOverButton } from '../../../authComponents/closePopOverButton'
import { UseInput } from '../../../customHooks/useInput'
import { Form } from '../../../authComponents/form'
import { useCheckLimitAndLettersValidation } from '../../../customHooks/useCheckLimitAndLettersValidation'
import { Button } from '../../../authComponents/button'
import { useColors } from '../../../customHooks/useColors'
import { useConvertFileToImage } from '../../../customHooks/useConvertFileToImage'
import { useResetData } from '../../../customHooks/useResetData'
import { useEditGrieData } from '../../../customHooks/useEditGrieData'
import { useClick } from '../../../customHooks/useClick'
import { Loader } from '../../../commonComponents/loader'

export const GrieStatusPopup = () => {
    const {selector} = useRedux()
    const {data, setData, handleChange} = UseInput()
    const {textColors, bgColors} = useColors()
    const {Validation} = useCheckLimitAndLettersValidation({handleChange, data, setData})
    const { handleStatusUpdate, handleCloseGriePopover } = useClick()
    const {imagePreview, setImagePreview, handleImageChange} = useConvertFileToImage({file : data.logo})
    const {grieStatus, grieStatusData} = selector(state => state.data)
    const {btnLoader} = selector(state => state.loginData)
    const {handleResetData} = useResetData({data,setData})
    const {btnId, setBtnId} = useEditGrieData({data, setData, values : grieStatusData, handleImageChange})
    const btnClasses = `${textColors.white_smoke} ${bgColors.blue} h-[35px] w-full md:w-full lg:w-auto xl:w-auto 2xl:w-auto  text-[10px] md:text-[13px] lg:text-[15px] py-2 px-4`

    const inputs = [
        {
          itemId : "grevienceImageUpload",
          type : "file",
          name : "logo",
          label : "",
          placeholder : "",
          // span : "w-auto m-auto",
          // value : data.logo, 
          image :
          <div className='m-auto h-[100px] mt-5 md:mt-0 w-[70%] lg:w-[50%] text-[12px] text-gray-400 border'>
            {
              data.logo && imagePreview ? <img src={imagePreview} className='w-full h-full' alt="" /> : <span>No Image uploaded</span>
            }
          </div>
        },
        {
            type : "textarea",
            name : "grieDetails",
            label : "Details",
            // placeholder : "Enter details here",
            // span : "",
            // value : data.grieDetails,
            textArea :
            <textarea
            rows={3}
            value={data.grieDetails}
            onChange={(e) => {setData({...data, grieDetails : e.currentTarget.value})}}
            placeholder='Enter details here'
            className='w-full h-full p-2 border outline-none'>
            </textarea>
          },
      ]

  return (
    <div className={`p-10 min-w-[50%] min-h-[300px] shadow-chart relative bg-white rounded-md flex justify-center items-center flex-col gap-10 ${grieStatus ? "transition-opacity delay-75 opacity-[1]" : " opacity-0"} duration-300`}>
          <Form
            inputs={inputs}
            classes='grid grid-cols-2 w-full min-h-[250px] gap-5 relative'
            handleChange={(e) => Validation(e)}
            children={
            <>
            {/* disabled={grieStatusId === "Processing" ? true : false} */}
            <div className='bottom-0 flex gap-2 col-span-2 w-full justify-end items-end'>
              <Button  id='Res' loaderClasses=''  classes={btnClasses} handleClick={(e) => handleStatusUpdate(e, data, grieStatusData.ccid, setBtnId)} icon={btnLoader && btnId === "Res" ? <Loader classes='w-4 h-4 before:w-5 before:h-5'/> : <>Resolve</>}  content={""}/>
              <Button  id='Rej' loaderClasses=''  classes={btnClasses} handleClick={(e) => handleStatusUpdate(e, data, grieStatusData.ccid, setBtnId)} icon={btnLoader && btnId === "Rej" ? <Loader classes='w-4 h-4 before:w-5 before:h-5'/> : <>Reject</>}   content={""}/>
              <Button  id='Pro' loaderClasses=''  classes={btnClasses} handleClick={(e) => handleStatusUpdate(e, data, grieStatusData.ccid, setBtnId)} icon={btnLoader && btnId === "Pro" ? <Loader classes='w-4 h-4 before:w-5 before:h-5'/> : <>Processing</>}  content={""}/>
              {/* <Button id='reg' loaderClasses='w-5 h-5 before:w-6 before:h-6'  classes={`${textColors.white_smoke} ${bgColors.blue} h-[35px] w-full md:w-full lg:w-auto xl:w-auto 2xl:w-auto  text-[10px] md:text-[13px] lg:text-[15px] py-2 px-4`} handleClick={() => {}} icon={<></>}  content={"Save"}/> */}
            </div>
            </>
      }
        handleClick={() => {}}
        data={data}
        setData={setData}
        />
    <ClosePopOverButton handlePopOverClose={() => handleCloseGriePopover(setData, handleResetData, setImagePreview)}/>
   </div>
  )
}
