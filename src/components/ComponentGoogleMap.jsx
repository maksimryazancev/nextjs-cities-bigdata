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

const ComponentGoogleMap = ({center, api}) => {

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