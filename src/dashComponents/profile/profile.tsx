import React from 'react'
import { useColors } from '../../customHooks/useColors'
import { useSession } from '../../customHooks/useSession'
import { Box } from '../offerDetails/view/box'
import { FaArrowRightLong } from "react-icons/fa6";
import { UseInput } from '../../customHooks/useInput';
import { UploadedFileName } from '../../authComponents/uploadedFileName';
import { Form } from '../../authComponents/form';
import { useCheckLimitAndLettersValidation } from '../../customHooks/useCheckLimitAndLettersValidation';
import { useSetProfileInputData } from '../../customHooks/useSetProfileInputData';
import { useConvertFileToImage } from '../../customHooks/useConvertFileToImage';
import { usePopOver } from '../../customHooks/usePopOver';
import { useRedux } from '../../customHooks/useRedux';
import { Button } from '../../authComponents/button';
import { ProfileData } from './profileData';
import { ImagePopup } from '../../commonComponents/imagePopup';
import { useClick } from '../../customHooks/useClick';
import { ProfileEditToggleButtons } from './profileEditToggleButtons';
import { useGetProfileDetails } from '../../customHooks/useGetProfileDetails';
import { Loader } from '../../commonComponents/loader';

export const Profile = () => {
const {selector} = useRedux()
const {getValue} = useSession()
const {handleEditProfieData, handleViewImage} = useClick()
const {data, setData, handleChange} = UseInput()
const {bgColors, textColors} = useColors()
const {imagePreview, handleImageChange} = useConvertFileToImage({data, file : data.logo !== "" ? data.logo : data.draggedImage})
const {show, handlePopOverShow, handlePopOverClose} = usePopOver()
const { Validation } = useCheckLimitAndLettersValidation({handleChange, data, setData})
const {profileEdit} = selector(state => state.data)
const {profile,loading} = useGetProfileDetails()
useSetProfileInputData({data, setData, getValue})

const profileData = [
    {
        id : "name",
        header : "Name",
        span : "col-span-1",
        value : profile && profile.name
        // getValue() && getValue().name || getValue() && getValue().data.aName || ""
    },
    {
        id : "mobNo",
        header : "Mobile no",
        span : "col-span-1",
        value : profile && profile.contact_No
        // getValue() && getValue().contactNo || ''
    },
    {
        id : "address",
        header : "Address",
        span : "col-span-1",
        value : profile && profile.address
        // getValue() && getValue().address || ""
    },
    {
        id : "image",
        header : "Shop image",
        span : "col-span-1",
        value : profile && profile.shopLogoURL
        // getValue() && getValue().logo_Url || ""
    },

]

const inputs = [
{
    type : "text",
    name : "name",
    label : "Name",
    placeholder : "Enter name here",
    span : "col-span-8 md:col-span-12 lg:col-span-1",
    value : data.name,
},
{
    type : "number",
    name : "mobileNo",
    label : "Mobile no",
    placeholder : "Enter mobile no here",
    span : "col-span-8 md:col-span-12 lg:col-span-1",
    value : data.mobileNo,
    },
    {
    type : "text",
    name : "address",
    label : "Address",
    placeholder : "Enter address here",
    span : "col-span-8 md:col-span-12 lg:col-span-1",
    value : data.address,
    },
    {
    type : "",
    name : "draggedImage",
    label : "Upload Shop image",
    placeholder : "",
    span : "col-span-8 md:col-span-12 lg:col-span-1",
    value : data.draggedImage,
    viewButton : <UploadedFileName data={data.draggedImage} mt="mt-[10px] lg:mt-[100px]" handleClick={(e) => handleViewImage(e, data, "viewImage", handleImageChange, handlePopOverShow)}/>
    },
    {
    type : "file",
    name : "logo",
    label : "",
    placeholder : "",
    span : "col-span-8 md:col-span-12 lg:col-span-1 top-1 w-auto m-auto",
    // value : data.logo,
    viewButton : <UploadedFileName data={data.logo} mt="mt-[100px]" handleClick={(e) => handleViewImage(e, data, "viewImage", handleImageChange, handlePopOverShow)}/>
    },
  ]

  return (
   <section className={`rounded-md relative w-full h-full shadow-chart px-5 py-3 flex flex-col justify-start items-center gap-3 ${bgColors.white}`}>
    <div className='self-start flex justify-center items-center gap-3'>
        <header className='font-semibold text-[15px]'>Profile Details</header>
        {  getValue() && getValue().level || getValue().level === 0 ? null : <ProfileEditToggleButtons/> }
    </div>
     <div className='flex w-full h-full overflow-y-scroll'>
     <Box width={`${profileEdit ? "w-full" : "w-full md:w-[50%] lg:w-[50%] xl:w-[50%]"}`} gridFlow={`${profileEdit ? "w-full " : "w-full gap-5 grid grid-cols-2 justif-start items-start mt-6"}`} padding='px-0 md:px-3 lg:px-3 xl:px-7' border=''>
    {
        profileEdit 
        ?
        <Form
        data={data}
        setData={setData}
        handleChange={Validation}
        inputs={inputs}
        classes='relative w-full gap-10 grid grid-cols-3 justif-start items-start mt-6'
        handleClick={(e) => handleEditProfieData(e, data)}
        children={
      <>
      <div className='col-span-8 md:col-span-12 lg:col-span-1 w-full flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row'>
      <Button id='addOffer' loaderClasses='w-5 h-5 before:w-6 before:h-6'  classes={`right-0 absolute top-[100%] self-end h-[35px] w-full md:w-full lg:w-auto xl:w-auto 2xl:w-auto text-[10px] md:text-[13px] lg:text-[15px] ${textColors.white_smoke} ${bgColors.blue} flex justify-center items-center gap-2 py-1 px-5 rounded-md`} handleClick={(e) => handleEditProfieData(e, data)} icon={<FaArrowRightLong/>} content={"Save"}/>
      </div>
      </>
        }
        />
        :
        !loading ?  <ProfileData data={profileData}/> : <Loader classes='absolute w-5 h-5 before:w-6 before:h-6'/> 
    }     
    </Box>
        {/* <Box gridFlow='h-full md:h-[100%] lg:h-[100%] xl:h-[100%] 2xl:h-[80%] grid grid-cols-2 justif-start items-start' padding='px-0 md:px-3 lg:px-3 xl:px-7' border=''>
                {
                    headers.slice(6,headers.length).map(({id, header, span, value}) => {
                        return(
                            <div key={id} className={`${span} flex flex-col gap-1 relative`}>
                                <span className={`font-semibold text-[13px] ${textColors.grayish_blue}`}>{header}</span>
                                {
                                    id === "image"
                                    ?
                                    <img className='w-[80%] md:w-[60%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]' src={value as string} alt="" />
                                    :
                                    id === "status"
                                    ?
                                    <span className={`font-semibold text-[17px] ${value === "Active" ? textColors.green : textColors.red}`}>{value}</span>
                                    :
                                    <span className={`font-semibold text-[17px] text-[#334155]`}>{value}</span>
                                }
                            </div>
                        )
                    })
                }
        </Box> */}

    <ImagePopup show={show} handlePopOverClose={handlePopOverClose} imagePreview={imagePreview}/>
    </div>
</section>
  )
}