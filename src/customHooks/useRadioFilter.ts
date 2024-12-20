import {useEffect, useState} from 'react'
import { isActive } from '../dashComponents/offerDetails/offerDetails'
import { useSession } from './useSession'
import { dateFormat } from './useFilter'

type Props = {
  id : string,
value : string | boolean
data : any[]
}

export const useRadioFilter = ({id, value, data} : Props) => {
  let date = new Date()
  const {getValue} = useSession()
  const [radioFilter,setRadioFilter] = useState<any[]>([])

 useEffect(() => {

    if(data && data.length){
      if(id === "redeem"){
        let date = new Date()
        if(value === "true"){
         
          setRadioFilter(() => [...data.
            filter((item : any) =>{           
              let endDate = dateFormat(item.offerEndDate.split("T")[0], getValue)
              return endDate >= date && !item.claimStatus
             })])
        }else if(value === "notActive"){
          setRadioFilter(() => [...data.
            filter((item : any) =>{
              let endDate = dateFormat(item.offerEndDate.split("T")[0], getValue)
              return endDate <= date && !item.claimStatus
             })])
          }else{
          setRadioFilter([...data])
        }

      }else{

        if(value === "true"){
          setRadioFilter([...data.filter((item) => isActive(item.offer_IsActive, item.offer_EndTime) === true)])
        }else if(value === "false"){
          setRadioFilter([...data.filter((item) => isActive(item.offer_IsActive, item.offer_EndTime) === false)])
        }else if(value === "notActive"){
            setRadioFilter([...data.filter((item) => isActive(item.offer_IsActive, item.offer_EndTime) === "notActive")])
          }else{
          setRadioFilter([...data].
            filter((item : any) => {
              return item.offer_IsActive && date < new Date(item.offer_EndTime) || !item.offer_IsActive && date < new Date(item.offer_EndTime)
              }) 
          )
        }

      }
    
    }else{
      setRadioFilter([])
    }

  },[value, data])

  return {radioFilter}
}
