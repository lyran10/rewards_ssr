import {useEffect, useState} from 'react'
import { InputTypes } from '../types/types'
import { useValidation } from './useValidation'
import { useRedux } from './useRedux'
import { setMsg } from '../store/reducers/apiReducer'
import { useSession } from './useSession'

type Props = {
    id : string
    inputData : InputTypes
    setInputData : React.Dispatch<React.SetStateAction<InputTypes>>
    data : any[],
    value : string,
    key1 : string,
    key2 : string,
    key3 : string,
    key4 : string,
    key5 : string,
    key6 : string,
    key7 : string, 
    key8 : string, 
    key9 : string, 
    key10 : string,
    key11 : string, 
    key12 : string, 
    key13 : string, 
    start? : string,
    end? : string,
    selectValue? : string
} 

export const dateFormat = (date : string, getValue : () => any) => {
  let newDate = date.split(" ")[0]
  let splitNewDate = newDate.split("/")
  if(getValue() && getValue().level || getValue().level === 0){
    return new Date(date.split(" ")[0])
  }
  return new Date(`${splitNewDate[2]}-${splitNewDate[1]}-${splitNewDate[0]}`)
}

export const useFilter = ({id, inputData, data, value, key1, key2, key3, key4, key5, key6, key7, key8, key9, key10, key11, key12, key13, start, end,selectValue, setInputData} : Props) => {
const [filtered, setFiltered] = useState<any[]>([])
const {dateFilterValidation} = useValidation()
const {dispatch} = useRedux()
const {getValue} = useSession()

const filterValues = () => {
    return [...data.filter((item) => 
      item[key1] && item[key1].toLowerCase().includes(value.toLowerCase()) || 
      item[key2] && item[key2].toLowerCase().includes(value.toLowerCase()) ||
      item[key3] && item[key3].toLowerCase().includes(value.toLowerCase()) ||
      item[key4] && item[key4].toLowerCase().includes(value.toLowerCase()) ||
      item[key5] && item[key5].toLowerCase().includes(value.toLowerCase()) ||
      item[key6] && item[key6].toLowerCase().includes(value.toLowerCase()) ||
      item[key7] && item[key7].toLowerCase().includes(value.toLowerCase()) ||
      item[key8] && item[key8].toLowerCase().includes(value.toLowerCase()) ||
      item[key9] && item[key9].toLowerCase().includes(value.toLowerCase()) ||
      item[key10] && item[key10].toLowerCase().includes(value.toLowerCase()) ||
      item[key11] && item[key11].toLowerCase().includes(value.toLowerCase()) ||
      item[key12] && item[key12].toLowerCase().includes(value.toLowerCase()) ||
      item[key13] && item[key13].toLowerCase().includes(value.toLowerCase())
    )]
}

const InsertSerialNo = () => {
  return [...filterValues().reduce((acc, pre, index) => { return [...acc,{...pre, srno : index+ 1}] }, [])]
}

const filterRedeemClaim = (str : string) => {
  setFiltered(() => 
    [...InsertSerialNo().
      filter((item : any) =>{
       let date = dateFormat(item[str], getValue)
       return date  >= new Date(start || "") && date <= new Date(end || "")
      } )
]
)
}

const filterAdminShopDetails = (str : string) => {

  return [...InsertSerialNo().
    filter((item : any) =>{
     let date = dateFormat(item[str], getValue)
     return date >= new Date(start || "") && date <= new Date(end || "")
    } )
]
}

const filterBySelectValue = (str : string) => {
  let data = filterAdminShopDetails("regDate")
 
  if(selectValue && selectValue !== "true"){
    let stackArray = []
    for(let i = 0; i < data.length;i++){
      if(data[i][str].toLowerCase().includes(selectValue && selectValue.toLowerCase() || "")){
        stackArray.push(data[i])
      }
    }
    setFiltered([...stackArray])
  }else{
    setFiltered([...data])
  }
}

const filterOfferDetails = () => {
  if(inputData.isActive === "false") setFiltered(() => [...InsertSerialNo()])
  else{
      setFiltered(() => 
        [...InsertSerialNo().
        filter((item : any) => {
        return new Date(start || "") <= new Date(item.offer_EndTime.split("T")[0]) && new Date(end || "") >= new Date(item.offer_StartTime.split("T")[0])
        })  
       ])
  }
}

const filterByValueAndDate = () => {
 
   if(id === "details"){
      filterOfferDetails()
      return 
    }

  
    if(id === "redeem"){
      filterRedeemClaim("redeemDatetime")
      return
    }

    if(id === "claim"){
      filterRedeemClaim("claimDatetime")
      return
    }

    if(id === "shop"){
      filterBySelectValue("categoryName")
      return
    }

    if(id === "citizen" || id === "employee"){
      setFiltered([...filterAdminShopDetails("regDate")])
      return
    }
  
  return setFiltered([...InsertSerialNo()])
}

useEffect(() => {
    if(data && data.length){
      if(value){
        if(start && end) filterByValueAndDate()
        else setFiltered(() => [...InsertSerialNo()])
      }else{
        if(start && end) filterByValueAndDate()
        else setFiltered(data.reduce((acc, pre, index) => { return [...acc,{...pre, srno : index+ 1}] }, []))
      }
    }else setFiltered([])
  },[data, value])

const filterDate = () =>{
if(!dateFilterValidation(inputData)){
  dispatch(setMsg({status : "error", content : "Select Date Range."}))
  return
}

filterByValueAndDate()
} 

const removeFilterDate = () => {
  setFiltered(() => 
    [...InsertSerialNo()])
    setInputData((data) => { return {...data, start_Date : "", end_Date : ""} } )
}

 return { filterDate, filtered, removeFilterDate }
}