import React, {useState} from 'react';
import {TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {search} from "../../store/slices/citiesSlice";

const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(state => state.cities.searchValue);

  const handleSearch = (e) => {
    dispatch(search({searchValue: e.target.value}));
  }

  return (
    <TextField
      color="primary"
      label="Search"
      variant="standard"
      fullWidth
      type="search"
      value={searchValue}
      onChange={(e) => {handleSearch(e)}}
      sx={{mb: "1.5rem"}}
    />
  );
};

export default Search;