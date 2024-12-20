import React from 'react'

type Props = {
    head : string,
    classes : string,
    children? : React.ReactNode
}

export const sum = (data : {redeemDayName: string, redeemDate: string, redeemCount: number}[] | {claimDayName: string, claimDate: string, claimCount: number}[] | undefined, keys : {name : string, date : string, count : string}) => {
    let total = 0
    let {count} = keys
        if(data && data.length){
            for(let i = 0; i < data.length;i++){
                const currentData = data[i] as any;
                total += currentData[count]
            }
        }
        return total
}

export const DashboardHeader = ({head, classes, children} :Props) => {
  return (
    <div className={`${classes}`}>
        <span className='font-semibold text-[14px] self-start'>{head}</span>
        {children}
    </div>
  )
}
