import {useEffect,useState} from 'react'
// import { useRedux } from './useRedux';
// import { selected } from '../store/actions';
// import { selectedItem } from '../store/reducer';
// import { Selected } from '../types/types';

export const useSelectedListItem = () => {
    // const {dispatch, selector} = useRedux()
    const [ulbId,setULBId] =  useState<string>("")
    const [disId,setDisId] =  useState<string>("")
    // const [selectedDetails,setSelectedDetails] = useState<Selected>({} as Selected)

    // useEffect(() => {
    //     if(Object.keys(selectedDetails).length){
    //         dispatch(selected(selectedDetails))
    //         dispatch(selectedItem(selectedDetails))  
    //     } 
    //   },[selectedDetails])
    //   setSelectedDetails, selectedDetails

  return {ulbId, setULBId, disId, setDisId }
}