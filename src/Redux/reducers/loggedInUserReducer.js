import { ADD_LOGGED_IN_USER, ADD_LOGGED_IN_USERS_POSTS, CLEAR_LOGGED_IN_USER, CLEAR_LOGGED_IN_USERS_POSTS } from "../constants/actionNames"

export const loggedInUserReducer = (state = null, action) => {
    switch (action.type) {
        case ADD_LOGGED_IN_USER:
            return action.payload
        case CLEAR_LOGGED_IN_USER:
            return null
        default:
            return state
    }
}
export const loggedInUsersPostsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_LOGGED_IN_USERS_POSTS:
            return action.payload
        case CLEAR_LOGGED_IN_USERS_POSTS:
            return null
        default:
            return state
    }
}