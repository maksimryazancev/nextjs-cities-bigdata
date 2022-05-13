import {combineReducers} from "@reduxjs/toolkit";
import cities from "./slices/citiesSlice";

export const rootReducer = combineReducers({
   cities,
})