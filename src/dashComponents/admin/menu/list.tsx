import { useRedux } from '../../../customHooks/useRedux'
import { Menu } from '../../../types/types'
import { DivisionList } from './divisionList'
import { DistrictList } from './districtList'
import { useSession } from '../../../customHooks/useSession'
import { useSelectedListItem } from '../../../customHooks/useSelectedListItem'
import { StateList } from './state/stateList'
import { useClick } from '../../../customHooks/useClick'

type Props = {
    list : {parent : Menu, district : Menu[], ulb : Menu[]}[]
}

export const List = ({list} : Props) => {
    const { selector } = useRedux()
    const {getValue} = useSession()
    const {handleAdminMenuListItem} = useClick()
    const { ulbId, setULBId, disId, setDisId } = useSelectedListItem()
    const { selectedMenuItem } = selector((state) => state.data);

  return (
    <>
        {
               getValue() && getValue().level === 1 || getValue().level === 0
             ? 
               <StateList handleClick={handleAdminMenuListItem} selectedMenuItem={selectedMenuItem} list={list} ulbId={ulbId} disId={disId} setDisId={setDisId} setULBId={setULBId}/>
             : getValue() && getValue().level === 2
             ? 
               <DivisionList handleClick={handleAdminMenuListItem} selectedMenuItem={selectedMenuItem} list={list || []} ulbId={ulbId} disId={disId} setDisId={setDisId} setULBId={setULBId} />
             : getValue() && getValue().level === 3 || getValue().level === 5
             ?
               <DistrictList handleClick={handleAdminMenuListItem} selectedMenuItem={selectedMenuItem} list={list} ulbId={ulbId} disId={disId} setDisId={setDisId} setULBId={setULBId}/>
             : getValue() && getValue().level === 4 
             ?
               <DivisionList handleClick={handleAdminMenuListItem} selectedMenuItem={selectedMenuItem} list={list || []} ulbId={ulbId} disId={disId} setDisId={setDisId} setULBId={setULBId} />      
             :
               null
        }
    </>
  )
}