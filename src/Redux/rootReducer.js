import { combineReducers } from "@reduxjs/toolkit";
import searchbarFocusReducer from "./reducers/searchbarReducer";
import postsReducer from "./reducers/postsReducer";
import loggedInReducer from "./reducers/loggedInReducer";
import loggedInUidReducer from "./reducers/loggedInUidReducer";

const rootReducer = combineReducers({
    searchbarFocus : searchbarFocusReducer,
    allPosts : postsReducer,
    loggedIn : loggedInReducer,
    loggedInId : loggedInUidReducer,
})
export default rootReducer