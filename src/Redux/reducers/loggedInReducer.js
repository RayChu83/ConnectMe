import { LOGGED_IN_FALSE, LOGGED_IN_TRUE } from "../constants/actionNames";

const loggedInReducer = (state = "unset", action) => {
    switch(action.type) {
        case LOGGED_IN_TRUE:
            return true
        case LOGGED_IN_FALSE:
            return false
        default:
            return state
    }
}
export default loggedInReducer