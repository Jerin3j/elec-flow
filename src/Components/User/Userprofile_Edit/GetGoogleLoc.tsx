import React, { useState, useCallback, useEffect, RefAttributes } from 'react';
import {  TileLayer, MapContainer, Marker, MapContainerProps, useMapEvents, useMap } from "react-leaflet";
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducer/store';

interface Coordinates{
  lat: number;
  lng: number;
}
interface style{
  width: string;
  height: string;
}
 function GetGoogleLoc() {
 
   const lat = useSelector((state: RootState)=> state.userLocation.LocDetails?.latitude)
  const lng = useSelector((state: RootState)=> state.userLocation.LocDetails?.longitude)
   let [position, setPosition] = useState<any>([9.9183261, 76.255851])
  useEffect(() => {
    if (lat && lng) {
      setPosition({ lat, lng });
    }
  }, [lat, lng]);

  const map = useMapEvents({click(){
    map.locate()
  },
locationfound(e){
  console.log("LatLong leaflet ", e.latlng);
  
  setPosition(e.latlng)
  map.flyTo(e.latlng, map.getZoom())
}})
  const style: style = {
    width: '100%',
    height: '100vh'
  }
  // position= {lat: 9.9183261, lng: 76.255851}; // Example center coordinates



  return (
      <MapContainer center={position} style={style} zoom={16} zoomControl={true}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
        <Marker position={position} eventHandlers={{
          click: (e) => {
            map.flyTo(e.latlng, 14);
          },
        }}></Marker>
          </MapContainer>
  );
}

export default GetGoogleLoc;
