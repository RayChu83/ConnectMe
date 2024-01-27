import { ADD_LOGGED_IN_UID, CLEAR_LOGGED_IN_UID } from "../constants/actionNames"

const loggedInUidReducer = (state = "", action) => {
    switch (action.type) {
        case ADD_LOGGED_IN_UID:
            return action.payload
        case CLEAR_LOGGED_IN_UID:
            return null
        default:
            return state
    }
}
export default loggedInUidReducer