import {Box, Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {dontWantToVisit, openModalWindow, wantToVisit} from "../store/slices/citiesSlice";
import Highlighter from "react-highlight-words";

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
    <Box style={style} key={id}>
       <Box display="flex" justifyContent="space-between" alignItems="center" style={{margin: "5px 0", padding: "10px 5px", border: `3px solid #000`}}>
        <Box >
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
          width={200}
        >
          <Button variant="contained" style={{marginBottom: 16}} onClick={handleModalWindow}>See on maps</Button>
          <Button variant={visit ? "outlined" : "contained"} onClick={handleWish}>{visit ? "No, thanks" : "I want to visit"}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default City;