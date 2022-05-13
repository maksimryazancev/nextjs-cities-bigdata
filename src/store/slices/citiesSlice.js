import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collection: [],
    listId: [],
    wishVisit: [],
    searchValue: "",
    modalWindowId: null,
    loading: false,
    error: null,
};

const citiesSlice = createSlice({
    name: `cities`,
    initialState,
    reducers: {
        initTest: () => {},
        citiesSucceeded: (state, action) => {
            state.loading = false;
            state.collection = action.payload.cities;
            state.listId = action.payload.citiesId;
        },
        wantToVisit: (state, action) => {
            state.wishVisit.push(action.payload.cityId);
        },
        dontWantToVisit: (state, action) => {
            state.wishVisit = state.wishVisit.filter(element => element !== action.payload.cityId)
        },
        search: (state, action) => {
            state.searchValue = action.payload.searchValue;
        },
        openModalWindow: (state, action) => {
            state.modalWindowId = action.payload.city;
        },
        closeModalWindow: (state) => {
            state.modalWindowId = null;
        },
    }
});

export const { initTest, citiesSucceeded, wantToVisit, dontWantToVisit, search, openModalWindow, closeModalWindow } = citiesSlice.actions;
export default citiesSlice.reducer;