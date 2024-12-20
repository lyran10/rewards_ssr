import { useEffect, useState } from 'react'
import { useRedux } from './useRedux'
import { useSession } from './useSession'
import { getMenuList } from '../store/adminAction'
import { Menu } from '../types/types'

const sortingAndStructuring = (arr : Menu[]) => {
    let dis : Menu[] = []
    let ulb : Menu[] = []
    let obj : {parent : Menu, district : Menu[],ulb : Menu[]} = {parent : {} as Menu, district : dis, ulb : ulb}
    const newArr = arr.reduce((acc : any,cur,index,array) => {
        if(index === 0)  obj.parent =  cur
        else if(cur.divisionId === array[index - 1]?.divisionId){
            if(cur.divisionId > 0 && cur.districtId > 0 && cur.ulbId < 1) obj.district = [...obj.district, cur]
            else obj.ulb = [...obj.ulb,cur]
        } 
        else{
            acc.push(obj)
            dis = []
            ulb = []
            obj = {parent : cur, district : dis,ulb : ulb}
          }
         return acc
    },[])
    return [...newArr,obj]
  }


export const useGetMenuList = () => {
  const { dispatch } = useRedux()
  const {getValue} = useSession()
  const [loading, setLoading] = useState<boolean>(false)
  const [menuList, setMenuList] = useState<any[]>([])

  const fetchOffers = async() => {
  setLoading(true)
  const data = await dispatch(getMenuList(getValue().userName))
  setMenuList(sortingAndStructuring(data.payload.data))
  // console.log(data.payload.data)
  setLoading(false)
  }

  useEffect(() => {
    if(getValue().level || getValue().level === 0) fetchOffers()
  },[])

  return {menuList, loading}
}
