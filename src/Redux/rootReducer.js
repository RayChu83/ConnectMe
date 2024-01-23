import { combineReducers } from "@reduxjs/toolkit";
import { searchbarFocusReducer } from "./reducers/searchbarReducers";

const rootReducer = combineReducers({
    searchbarFocus : searchbarFocusReducer
})
export default rootReducer