import { TOGGLE_OFF_SEARCHBAR_FOCUS, TOGGLE_ON_SEARCHBAR_FOCUS } from "../constants/actionNames";

export const searchbarFocusReducer = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_ON_SEARCHBAR_FOCUS:
            return true
        case TOGGLE_OFF_SEARCHBAR_FOCUS:
            return false
        default:
            return state
    }
}