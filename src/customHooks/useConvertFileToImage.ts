import React,{useState} from 'react'
import { InputTypes } from '../types/types'

type Props = {
    data? : InputTypes | undefined
    file : any
}

export const useConvertFileToImage = ({data, file} : Props) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
  
    const handleImageChange = (data : any) => {
        // const file = event.target.files?.[0];
        if(data && data.logo && typeof(data.logo) === "string"){
            setImagePreview(data ? data.logo : "")
        }else{
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file.');
            }

        }
     
    };

  return {imagePreview, setImagePreview, handleImageChange}
}
