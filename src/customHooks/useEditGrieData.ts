import React, { useEffect, useState } from 'react'
import { InputTypes } from '../types/types'

type Props = {
    data : InputTypes,
    setData : React.Dispatch<React.SetStateAction<InputTypes>>,
    values : {ccid: number, status: string, status_Des: string, status_ImgUrl: string},
    handleImageChange : any
}

export const useEditGrieData = ({data, setData, values, handleImageChange} : Props) => {
const [btnId, setBtnId] = useState<string>("")


  useEffect(() => {
    if(values){
        setData({...data,
            logo : values.status_ImgUrl,
            grieDetails : values.status_Des
         })
    }
    },[values])

    useEffect(() => {
        if(data.logo) handleImageChange(data)
    },[data.logo])

  return {btnId, setBtnId}
}
