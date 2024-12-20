import React from 'react'
import { Menu } from '../../../../types/types'
import { selectedData, ifSelectedItem, classes } from './stateList'
import { MenuListProps } from '../../../../types/types'

export const NestedDisList = ({list, handleClick, current, selectedMenuItem, nestedDisId} : MenuListProps) => {
  return (
    <>
    {
       list.ulb.sort((a : Menu,b : Menu) => a.linkText.localeCompare(b.linkText))
      .map((ulb : Menu, ulbIndex : number) => {
        if(nestedDisId === ulb.districtId){
              return(
                
                  <li 
                  onClick={(e) => handleClick(e,selectedData(ulb.linkText, 0, 0, 0, ulb.ulbId))} 
                  // flex gap-1 justify-start items-center p-2 relative cursor-pointer w-full py-2 hover:bg-[#e5e7eb] rounded-lg duration-[0.3s] group ${extraClasses}}
                  className={`${classes("","",`border-b-[1px] border-b-[#d1d5db]`).li}`} 
                  key={ulbIndex}>
                        <span 
                        className={`${ifSelectedItem(selectedMenuItem, `${ulb.linkText}`,ulb.ulbId,0, 0) ? "bg-[#16a34a] text-[#f5f5f5]" : "bg-none text-black"} duration-300 py-1 px-2 rounded-md`}>
                          {ulb.linkText}
                        </span>
                  </li>
          )
        }
      })
    }
    </>

  )
}