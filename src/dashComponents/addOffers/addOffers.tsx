import React, { useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button } from "../../authComponents/button"
import { Form } from "../../authComponents/form"
import { FaArrowRightLong } from "react-icons/fa6";
import { useCheckLimitAndLettersValidation } from "../../customHooks/useCheckLimitAndLettersValidation"
import { useClick } from "../../customHooks/useClick"
import { useColors } from "../../customHooks/useColors"
import { UseInput } from "../../customHooks/useInput"
import { UploadedFileName } from "../../authComponents/uploadedFileName";
import { usePopOver } from "../../customHooks/usePopOver";
import { useRedux } from "../../customHooks/useRedux";
import { useConvertFileToImage } from "../../customHooks/useConvertFileToImage";
import { useResetData } from "../../customHooks/useResetData";
import { useEditOffers } from "../../customHooks/useEditOffers";
import { useSession } from "../../customHooks/useSession";
import { setImgLoading } from "../../store/reducers/dataReducer";
import useDynamicModules from "../../customHooks/useDynamicModules";
import { ImagePopup } from "../../commonComponents/imagePopup";
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

export const AddOffers = () => {
const ckeditor5 = useDynamicModules({library : "ckeditor5"})
const {getOfferValues} = useSession()
const { selector } = useRedux()
const { popOverId } = selector(state => state.loginData)
const {data, setData, handleChange } = UseInput()
const {imagePreview, handleImageChange} = useConvertFileToImage({data, file : data.logo !== "" ? data.logo : data.draggedImage})
const {show, handlePopOverShow, handlePopOverClose} = usePopOver()
const { Validation } = useCheckLimitAndLettersValidation({handleChange, data, setData})
const { handleAddOffers, handleViewImage } = useClick()
const {bgColors, textColors} = useColors()
useResetData({setData, data})
useEditOffers({setData, data})

if (!ckeditor5) return <></>;

const editorConfig = {
  toolbar: ['bulletedList', 'numberedList','bold', 'italic','undo', 'redo'],
  placeholder: 'Start typing...',
  autofocus: false,
}

const inputs = [
  {
    type : "text",
    name : "OfferTitle",
    label : "Offer Title",
    placeholder : "Enter Offer Title here",
    span : "col-span-8 md:col-span-12 lg:col-span-2",
    value : data.OfferTitle,
  },
  {
    type : "text",
    name : "OfferDiscount",
    label : "Discount Title",
    placeholder : "Enter Discount Title here",
    span : "col-span-8 md:col-span-12 lg:col-span-2",
    value : data.OfferDiscount
  },
  {
    type : "date",
    name : "start_Date",
    label : "Start Date",
    placeholder : "",
    span : "col-span-8 md:col-span-12 lg:col-span-1",
    value : data.start_Date,
  },
  {
    type : "date",
    name : "end_Date",
    label : "End Date",
    placeholder : "",
    span : "col-span-8 md:col-span-12 lg:col-span-1",
    value : data.end_Date,
  },
  {
    type : "time",
    name : "start_Time",
    label : "Start Time",
    placeholder : "",
    span : "col-span-8 md:col-span-12 lg:col-span-1",
    value : data.start_Time
  },
  {
    type : "time",
    name : "end_Time",
    label : "End Time",
    placeholder : "",
    span : "col-span-8 md:col-span-12 lg:col-span-1",
    value : data.end_Time
  },
  {
    type : "textarea",
    name : "Offer_Desc",
    label : "How to Redeem",
    placeholder : "Enter process of how to Redeem coupon code",
    span : "col-span-8 md:col-span-12 lg:col-span-2",
    value : data.Offer_Desc,
    textArea :
    <div className="mt-2">
    <CKEditor
    id={"Offer_Desc"}
    editor={ckeditor5}
    data={data.Offer_Desc}
    onChange={(event, editor) => handleEditorChange(event, editor, "Offer_Desc")}
    config={editorConfig}
    />
    {/* <div dangerouslySetInnerHTML={{ __html: editorData }} /> */}
    </div>
  },
  {
    type : "textarea",
    name : "Offer_terms",
    label : "Terms & Conditions",
    placeholder : "Enter terms and conditions here",
    span : "col-span-8 md:col-span-12 lg:col-span-2",
    value : data.Offer_terms,
    textArea :
    <div className="mt-2">
        <CKEditor
        id={"Offer_terms"}
        editor={ckeditor5}
        data={data.Offer_terms}
        onChange={(e, editor) => handleEditorChange(e,editor,"Offer_terms")}
        config={editorConfig}
      />
    {/* <div dangerouslySetInnerHTML={{ __html: editorData }} /> */}
    </div>
  },
  {
    type : "text",
    name : "CouponCode",
    label : "Coupon Code",
    placeholder : "Enter Coupon Code",
    span : "col-span-8 md:col-span-12 lg:col-span-2",
    value : getOfferValues() ? getOfferValues().coupen_Code : data.CouponCode
  },
  {
      type : "text",
      name : "Req_Coins",
      label : "Required coins for this offer",
      placeholder : "Enter Required coins here",
      span : "col-span-8 md:col-span-12 lg:col-span-2",
      value : data.Req_Coins
    },
    {
      type : "",
      name : "draggedImage",
      label : "Upload offer image",
      placeholder : "",
      span : "col-span-8 md:col-span-12 lg:col-span-1",
      value : data.draggedImage,
      viewButton : <UploadedFileName data={data.draggedImage} mt="mt-[10px] lg:mt-[100px]" handleClick={(e) => handleViewImage(e, data, "viewImage", handleImageChange,handlePopOverShow)}/>
    },
    {
      type : "file",
      name : "logo",
      label : "",
      placeholder : "",
      span : "col-span-8 md:col-span-12 lg:col-span-1 w-0 m-auto",
      // value : data.logo,
      viewButton : <UploadedFileName data={data.logo} mt="mt-[100px]" handleClick={(e) => handleViewImage(e, data, "viewImage", handleImageChange,handlePopOverShow)}/>
    },
  {
    type : "radio",
    span : "col-span-8 md:col-span-12 lg:col-span-1 w-auto h-0",
    label : "Is Active",
    radioInputs : [
      {
        name : "isActive",
        text : "Active",
        value :  true
      },
      {
        name : "isActive",
        text : "Not Active",
        value : false
    }
    ]

},
]

function handleEditorChange(event: any, editor: any, key: string) {
    const value = editor.getData();
    setData((prevData) => ({ ...prevData, [key]: value.trim() }));
}
 
  return (
    <div className={`rounded-md relative w-full h-full shadow-chart px-5 py-3 flex flex-col ${popOverId ? "" :"overflow-y-scroll"} justify-start items-center gap-8 ${bgColors.white}`}>
    <header className='font-semibold text-[15px] self-start'>Add Offers</header>
    {
      !popOverId
      ?
      <Form
      data={data}
      setData={setData}
      handleChange={Validation}
      inputs={inputs || []}
      classes='grid grid-cols-1 w-full md:grid-cols-4 lg:grid-cols-4 gap-12 relative mb-0 lg:mb-10'
      handleClick={handleAddOffers}
      children={<>
      <div className='col-span-8 md:col-span-12 lg:col-span-1 flex gap-2 justify-end items-center w-full flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row'>
      <Button id='addOffer' loaderClasses='w-5 h-5 before:w-6 before:h-6'  classes={`self-end h-[35px] w-full md:w-full lg:w-auto xl:w-auto 2xl:w-auto text-[10px] md:text-[13px] lg:text-[15px] ${textColors.white_smoke} ${bgColors.blue} flex justify-center items-center gap-2 py-1 px-5 rounded-md`} handleClick={() => {}} icon={<FaArrowRightLong/>}  content={"Save"}/>
      </div>
      </>}
      />
      :
      <Form
      data={data}
      setData={setData}
      handleChange={Validation}
      inputs={inputs.slice(0,10) || []}
      classes='grid grid-cols-1 w-full md:grid-cols-4 lg:grid-cols-4 gap-12 relative w-full'
      handleClick={handleAddOffers}
      children={<></>}
      />
    }
    
    <ImagePopup show={show} imagePreview={imagePreview} handlePopOverClose={handlePopOverClose}/>
  </div>
  )
}