import React, { useState, useRef, useEffect } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader, InfoWindowF  } from '@react-google-maps/api';
import { useSession } from '../../../customHooks/useSession';
import { useRedux } from '../../../customHooks/useRedux';

const shopContainerStyle = {
  width: '80%',
  height: '80%',
};

const adminContainerStyle = {
  width: '100%',
  height: '100%',
};

type Props =  {
  id : string,
  data  : {latitude : number,longitude: number,shopAddress?: string,shopName?: string,ulbId?: number |null}[]
}

export const AdminGoogleMap = ({id, data} : Props) => {
    const mapRef = useRef<google.maps.Map | null>(null)
    const { selector } = useRedux()
    const {getValue} = useSession()
    const [center, setCenter] = useState<{ lat: number, lng: number } | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<{
        latitude : number,
        longitude: number,
        shopAddress?: string,
        shopName?: string,
        ulbId?: number |null
    } | null>(null)
    const { coords : {lat , lon} } = selector(state => state.loginData)
   
    useEffect(() => {
      if(data && id === "shopMap"){
        setCenter({lat : data[0].latitude, lng : data[0].longitude})
      }

    },[data])

    const { isLoaded } = useJsApiLoader({
        id : "AIzaSyCO06icphqToGjr7ysluH4gCkDoK21viAw",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
      });

      // const handleCenterChanged = useCallback(() => {
      //   if (mapRef.current) {
      //     const newCenter = mapRef.current.getCenter();
      //     if (newCenter) {
      //       const lat = newCenter.lat();
      //       const lng = newCenter.lng();
      
      //       // Only update the state if the new center is different
      //       if (
      //         (center && center?.lat && lat !== center.lat) ||
      //         (center && center?.lng && lng !== center.lng)
      //       ) {
      //         // setCenter((prevCenter) => ({ ...prevCenter, lat, lng }));
      //         // newData = {
      //         //   lat : lat,
      //         //   lng : lng
      //         // }
              
      //       }
      //     }
      //   }
      // }, []);
      
      if (!isLoaded) {
        return <div>Loading...</div>;
      }

  return (
  <GoogleMap
    // onCenterChanged={handleCenterChanged}
    onLoad={(map) => {mapRef.current = map}} 
    onClick={() => {
      setSelectedMarker(null)
    }}
      mapContainerStyle={id === "shopMap" ? shopContainerStyle : adminContainerStyle}
      center={{
        lat : center && center.lat ? center.lat : getValue() && getValue().data ? getValue().data.latitue : lat,
        lng : center && center.lng ? center.lng :getValue() && getValue().data ? getValue().data.longititue : lon
      }}
      zoom={getValue() && getValue().data ? getValue().data.zoomLevel : 12}
    >
   {
    data && data.map((location, index) => {
        return(
           <MarkerF
            onClick={()=>{
              if(id === "adminGoogleMap"){
                setSelectedMarker(location)
                setCenter({lat: location.latitude, lng : location.longitude})
              }
            }}
            key={index}
            position={{
                lat: location.latitude,
                lng: location.longitude,
            }}
            />
        )
    })
   }

{
selectedMarker !== null

    ?
       <InfoWindowF
        onCloseClick={ () => setSelectedMarker(null)}
        position={{
        lat: selectedMarker.latitude,
        lng: selectedMarker.longitude,
        }}
         >
            <div className='flex flex-col gap-1 font-semibold'>
            <span>Shop Name : {selectedMarker.shopName}</span>
            <span>Shop Address : {selectedMarker.shopAddress}</span>
            </div>
        </InfoWindowF>
        :
        null
          }
    </GoogleMap>
  )
}



