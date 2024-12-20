import React from 'react'
import { useColors } from '../../customHooks/useColors'
import { useGetRedeemOffers } from '../../customHooks/useGetRedeemOffers'
import { UseInput } from '../../customHooks/useInput'
import { FaSearch } from "react-icons/fa";
import { DisplayOffers } from '../../commonComponents/displayOffers'

export const RedeemOffers = () => {
    const {textColors} = useColors()
    const {data, setData, handleChange} = UseInput()
    const { redeemOffers, loading, fetchOffers }= useGetRedeemOffers({data})
    const inputs = [
      {
        type : "radio",
        span : "col-span-11 md:col-span-2 lg:col-span-1",
        label : "",
        radioInputs : [
          {
            name : "isActive",
            text : "Redeem",
            value :  true
          },
          {
            name : "isActive",
            text : "Unclaimed",
            value : "notActive"
          },
          {
            name : "isActive",
            text : "Both",
            value : "both"
          },
    ]
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

  return <DisplayOffers startArray={[0,3]} endArray={[3,4]} data={data} setData={setData} handleChange={handleChange} id="redeem" inputs={inputs} offersData={redeemOffers} loading={loading} handleClick={fetchOffers}/>
}
