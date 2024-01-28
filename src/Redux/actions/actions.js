import { ADD_LOGGED_IN_USER, ADD_LOGGED_IN_USERS_POSTS, CLEAR_LOGGED_IN_USER, CLEAR_LOGGED_IN_USERS_POSTS, LOGGED_IN_FALSE, LOGGED_IN_TRUE, 
    TOGGLE_OFF_SEARCHBAR_FOCUS, TOGGLE_ON_SEARCHBAR_FOCUS, 
    UPDATE_ALL_POSTS } from "../constants/actionNames";

export const setSearchbarFocused = () => {
    return {
        type : TOGGLE_ON_SEARCHBAR_FOCUS
    }
}
export const setSearchbarUnfocused = () => {
    return {
        type : TOGGLE_OFF_SEARCHBAR_FOCUS
    }
}
export const setAllPosts = (payload) => {
    return {
        type : UPDATE_ALL_POSTS,
        payload : payload
    }
}
export const setLoggedInTrue = () => {
    return {
        type : LOGGED_IN_TRUE,
    }
}
export const setLoggedInFalse = () => {
    return {
        type : LOGGED_IN_FALSE
    }
}
export const setLoggedInUser = (payload) => {
    return {
        type : ADD_LOGGED_IN_USER,
        payload : payload
    }
}

export const setLoggedInUserCleared= () => {
    return {
        type : CLEAR_LOGGED_IN_USER
    }
}
export const setLoggedInUsersPosts = (payload) => {
    return {
        type : ADD_LOGGED_IN_USERS_POSTS,
        payload : payload
    }
}

export const setLoggedInUsersPostsCleared= () => {
    return {
        type : CLEAR_LOGGED_IN_USERS_POSTS
    }
}