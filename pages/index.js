import {forwardRef, useEffect, useRef, useState} from "react";
import Head from 'next/head'
import Link from "next/link";

import {useDispatch, useSelector} from "react-redux";
import {FixedSizeList as List} from 'react-window';
import {Box, Button, Container} from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

import {citiesSucceeded} from "../src/store/slices/citiesSlice";
import Search from '../src/components/UI/Search'
import City from "../src/components/City";
import ModalWindow from "../src/components/ModalWindow";
import fetchCity from "../src/utils/fetchCity";
import RandomLocation from "../src/components/RandomLocation";
import getRandomInRange from "../src/utils/randomNumber";


export default function HomePage() {

  const api = "AIzaSyA0D5afNh186o9e1EM8dg9Tzm6CyCJdLk0";

  const dispatch = useDispatch()

  const citiesId = useSelector(state => state.cities.listId);

  const cities = useSelector(state => state.cities.collection);

  const citiesWishVisit = useSelector(state => state.cities.wishVisit);

  const searchValue = useSelector(state => state.cities.searchValue);

  const [neededCities, setNeededCities] = useState([]);

  const [boolNeededCitites, setBoolNeededCitites] = useState(true);

  const [randomModal, setRandomModal] = useState(false);

  const [randomCity, setRandomCity] = useState({});

  const searchRef = useRef(null);

  useEffect(async () => {
    dispatch(citiesSucceeded( await fetchCity()));
  }, []);

  useEffect(() => {
    setNeededCities(citiesId);

  }, [citiesId]);

  useEffect(() => {

    if (!/^ *$/.test(searchValue)) {
      const searchCities = [];

      cities.forEach(element => {
        if (element.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          element.population.toLowerCase().includes(searchValue.toLowerCase()) ||
          element.country.toLowerCase().includes(searchValue.toLowerCase())) {

          searchCities.push(element.id)
        }
      })

      setNeededCities(searchCities);

    } else {
      setNeededCities(citiesId);

    }
  }, [searchValue]) // handle search

  useEffect(() => {
    searchRef.current?.focus()
  }, [neededCities]) // focus search input

  const handleVisit = () => {
    if (boolNeededCitites) {
      setNeededCities(citiesWishVisit);

    } else {
      setNeededCities(citiesId);

    }
    setBoolNeededCitites(prevState => !prevState)
  }

  const handleRandomModal = () => {

    setRandomCity(cities[getRandomInRange(0, 4659, 0)]);

    setRandomModal(true);

  }

  // eslint-disable-next-line react/display-name
  const innerElementType = forwardRef(({style, ...rest}, ref) => {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop="24px"
          alignItems="center"
        >
          <Search ref={searchRef}/>
          {(citiesWishVisit.length === 0
              ?
              false
              :
              <Button variant="contained" style={{width: 200, marginLeft: 16}} onClick={handleVisit}>
                I want to visit
              </Button>
          )}
            <Button onClick={ handleRandomModal } color="primary" variant="contained" size="large" style={{marginLeft: 16, width: 50}}>
              <NotListedLocationIcon />
            </Button>
        </Box>
        <div
          ref={ref}
          style={style}
          {...rest}
        />
      </Container>
    )
  });

  return (
    <>
      <Head>
        <title>Cities big data</title>
      </Head>
      <Box style={{height: "100vh"}}>
        <AutoSizer>
          {({height, width}) => (
            <List
              className="List"
              height={height}
              itemCount={neededCities?.length}
              itemSize={120}
              width={width}
              itemData={neededCities}
              innerElementType={innerElementType}
            >
              {City}
            </List>
          )}
        </AutoSizer>
      </Box>
      <ModalWindow api={api}/>
      <RandomLocation
        api={api}
        isOpen={randomModal}
        closeModal={() => setRandomModal(false)}
        randomCity={randomCity}
        reloadCity={handleRandomModal}
      />
    </>
  )
}
