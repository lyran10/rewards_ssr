import React from 'react'
import { useRedux } from '../../../customHooks/useRedux'
import { UseInput } from '../../../customHooks/useInput'
import { useColors } from '../../../customHooks/useColors'
import { useFilter } from '../../../customHooks/useFilter'
import { setStartDate } from '../../../store/reducers/dataReducer'
import { FaSearch } from "react-icons/fa";
import { Button } from '../../../authComponents/button'
import { NoData } from '../../home/noData'
import { StackLoader } from '../../../commonComponents/stackLoader'
import { Inputs } from '../../../authComponents/inputs'
import { FaTable } from "react-icons/fa6";
import { Table } from '../../offerDetails/table/table'
import { useGetAdminShopDetails } from '../../../customHooks/useGetAdminShopDetails'
import { FaLocationDot } from "react-icons/fa6";
import { useClick } from '../../../customHooks/useClick'
import { checkDateLimit } from '../../../customHooks/useLengthLimit'

export const AdminShopDetails = () => {
  const { dispatch } = useRedux()
  const {getShopLocation} = useClick()
  const {handleChange, data, setData} = UseInput()
  const {loading, shopDetails, fetchOffers} = useGetAdminShopDetails()
  const {bgColors, textColors} = useColors()
  const { filtered, filterDate } = useFilter({
    id : "shop",
    inputData : data, 
    data : shopDetails, 
    value : data.search, 
    key1 : "shopName", 
    key2 : "contactNo",
    key3 : "shopAddress", 
    key4 : "stateName", 
    key5 : "divisionName", 
    key6 : "districtName", 
    key7 : "ulbName", 
    key8 : "ulbName", 
    key9 : "ulbName", 
    key10 : "ulbName", 
    key11 : "ulbName", 
    key12 : "ulbName",
    key13 : "ulbName",
    start : data.start_Date, 
    end : data.end_Date, 
    selectValue : data.isActive || "",
    setInputData :  setData
})

  const inputs =   [
  {
    type : "select",
    name : "category",
    itemId : "isActive",
    label : "Filter Category",
    placeholder : "",
    span : "col-span-8 md:col-span-12 lg:col-span-2",
    selectData : [
      {category : "Life Style"},
      {category : "Food"},
      {category : "Travel"},
      {category : "Gadget"},
      {category : "Wellness"},
    ],
    value : data.isActive,
    content : "Category"
  },
  {
    type : "date",
    name : "start_Date",
    label : "From Date",
    placeholder : "",
    span : "col-span-12 md:col-span-2 lg:col-span-1",
  //   showIcon : <FaEye className='text-[#a1a1aa] duration-300' size={15}/>,
  //   hideIcon : <FaEyeSlash className='text-[#a1a1aa] duration-300' size={15}/>,
    value : data.start_Date,
    itemId : "shop"
  //   valid : length,
  //   validMsg : MSG.MEETS_PASS_LENGTH,
  //   invalidMsg : MSG.NOT_MEETS_PASS_LENGTH
  },
  {
    type : "date",
    name : "end_Date",
    label : "To Date",
    placeholder : "",
    span : "col-span-12 md:col-span-5 lg:col-span-1",
  //   showIcon : <FaEye className='text-[#a1a1aa] duration-300' size={15}/>,
  //   hideIcon : <FaEyeSlash className='text-[#a1a1aa] duration-300' size={15}/>,
    value : data.end_Date,
  //   valid : match,
  //   validMsg : MSG.PASSWORD_MATCH,
  //   invalidMsg : MSG.NO_MATCH
  },
  {
      type : "text",
      name : "search",
      label : "",
      placeholder : "Search",
      span : "col-span-12 md:col-span-2 lg:col-span-1",
      value : data.search,
      icon : <div className={`bg-transparent absolute bottom-0 right-0 w-5 h-5 flex justify-center items-center`}><FaSearch className={`${textColors.grayish_blue}`}/></div>
    
  },
  ]

  const change = (e : any) => {
    if((e.target.name === "start_Date" || e.target.name === "end_Date") && !checkDateLimit(e.target.value)) return
    if(e.target.name === "start_Date") dispatch(setStartDate(e.target.value))
    handleChange(e)
  }

  const handleFilter = () => {
    fetchOffers()
    filterDate()
  }
  
  const displayHeader = () => {
      let headers = ["Sr.no", "ShopName", "Contact", "Address", "Location", "Reg Date", "Category", "State", "Division", "District", "ULB", "Total", "Active", "In Active" ]
  
      return(
          headers.map((item) => {
              return(
                  <th className={`p-2 font-semibold text-[9px] md:text-[12px] lg:text-[11px] text-start ${textColors.grayish_blue}`} key={item}>{item}</th>
              )
          })
          )
  }

  const displayBody = () => {
  return (
      !loading
      ?
      filtered && filtered.length
      ?
      filtered.map((item, index : number) => {
          return (
              <tr key={index} className={`${index % 2 !== 0 ? bgColors.white_smoke : ""} border-b h-[50px] text-center body relative text-[#475569]`}>
                  <td className="p-2 font-[600] text-start">{item.srno}</td>
                  <td className="p-2 font-[600] text-start">{item.shopName}</td>
                  <td className="p-2 font-[600] text-start">{item.contactNo}</td>
                  <td className="p-2 font-[600] text-start">{item.shopAddress}</td>
                  <td className="p-2 font-[600] justify-center items-center flex">
                  <Button id='shopLocationBtn' loaderClasses=''  classes={`text-center text-[10px] md:text-[10px] lg:text-[10px] ${textColors.blue} flex justify-center items-center gap-2 rounded-md`} handleClick={() => getShopLocation({latitude : item.latitude, longitude : item.longitude})} icon={<FaLocationDot size={20}/>}  content={""}/>
                  </td>
                  <td className="p-2 font-[600] text-start">{item.regDate}</td>
                  <td className="p-2 font-[600] text-start">{item.categoryName}</td>
                  <td className="p-2 font-[600] text-start">{item.stateName}</td>
                  <td className="p-2 font-[600] text-start">{item.divisionName}</td>
                  <td className="p-2 font-[600] text-start">{item.districtName}</td>
                  <td className="p-2 font-[600] text-start">{item.ulbName}</td>
                  <td className="p-2 font-[600] text-start">{item.totalOffers}</td>
                  <td className="p-2 font-[600] text-start">{item.activeOffers}</td>
                  <td className="p-2 font-[600] text-start">{item.inActiveOffers}</td>
                  {/* <td className="p-2 font-[600] text-start">
                  <Button id={item.status} loaderClasses='' classes={`px-2 py-1 text-[10px] md:text-[10px] lg:text-[10px] ${bgColors.blue} ${textColors.white_smoke} flex justify-center items-center gap-2 rounded-md`} handleClick={(e) => getStatusData(e, item.ccId, setButtonId, fetchStatusData)} icon={loading && buttonId === item.ccId ? <Loader classes='w-4 h-4 before:w-5 before:h-5'/> : <>{item.status}</> } content={""}/>
                  </td>
                  <td className="p-2 font-[600] text-start">{item.comment}</td>
                  <td className="p-2 font-[600]">
                  <Button id='grieviewImage2' loaderClasses=''  classes={`text-[10px] md:text-[10px] lg:text-[10px] ${textColors.blue} flex justify-center items-center gap-2 rounded-md`} handleClick={() => getGrieImageData(item.status_Image)} icon={<img height={20} width={20} src={item.status_Image} alt="" />}  content={""}/>
                  </td>
                  <td className="p-2 font-[600] text-start">{item.type}</td> */}
              </tr>
          )
      })
      :
      <NoData classes='w-full absolute md:fixed w-full h-[300px]' content='No Offers' icon={<FaTable className={`${textColors.blue} text-[13px]`}/>}/>
      :
      <tr className='absolute w-full h-[300px] flex justify-center items-center'>
      <StackLoader length={6}/>
      </tr>
  )
  }
  
    return (
      <section className={`relative rounded-md w-full h-full shadow-chart px-5 py-3 flex flex-col justify-start items-center gap-3 ${bgColors.white}`}>
       <header className='font-semibold text-[15px] self-start'>Shop Details</header>
       <div className='w-full md:w-[75%] lg:w-[65%] xl:w-[65%] 2xl:w-[40%] flex gap-0 md:gap-3 lg:gap-3 xl:gap-5 flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center static md:absolute lg:absolute xl :absolute 2xl:absolute bottom-[102%] right-0'>
        <Inputs handleChange={change} inputs={inputs.slice(0,3) as any} setData={setData} data={data} width='self-end w-full' py='' />
        <div className='flex flex-row gap-1 relative'>
        <Button id='filterDate' loaderClasses=''  classes={`${textColors.white_smoke} ${bgColors.blue} h-[30px] w-[50px] self-start text-[10px] py-1 px-2`} handleClick={handleFilter} icon={<></>}  content={"Filter"}/>
        {/* {
          data.start_Date && data.end_Date
          ?
          <Button id='removeFilterDate' loaderClasses=''  classes={`${textColors.white_smoke} ${bgColors.blue} relative h-[30px] w-full md:w-full lg:w-auto xl:w-auto 2xl:w-auto text-[12px] py-1 px-2 before:absolute hover:before:flex before:content-['Remove_Filter'] before:text-black before:text-[9px] before:rounded-md before:bg-white before:shadow-nav before:py-1 before:px-2 before:bottom-[110%] before:w-[70px] before:hidden`} handleClick={removeFilterDate} icon={<MdFilterAltOff/>}  content={""}/>
          :
          null
        } */}
        </div>
        <Inputs handleChange={change} inputs={inputs.slice(3,4) as any} setData={setData} data={data} width='self-end w-full' py='' />
       </div>
       <Table displayHeader={displayHeader} displayBody={displayBody}/>  
      </section>
    )
}
