import { List } from './list'
import { IoIosArrowUp } from "react-icons/io";
import { useSession } from '../../../customHooks/useSession';
import { useGetMenuList } from '../../../customHooks/useGetMenuList';
import { Loader } from '../../../commonComponents/loader';
import { selectedData } from './state/stateList';
import { useClick } from '../../../customHooks/useClick';
import { useLocation } from 'react-router-dom';

export const Menu = () => {
  const location = useLocation()
  const { menuList } = useGetMenuList()
  const {handleAdminMenuListItem} = useClick()
  const {getValue} = useSession()
 
  return (
    <div className='group relative'>
      <button  
      onClick={(e) => handleAdminMenuListItem(e, selectedData(getValue().userName,getValue().data.stateId,getValue().data.divId,getValue().data.disId,getValue().data.appId))} disabled={!menuList.length ? true : false}  
      className={`${location.pathname.split("/")[3] === "dashboard" ? "block" : "hidden"} rounded-md px-3 py-2 text-[13px] md:text-[13px] lg:text-[13px]  ${menuList.length ? "bg-[#e5e7eb] cursor-pointer" : "bg-transparent cursor-auto" }`}>
        {  
        !menuList.length 
        ?
        <Loader classes='w-5 h-5 before:w-6 before:h-6'/>
        : 
        <div className='flex justify-center items-center gap-2'>
          <IoIosArrowUp className='group-hover:rotate-180 duration-300'/>
          {
            getValue() !== null 
            ?
            <span>{ getValue().userName }</span>
            : 
            null
          }   
        </div> 
       
         }
        </button>
      {
        !menuList.length
         ?
         null
         :
         <ul className={`${getValue() && getValue().level === 3? "h-[500px] overflow-y-scroll" : ""} flex justify-start items-start flex-col gap-1 w-[100px] md:w-[150px] lg:w-[170px] text-[13px] font-semibold group-hover:translate-y-0 translate-y-[-10px] group-hover:opacity-[1] opacity-0 group-hover:z-[5000] z-[-1] rounded-lg shadow-custom absolute right-0 top-[100%] bg-[#f5f5f5] duration-[0.3s]`}>
         <List list={menuList}/>
         </ul>
      }
       
    </div>
   
  )
}
