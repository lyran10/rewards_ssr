import React from 'react'
import { InputTypes } from '../types/types'

type Props = {
    data : InputTypes
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void,
    type : string,
    radioInputs : any[],
    setData : React.Dispatch<React.SetStateAction<InputTypes>>,
}

export const Radio = ({data, handleChange, type, radioInputs} : Props) => {

const change = (e : React.ChangeEvent<HTMLInputElement>) => handleChange(e)

return (
     <div className='relative flex flex-wrap md:flex-nowrap gap-2 justify-start items-center text-[13px]'>
        {
            radioInputs.map(({text, value, name}) => {
                return(
                    <label key={text} className='flex justify-center items-center gap-1'>
                        <input className='accent-[#1E7BAE]' onChange={change}  type={type} name={name} value={value} checked={data[name as keyof InputTypes] === `${value}` ? true : false}/>
                        <span className={`${text.length > 8 ? "w-[65px]" : ""}`}>{text}</span>
                    </label>
                )
            })
        }
    </div>
  )
}