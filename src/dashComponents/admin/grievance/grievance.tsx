import React from 'react'
import { useRedux } from '../../../customHooks/useRedux'
import { UseInput } from '../../../customHooks/useInput'
import { useColors } from '../../../customHooks/useColors'
import { useFilter } from '../../../customHooks/useFilter'
import { setGrieViewImage, setGrieViewImageInfo, setStartDate } from '../../../store/reducers/dataReducer'
import { FaSearch } from "react-icons/fa";
import { Button } from '../../../authComponents/button'
import { NoData } from '../../home/noData'
import { StackLoader } from '../../../commonComponents/stackLoader'
import { Inputs } from '../../../authComponents/inputs'
import { FaTable } from "react-icons/fa6";
// import { MdFilterAltOff } from "react-icons/md";
import { Table } from '../../offerDetails/table/table'
import { useAdminGrievanceDetails } from '../../../customHooks/useAdminGrievanceDetails'
import { useGetGrieStatusData } from '../../../customHooks/useGetGrieStatusData'
import { Loader } from '../../../commonComponents/loader'
import { useClick } from '../../../customHooks/useClick'
import { checkDateLimit } from '../../../customHooks/useLengthLimit'

export const Grievance = () => {
  const {dispatch, selector} = useRedux()
  const {handleChange, data, setData} = UseInput()
  const {grievanceData, adminLoader, fetchOffers} = useAdminGrievanceDetails({setData, data })
  const {loading, fetchStatusData, buttonId, setButtonId} = useGetGrieStatusData()
  const {bgColors, textColors} = useColors()
  const {getStatusData} = useClick()
  const { filtered } = useFilter({
    id : "grievance",
    inputData : data, 
    data : grievanceData, 
    value : data.search, 
    key1 : "ref_id", 
    key2 : "address",
    key3 : "comment", 
    key4 : "details", 
    key5 : "email", 
    key6 : "name", 
    key7 : "number", 
    key8 : "place", 
    key9 : "tip", 
    key10 : "type", 
    key11 : "wardNo", 
    key12 : "lat_Log",
    key13 : "status",
    start : data.start_Date, 
    end : data.end_Date, 
    setInputData :  setData})

  const inputs =   [
  {
    type : "select",
    name : "status",
    itemId : "isActive",
    label : "Filter status",
    placeholder : "",
    span : "col-span-8 md:col-span-12 lg:col-span-2",
    selectData : [
      {status : "All"},
      {status : "Processing"},
      {status : "Pending"},
      {status : "Resolved"},
      {status : "Rejected"},
    ],
    value : data.isActive,
    content : "Status"
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
    itemId : "grievance"
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
  
  const displayHeader = () => {
      let headers = ["Sr.no", "ID", "Date", "Photo", "Ward No", "Location", "Feedback", "Tips", "Name", "Mobile No", "Email", "Address", "Status", "Comment", "updated Photo", "Grievance Type" ]
  
      return(
          headers.map((item) => {
              return(
                  <th className={`p-2 font-semibold text-[9px] md:text-[12px] lg:text-[11px] text-start ${textColors.grayish_blue}`} key={item}>{item}</th>
              )
          })
          )
  }

const getGrieImageData = (image : string, address? : string, date? : string) => {
  dispatch(setGrieViewImageInfo({image, address, date }))
  dispatch(setGrieViewImage(true))
  } 

  const displayBody = () => {
  return (
      !adminLoader
      ?
      filtered && filtered.length
      ?
      filtered.map((item, index : number) => {
          return (
              <tr key={index} className={`${index % 2 !== 0 ? bgColors.white_smoke : ""} border-b h-[50px] text-center body relative text-[#475569]`}>
                  <td className="p-2 font-[600] text-start">{item.srno}</td>
                  <td className="p-2 font-[600] text-start">{item.ref_id}</td>
                  <td className="p-2 font-[600] text-start">{item.date}</td>
                  <td className="p-2 font-[600]">
                  <Button id='grieviewImage1' loaderClasses=''  classes={`text-[10px] md:text-[10px] lg:text-[10px] ${textColors.blue} flex justify-center items-center gap-2 rounded-md`} handleClick={() => getGrieImageData(item.image, item.address, item.date)} icon={<img height={20} width={20} src={item.image} alt="" />}  content={""}/>
                  </td>
                  <td className="p-2 font-[600] text-start">{item.wardNo}</td>
                  <td className="p-2 font-[600] text-start">{item.lat_Log}</td>
                  <td className="p-2 font-[600] text-start">NA</td>
                  <td className="p-2 font-[600] text-start">{item.tip}</td>
                  <td className="p-2 font-[600] text-start">{item.name}</td>
                  <td className="p-2 font-[600] text-start">{item.number}</td>
                  <td className="p-2 font-[600] text-start">{item.email}</td>
                  <td className="p-2 font-[600] text-start">{item.address}</td>
                  <td className="p-2 font-[600] text-start">
                  <Button id={item.status} loaderClasses='' classes={`px-2 py-1 text-[10px] md:text-[10px] lg:text-[10px] ${bgColors.blue} ${textColors.white_smoke} flex justify-center items-center gap-2 rounded-md`} handleClick={(e) => getStatusData(e, item.ccId, setButtonId, fetchStatusData)} icon={loading && buttonId === item.ccId ? <Loader classes='w-4 h-4 before:w-5 before:h-5'/> : <>{item.status}</> } content={""}/>
                  </td>
                  <td className="p-2 font-[600] text-start">{item.comment}</td>
                  <td className="p-2 font-[600]">
                  <Button id='grieviewImage2' loaderClasses=''  classes={`text-[10px] md:text-[10px] lg:text-[10px] ${textColors.blue} flex justify-center items-center gap-2 rounded-md`} handleClick={() => getGrieImageData(item.status_Image)} icon={<img height={20} width={20} src={item.status_Image} alt="" />}  content={""}/>
                  </td>
                  <td className="p-2 font-[600] text-start">{item.type}</td>
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
       <header className='font-semibold text-[15px] self-start'>Grievance Details</header>
       <div className='w-full md:w-[75%] lg:w-[65%] xl:w-[65%] 2xl:w-[40%] flex gap-0 md:gap-3 lg:gap-3 xl:gap-5 flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center static md:absolute lg:absolute xl :absolute 2xl:absolute bottom-[102%] right-0'>
        <Inputs handleChange={change} inputs={inputs.slice(0,3) as any} setData={setData} data={data} width='self-end w-full' py='' />
        <div className='flex flex-row gap-1 relative'>
        <Button id='filterDate' loaderClasses=''  classes={`${textColors.white_smoke} ${bgColors.blue} h-[30px] w-[50px] self-start text-[10px] py-1 px-2`} handleClick={fetchOffers} icon={<></>}  content={"Filter"}/>
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