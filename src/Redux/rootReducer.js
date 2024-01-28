import { combineReducers } from "@reduxjs/toolkit";
import searchbarFocusReducer from "./reducers/searchbarReducer";
import postsReducer from "./reducers/postsReducer";
import loggedInReducer from "./reducers/loggedInReducer";
import {loggedInUserReducer, loggedInUsersPostsReducer} from "./reducers/loggedInUserReducer";

const rootReducer = combineReducers({
    searchbarFocus : searchbarFocusReducer,
    allPosts : postsReducer,
    loggedIn : loggedInReducer,
    loggedInUser : loggedInUserReducer,
    loggedInUsersPost : loggedInUsersPostsReducer
})
export default rootReducer