import { combineReducers } from "@reduxjs/toolkit";
import { searchbarFocusReducer } from "./reducers/searchbarReducer";
import { postsReducer } from "./reducers/postsReducer";
import loggedInReducer from "./reducers/loggedInReducer";

const rootReducer = combineReducers({
    searchbarFocus : searchbarFocusReducer,
    allPosts : postsReducer,
    loggedIn : loggedInReducer
})
export default rootReducer