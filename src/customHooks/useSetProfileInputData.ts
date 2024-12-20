import React,{useEffect} from 'react'
import { InputTypes } from '../types/types'

type Props = {
    setData : React.Dispatch<React.SetStateAction<InputTypes>>,
    getValue : () =>  any,
    data : InputTypes
}

export const useSetProfileInputData = ({data, setData, getValue} : Props) => {

    useEffect(() => {
        setData({...data, 
        name : getValue() && getValue().name || getValue() && getValue().aName || "",
        address : getValue() && getValue().address || "",
        mobileNo : getValue() && getValue().contactNo || '',
        logo : getValue() && getValue().logo_Url || '',
    })
    },[])
  return 
}
