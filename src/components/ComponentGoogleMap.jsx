import React from 'react';
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

const options = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableControl: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
}

const ComponentGoogleMap = ({center}) => {
  const api = "AIzaSyA0D5afNh186o9e1EM8dg9Tzm6CyCJdLk0";
  // example: NEXT_PUBLIC_GOOGLE_API_KEY = AIzaSyA0D5afNh186o9e1EM8dg9Tzm6CyCJdLk0 in '.env' file

  return (
    <LoadScript googleMapsApiKey={api}>
      <GoogleMap
        mapContainerStyle={{width: "70%", height: "70%"}}
        center={center}
        zoom={10}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default ComponentGoogleMap;