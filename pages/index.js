import {useEffect, useState} from "react";
import Head from 'next/head'

import {useDispatch, useSelector} from "react-redux";
import { FixedSizeList as List } from 'react-window';
import Papa from 'papaparse';
import {Box, Button, Container, IconButton} from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import ReplayIcon from '@mui/icons-material/Replay';

import {citiesSucceeded} from "../src/store/slices/citiesSlice";
import Search from '../src/components/UI/Search'
import City from "../src/components/City";
import ModalWindow from "../src/components/UI/ModalWindow";

export default function Home() {
  const dispatch = useDispatch()
  const citiesId = useSelector(state => state.cities.listId);
  const cities = useSelector(state => state.cities.collection);
  const citiesWishVisit = useSelector(state => state.cities.wishVisit);
  const searchValue = useSelector(state => state.cities.searchValue);
  const [neededCities, setNeededCities] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv')
      const text = await response.text()
      const {data} = await Papa.parse(text);

      const citiesId = [];
      data.shift();

      const object = {cities: data.map((element, index) => {
          citiesId.push(index + 1);
          return {
            id: (index + 1),
            name: element[0],
            lat: element[1],
            lng: element[2],
            country: element[3],
            population: element[4]
          }
        }),
        citiesId: [...citiesId],
      }

      dispatch(citiesSucceeded(object));
    })();
  }, []); // data dispatch

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

  const handleVisit = () => {
    setNeededCities(citiesWishVisit);
  }

  const reloadNeededCities = () => {
    setNeededCities(citiesId);
  }

  return (
    <>
      <Head>
        <title>Kostya cities</title>
      </Head>
      <Box>
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Search />

            {(citiesWishVisit.length === 0
              ?
                false
              :
              <Button variant="contained" style={{width: 200, marginLeft: 32}} onClick={handleVisit}>
                I want to visit
              </Button>
            )}

            <IconButton color="primary" onClick={reloadNeededCities}>
              <ReplayIcon />
            </IconButton>
          </Box>
          <Box style={{height: "90vh"}}>
            <AutoSizer>

              {({ height, width }) => (
                <List
                  className="List"
                  height={height}
                  itemCount={neededCities?.length}
                  itemSize={120}
                  width={width}
                  itemData={neededCities}
                >
                  {City}
                </List>
              )}

            </AutoSizer>
          </Box>
        </Container>
        <ModalWindow />
      </Box>
    </>
  )
}
