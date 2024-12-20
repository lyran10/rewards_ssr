import React, { useState } from 'react';
import { InputTypes } from '../types/types';
import { useRedux } from './useRedux';
import { setMsg } from '../store/reducers/apiReducer';

type Props = {
    data : InputTypes,
    setData : React.Dispatch<React.SetStateAction<InputTypes>>
}

export const useDragFile = ({data, setData} : Props) => {
    const {dispatch} = useRedux()
    const [dragActive, setDragActive] = useState(false);

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    };
  
    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    };
  
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
      e.dataTransfer.dropEffect = 'copy';
    };
  
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
  
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const fileSizeInMB = files[0].size / (1024 * 1024);
        if (fileSizeInMB > 10) {
            dispatch(setMsg({ status: "error", content: "File size must be less than 10 MB." }));
        } else {
            setData({...data, draggedImage : files[0], logo : ""})
        }
        // const validFiles = Array.from(files).filter(file =>
        //     file.type === 'image/png' || file.type === 'image/jpg'
        //   );
    //  if (validFiles.length > 0) setData({...data, draggedImage : validFiles[0], logo : ""})
    //  else dispatch(setMsg({status : "error", content : "Only png, jpg are supported."}))   
      }
    };

  return {handleDragEnter, handleDrop, handleDragOver, handleDragLeave, dragActive}
}
