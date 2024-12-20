import React, { useEffect } from "react"
import { useColors } from '../../customHooks/useColors'
import { useSession } from '../../customHooks/useSession'
import { List } from './list'
import { Logout } from './logout'
import { Menu } from "../admin/menu/menu"
import { useUpdateUserName } from "../../customHooks/useUpdateUserName"
import { List2 } from "./list2"

export const Navbar = () => {
const {getValue} = useSession()
const { bgColors , textColors } = useColors()
const {username} = useUpdateUserName()

return (
    <nav className={`w-full ${textColors.cyan950} shadow-chart relative`}>
      <div className={`h-[50px] w-full px-5 flex justify-between items-center ${bgColors.blue} ${textColors.white_smoke} font-semibold`}>
        <span className='tracking-wide'>{ getValue() && getValue().level || getValue() && getValue().level === 0 ?  "Admin" : "Citizen" }CMS</span>
        <div className='font-semibold flex gap-5 justify-center items-center text-[13px]'>
          <span>{username}</span>
          <Logout />
        </div>
      </div>
      <div className={`relative h-[50px] flex justify-between items-center w-full px-5 bg-white ${bgColors.white}`}>
        <List/>
        <List2/>
        {/* { getValue().level || getValue().level === 0 ?  <Menu/> : null } */}
      </div>
    </nav>
  )
}
