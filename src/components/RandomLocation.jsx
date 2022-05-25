import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Button, IconButton, Stack, Typography} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import {GoogleMap, LoadScript, StreetViewPanorama} from "@react-google-maps/api";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReplayIcon from "@mui/icons-material/Replay";

const options = {
  addressControl: false,
  clickToGo: true,
  fullscreenControl: false,
  enableCloseButton: false,
}

const RandomLocation = ({api, isOpen, closeModal, randomCity, reloadCity}) => {

  const [checkCity, setCheckCity] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [center, setCenter] = useState({
    lat: 19.08,
    lng: -102.35,
  })

  useEffect(() => {
    setCenter({
      lat: Number(randomCity?.lat),
      lng: Number(randomCity?.lng),
    })
  }, [randomCity])

  const handleReload = () => {
    reloadCity();
    setCheckCity(false)
    // setButtonDisabled(true);
    // setTimeout(() => {
    //   setButtonDisabled(false)
    // }, "5000");
  }


  return (
    <Drawer anchor="bottom" open={isOpen} onClose={closeModal}>
      <Box height="100vh" display="flex" justifyContent="space-evenly" alignItems="center" flexDirection="column">
        <LoadScript googleMapsApiKey={api}>
          <GoogleMap
            mapContainerStyle={{width: "100%", height: "100%"}}
            zoom={10}
          >
            <StreetViewPanorama
              position={center}
              visible={true}
              options={options}
            />
          </GoogleMap>
        </LoadScript>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          bgcolor='#f0f0f0'
          width="100%"
          height="0"
          p={3}
        >
          <Box>
            <IconButton onClick={closeModal} color="primary" sx={{mr: 2}}>
              <ArrowBackIosIcon/>
            </IconButton>
              <IconButton onClick={handleReload} disabled={buttonDisabled} color="primary" sx={{mr: 2}}>
                <ReplayIcon/>
              </IconButton>


            <Button
              variant="contained"
              onClick={() => setCheckCity(prevState => !prevState)}
              py={1}
            >
              Город
            </Button>

          </Box>

          <Stack display={(checkCity ? 'flex' : 'none')}>
            <Typography variant="h4">
              {randomCity?.name}
            </Typography>
          </Stack>

        </Stack>
      </Box>

    </Drawer>
  );
};

export default RandomLocation;