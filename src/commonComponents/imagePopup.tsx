import React from 'react'
import { PopOver } from './popOver'
import { ViewImage } from '../authComponents/registration/viewImage'
import { useRedux } from '../customHooks/useRedux'

type Props = {
imagePreview : string | null,
show : boolean,
handlePopOverClose : () => void
}

export const ImagePopup = ({imagePreview, show, handlePopOverClose} : Props) => {
    const {selector} = useRedux()
    
    const { popOverId } = selector(state => state.loginData)

  return (
    <>
      {
            show && popOverId && popOverId === "viewImage"
            ?
            <PopOver width="w-full flex" bg="bg-transparent">
              <div className="w-[60%] h-[80%] bg-[rgba(0,0,0,.6)]">
              <ViewImage classes="w-[60%] h-[80%]" handleClick={handlePopOverClose} image={imagePreview}/>
              </div>
            </PopOver>
            :
            null
          } 
    </>
  )
}
