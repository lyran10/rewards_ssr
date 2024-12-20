import React from 'react'
import { useColors } from '../../customHooks/useColors'

type Props = {
    data : { id : string, header : string, span : string, value : string}[]
}

export const ProfileData = ({data} : Props) => {
    const {textColors} = useColors()
    
  return (
    <>
    {
  data.slice(0,6).map(({id, header, span, value}) => {
    return(
        <div key={id} className={`${span} flex flex-col gap-1`}>
            <span className={`font-semibold text-[13px] ${textColors.grayish_blue}`}>{header}</span>
            {
                id === "image"
                ?
                <img className='w-[80%]' src={value as string} alt="" />
                :
                id === "status"
                ?
                <span className={`font-semibold  ${value === "Active" ? textColors.green : textColors.red}`}>{value}</span>
                :
                <span className={`font-semibold text-[#334155]`}>{value}</span>
            }
        </div>
    )
})
    }
    </>
  )
}
