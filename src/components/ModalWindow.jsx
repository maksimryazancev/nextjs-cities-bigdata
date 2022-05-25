import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {useDispatch, useSelector} from "react-redux";
import {closeModalWindow} from "../store/slices/citiesSlice";
import {Container, Typography} from "@mui/material";
import ComponentGoogleMap from "./ComponentGoogleMap";

const ModalWindow = ({api}) => {
  const dispatch = useDispatch();
  const city = useSelector(state => state.cities.modalWindowId);

  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow());
  };

  return (
    <Drawer anchor="bottom" open={!!city} onClose={handleCloseModalWindow}>
      <Box width="bottom">
        <Container>
          <Box height={600} display="flex" justifyContent="space-evenly" alignItems="center" flexDirection="column">
            <Typography variant="h3" component="p">{city?.name}</Typography>
            <ComponentGoogleMap api={api} center={{lat: Number(city?.lat), lng: Number(city?.lng),}}/>
          </Box>
        </Container>
      </Box>
    </Drawer>
  );
}

export default ModalWindow;