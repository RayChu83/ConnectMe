import { ADD_LOGGED_IN_USER, CLEAR_LOGGED_IN_USER } from "../constants/actionNames"

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