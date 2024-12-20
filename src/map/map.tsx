import React, { useState, useEffect, useRef } from "react";
import { Map as MapLibreMap, NavigationControl, Marker, FullscreenControl, Popup  } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import { Loader } from "../commonComponents/loader";
import { useMapLoader } from "../customHooks/useMapLoader";
import { useRedux } from "../customHooks/useRedux";
import { getCoord } from "../store/reducers/loginReducer";
import { useSession } from "../customHooks/useSession";
// MOXyccyceJVin4KGXsphyPqEXenpNfptRIJbx2YH
interface ViewStateProps {
    longitude: number;
    latitude: number;
    zoom: number;
    [key: string]: any; // To include any additional properties from the view state
  }

  type Props = {
    height : string,
    width : string,
    handleCoords? : (coords :{lat : string | number, lon : string | number}) => void,
    data? : {latitude : number,longitude: number,shopAddress: string,shopName: string,ulbId: number |null}[]
  }

export const MapComponent = ({ height, width, handleCoords, data } : Props) => {
  const { selector } = useRedux()
  const {getValue} = useSession()
  const { coords : {lat , lon} } = selector(state => state.loginData)
  const {loader, showLoader, removeLoader} = useMapLoader()
  const [mapReady, setMapReady] = useState(false);
  // 79.0882, 21.1458

    useEffect(() => {
      if (!mapReady) return;
      showLoader()
      const map = new MapLibreMap({
        container: "central-map",
        center: getValue() && getValue().data ? [ getValue().data.longititue, getValue().data.latitue] : [lon, lat],
        zoom: getValue() ? getValue().data.zoomLevel : 12,
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        transformRequest: (url : string, resourceType : any) => {

          if(!url.includes("?")){
            url = url + "?api_key=MOXyccyceJVin4KGXsphyPqEXenpNfptRIJbx2YH";
          }
          else{
            url = url + "&api_key=MOXyccyceJVin4KGXsphyPqEXenpNfptRIJbx2YH";
          }

          return { url, resourceType};
        },
      });

      const nav = new NavigationControl({
        visualizePitch: true,
      });

      const fullscreen = new FullscreenControl();

      map.addControl(nav, "top-left");
      map.addControl(fullscreen, "top-left");

      map.on('load', () => {
        removeLoader()
        if(handleCoords){
          const marker = new Marker({ draggable: true })
          .setLngLat([lon,lat]) // Position of the marker
          .addTo(map);
  
        // Event listener for marker drag end
        marker.on('dragend', () => {
          const lngLat = marker.getLngLat();
          // console.log(`Marker dropped at: ${lngLat.lng}, ${lngLat.lat}`);
          if(handleCoords) handleCoords({lat : lngLat.lat.toFixed(4), lon : lngLat.lng.toFixed(4)})
        });
        }

        if(data){
          data.forEach(({longitude, latitude, shopName, shopAddress}) => {
            const marker = new Marker()
              .setLngLat([longitude, latitude])
              .setPopup(new Popup().setHTML(`Shop Name : ${shopName} <br/> Shop Adress :  ${shopAddress}
                `))
              .addTo(map);
          });
        }
      
      });
  
      return () => {
        if (map) {
          map.remove();
        }
      };

    }, [mapReady, data]);
    // relative md:absolute lg:absolute top-0 md:top-[105%] lg:top-[105%] left-0
  return (
    <>
      <div
      className={`${height} ${width} m-auto`}
      ref={() => setMapReady(true)}
      id="central-map"
    />

  
  {
    loader
    ?
    <Loader classes='absolute w-6 h-6 before:w-8 before:h-8'/>
    :
    null
  }
    </>

  );
};
