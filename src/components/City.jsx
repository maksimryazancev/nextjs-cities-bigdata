import {Box, Button, Container, Divider, IconButton, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {dontWantToVisit, openModalWindow, wantToVisit} from "../store/slices/citiesSlice";
import Highlighter from "react-highlight-words";
import MapIcon from '@mui/icons-material/Map';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationOffIcon from '@mui/icons-material/LocationOff';

const City = ({data, index, style}) => {
  const dispatch = useDispatch();
  const city = useSelector(state => state.cities.collection.find(element => element.id === data[index]))
  const {id, name, population, country} = city;
  const visit = useSelector(state => state.cities.wishVisit.includes(id));
  const searchValue = useSelector(state => state.cities.searchValue);

  const handleWish = () => {
    if (!visit) {
      dispatch(wantToVisit({cityId: id}));
    } else {
      dispatch(dontWantToVisit({cityId: id}));
    }
  }

  const handleModalWindow = () => {
    dispatch(openModalWindow({city}));
  }

  return (
    <Box
      style={{...style, top: `${parseFloat(style.top) + 100}px`}}
      className="item"
      key={id}
    >
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingBottom="10px"
        >
          <Box>
            <Typography variant="h4" component="h4">
              {id}{". "}
              <Highlighter
                highlightClassName="search-highlighter"
                searchWords={[searchValue]}
                autoEscape={true}
                textToHighlight={name}
              />
            </Typography>
            <Box>
              <Typography variant="p" component="p">
                <Highlighter
                  highlightClassName="search-highlighter"
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={population}
                />
                {" | "}
                <Highlighter
                  highlightClassName="search-highlighter"
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={country}
                />
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
          >
            <IconButton color="primary" size="large" style={{marginBottom: 16}}
                        onClick={handleModalWindow}>
              <MapIcon/>
            </IconButton>
            <Button variant={visit ? "outlined" : "contained"}  size="large" onClick={handleWish}>
              {visit
                ?
                <AddLocationAltIcon/>
                :
                <LocationOffIcon/>
              }
            </Button>
          </Box>
        </Box>
        <Divider/>
      </Container>
    </Box>
  );
};

export default City;