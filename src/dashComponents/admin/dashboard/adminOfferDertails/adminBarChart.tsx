import React from 'react'
import { useAdminBarChart } from '../../../../customHooks/useAdminBarChart'
import { useColors } from '../../../../customHooks/useColors'
import useDynamicModules from '../../../../customHooks/useDynamicModules'

type Props = {
  totalOffer : number,
  claimOfferCount : number,
  redeemOfferCount : number
}

export const AdminBarChart = ({claimOfferCount, redeemOfferCount, totalOffer} : Props) => {
    const {textColors} = useColors()
    const {chartOptions} = useAdminBarChart()
    const ApexCharts = useDynamicModules({library : "react-apexcharts"})
  
    if (!ApexCharts) return <></>;
    
let series = [
  {
    name: 'redeem',
    data: [
      {
        x: 'Category A',
        y: redeemOfferCount ? (redeemOfferCount / totalOffer) * 100 :0,
        goals: [
          {
            name: 'Expected',
            value: 100,
            // fillColor: '#EB8C87',
            // strokeHeight : 18,
            strokeWidth: 1000,
            strokeColor: 'rgba(98,187,171,0.4)'
          }
        ],
        result : totalOffer 
      }, 
   
    ],
    color : "#62BBAB"
  },
  {
    name: 'claim',
    data: [
      {
        x: 'Category B',
        y: claimOfferCount ? (claimOfferCount / totalOffer) * 100 :0,
        goals: [
          {
            name: 'Expected',
            value: 100,
            // strokeHeight : 18,
            strokeWidth: 1000,
            strokeColor: 'rgba(142,140,246,0.4)',
          }
        ],
        result : totalOffer 
      },   
    ],
    color : "#8E8CF6"
  }
]

  return (
    <div className='relative w-[70%] h-full justify-center items-center self-end p-3 flex flex-col gap-2'>
        <div className='w-[100%] flex justify-center items-center static md:absolute h-full 2xl:h-[70%] top-0 2xl:top-8'>
        <div className={`flex flex-col gap-10 md:gap-5 lg:gap-4 xl:gap-6 2xl:gap-[1rem] text-[12px] font-semibold ${textColors.grayish_blue}`}>
          <span className='mt-3 flex justify-center items-center gap-2'><span className='hidden lg:block'>Total</span> Redeem</span>
          <span className='flex justify-center items-center gap-2'><span className='hidden lg:block'>Total</span>Claim</span>
        </div>
        <ApexCharts
          options={chartOptions}
          series={series}
          type="bar"
          height={"150%"}
        />
       <div className={`flex flex-col gap-4 md:gap-5 lg:gap-4 xl:gap-6 2xl:gap-[1rem] text-[15px] font-semibold ${textColors.grayish_blue}`}>
          <span className='mt-3 text-[#62BBAB] justify-center items-center gap-2 hidden lg:flex'>{redeemOfferCount}</span>
          <span className='justify-center text-[#8E8CF6] items-center gap-2 hidden lg:flex'>{claimOfferCount}</span>
        </div>
    </div>
</div>
  )
}