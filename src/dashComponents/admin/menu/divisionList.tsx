import React from 'react'
import { Menu } from '../../../types/types'
import { selectedData, ifSelectedItem, classes } from './state/stateList'
import { MenuListProps } from '../../../types/types'
import { NestedDisList } from './state/nesteddisList'

export const DivisionList = ({list, ulbId, setULBId, handleClick,current, selectedMenuItem,setDisId,disId} : MenuListProps) => {
  return (
    <>
    {
     list && list.length ? list.map((item : {parent : Menu, district : Menu[], ulb : Menu[]},index : number) => {
          return(
            item.district.map((dis : Menu,disIndex : number) => {
                return(
                        <li 
                        onClick={(e) => handleClick(e,selectedData(`${item.parent.linkText} District`, 0, 0, dis.districtId, 0))}
                        className={`${classes("","",`${item.district.length - 1 === disIndex ? "" : "border-b-[1px] border-b-[#d1d5db]"}`).li}`} 
                        onMouseEnter={() => setULBId(dis.linkText)}  
                        onMouseLeave={() => setULBId("")} 
                        key={disIndex} >
                              <span className={`${ifSelectedItem(selectedMenuItem, `${item.parent.linkText} District`,0, dis.districtId, 0) ? "bg-[#16a34a] text-[#f5f5f5]" : "bg-none text-black"} duration-300  py-1 px-2 rounded-md`}>{dis.linkText} District</span>
                            <ul
                            className={`${classes(ulbId, dis.linkText,"").ul} `}>
                              <NestedDisList nestedDisId={dis.districtId} handleClick={handleClick} selectedMenuItem={selectedMenuItem} list={item} ulbId={ulbId} setULBId={setULBId} disId={disId} setDisId={setDisId}/>
                            </ul>
                       </li>
                )
            })
          )
      })
      : null
    }
    </>

  )
}