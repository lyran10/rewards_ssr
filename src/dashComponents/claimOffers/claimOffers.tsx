import React from "react"
import { useColors } from '../../customHooks/useColors'
import { UseInput } from '../../customHooks/useInput'
import { useGetClaimOffers } from '../../customHooks/useGetClaimOffers'
import { FaSearch } from "react-icons/fa";
import { DisplayOffers } from '../../commonComponents/displayOffers'

export const ClaimOffers = () => {
const {textColors} = useColors()
const {data, setData, handleChange} = UseInput()
const { claimOffers, loading, fetchOffers }= useGetClaimOffers({data})
const inputs = [
  {
    type : "date",
    name : "start_Date",
    label : "From Date",
    placeholder : "",
    span : "col-span-12 md:col-span-2 lg:col-span-1",
  //   showIcon : <FaEye className='text-[#a1a1aa] duration-300' size={15}/>,
  //   hideIcon : <FaEyeSlash className='text-[#a1a1aa] duration-300' size={15}/>,
    value : data.start_Date,
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

return <DisplayOffers startArray={[0,2]} endArray={[2,3]} data={data} setData={setData} handleChange={handleChange} id="claim" inputs={inputs} offersData={claimOffers} loading={loading} handleClick={fetchOffers}/>
}
