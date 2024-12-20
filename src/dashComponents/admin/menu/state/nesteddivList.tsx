import React from 'react'
import { Menu } from '../../../../types/types'
import { selectedData, ifSelectedItem, classes } from './stateList'
import { MenuListProps } from '../../../../types/types'
import { NestedDisList } from './nesteddisList'


export const NestedDivList = ({list, ulbId, setULBId, handleClick,current, selectedMenuItem,setDisId,disId} : MenuListProps) => {
  return (
    <>
    {
      list.district.map((dis : Menu,disIndex : number) => {
                return(
                        <li 
                        onClick={(e) => handleClick(e,selectedData(`${list.parent.linkText} District`, 0, 0, dis.districtId, 0))}
                        className={`${classes("","",`${ disIndex === list.district.length - 1 ? "" : "border-b-[1px] border-b-[#d1d5db]"}`).li}`} 
                        onMouseEnter={() => setULBId(dis.linkText)}  
                        onMouseLeave={() => setULBId("")} 
                        key={disIndex} >
                              <span className={`${ifSelectedItem(selectedMenuItem, `${list.parent.linkText} District`,0, dis.districtId, 0) ? "bg-[#16a34a] text-[#f5f5f5]" : "bg-none text-black"} duration-300  py-1 px-2 rounded-md`}>{dis.linkText} District</span>
                            <ul
                            className={`${classes(ulbId, dis.linkText, "").ul}`}>
                              <NestedDisList nestedDisId={dis.districtId} handleClick={handleClick} selectedMenuItem={selectedMenuItem} list={list} ulbId={ulbId} setULBId={setULBId} disId={disId} setDisId={setDisId}/>
                            </ul>
                       </li>
                )
            })
    }
    </>

  )
}

// justify-start items-start flex-col gap-1 text-[13px] font-semibold w-[100px] md:w-[150px] lg:w-[170px]
//                             ${ulbId === dis.linkText ? "translate-y-0 z-[1000] opacity-[1] min-h-2 visible flex" : "translate-y-[-10px] opacity-0 z-[-1] invisible h-0 hidden"} 
//                             overflow-y-scroll h-[260px] rounded-lg shadow-custom top-0 absolute right-[100%] bg-[#f5f5f5] duration-[0.3s]