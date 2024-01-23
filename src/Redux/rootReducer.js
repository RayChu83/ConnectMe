import { combineReducers } from "@reduxjs/toolkit";
import { searchbarFocusReducer } from "./reducers/searchbarReducer";
import { postsReducer } from "./reducers/postsReducer";

const rootReducer = combineReducers({
    searchbarFocus : searchbarFocusReducer,
    allPosts : postsReducer
})
export default rootReducer