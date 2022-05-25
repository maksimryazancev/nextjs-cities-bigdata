import React, {forwardRef} from 'react';
import {TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {search} from "../../store/slices/citiesSlice";

// eslint-disable-next-line react/display-name
const Search = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const searchValue = useSelector(state => state.cities.searchValue);

  const handleSearch = (e) => {
    dispatch(search({searchValue: e.target.value}));
  }

  return (
    <TextField
      inputRef={ref}
      color="primary"
      label="Search"
      variant="standard"
      fullWidth
      focused
      type="search"
      value={searchValue}
      onChange={(e) => {
        handleSearch(e)
      }}
      sx={{mb: "1.5rem"}}
    />
  );
});

export default Search;