import React from 'react'
import { Menu, MenuListProps } from '../../../../types/types'
import { NestedDivList } from './nesteddivList'

export const selectedData = (linkText : string, stateId : number , divisionId :number, districtId : number, ulbId : number) => {
    let obj = {ulbName : linkText, stateId: stateId, divId: divisionId, disId: districtId, ulbId: ulbId}
    return obj
}

export const ifSelectedItem = (item : any, name : string, ulbId  :number, districtId : number, divisionId : number) => {
    return (item && item.ulbName === name) && (item && item.ulbId === ulbId) && (item && item.disId === districtId) && (item && item.divId === divisionId)
}

export const classes = (id :string | undefined, linkText : string, extraClasses : string) => {
    return {
        ul : `flex justify-start items-start flex-col gap-1 text-[13px] font-semibold w-[100px] md:w-[150px] lg:w-[170px] ${id === linkText ? "translate-y-0 z-[1000] opacity-[1] min-h-2 visible flex" : "translate-y-[-10px] opacity-0 z-[-1] invisible h-0 hidden"} ${extraClasses} rounded-lg shadow-custom top-0 absolute right-[100%] bg-[#f5f5f5] duration-[0.3s] `,
        li : `flex gap-1 justify-start items-center p-2 relative cursor-pointer w-full py-2 hover:bg-[#e5e7eb] rounded-lg duration-[0.3s] group ${extraClasses}`
    } 
}

export const StateList = ({list, ulbId,disId, setDisId,setULBId, handleClick, selectedMenuItem} : MenuListProps) => {
    return (
    <>
    {
     list.length ? list.map((item : {parent : Menu, district : Menu[], ulb : Menu[]},index : number) => {
          return(
              <li 
              onClick={(e) => handleClick(e,selectedData(`${item.parent.linkText} Division`, 0, item.parent.divisionId, 0, 0))} 
              className={`${classes("","",`${list.length - 1 === index ? "" : "border-b-[1px] border-b-[#d1d5db]"}`).li}`}
              onMouseEnter={() => {setDisId(item.parent.linkText)}} 
              onMouseLeave={() => {setDisId("")}} 
              key={index} >
                 <span className={`${ifSelectedItem(selectedMenuItem,`${item.parent.linkText} Division`,0, 0, item.parent.divisionId) ? "bg-[#16a34a] text-[#f5f5f5]" : "bg-none text-black"} duration-300  py-1 px-2 rounded-md`}>{item.parent.linkText} Division</span>
                  <ul className={`${classes(disId, item.parent.linkText,"").ul} `}>    
                   <NestedDivList handleClick={handleClick} selectedMenuItem={selectedMenuItem} list={item} ulbId={ulbId} disId={disId} setDisId={setDisId} setULBId={setULBId} />
                  </ul>      
              </li>
          )
      })
      : null
    }
    </>
  )
}