import React, { Children } from 'react'
import { useColors } from '../../../../customHooks/useColors'

type Props = {
  valueColor : string,
  valueSize : string,
  title : string,
  value : number | string,
  classes? : string
}

export const ValueTitlePair = ({valueColor, valueSize, value, title, classes} :Props) => {
  const {textColors}= useColors()
  return (
    <div className={`flex justify-center items-center flex-col font-semibold ${classes}`}>
      <span className={`${valueColor} ${valueSize}`}>{value}</span>
      <span className={`${textColors.grayish_blue} text-[8px] md:text-[8px] lg:text-[12px]`}>{title}</span>
    </div>
  )
}
