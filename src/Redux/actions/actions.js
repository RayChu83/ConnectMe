import { TOGGLE_OFF_SEARCHBAR_FOCUS, TOGGLE_ON_SEARCHBAR_FOCUS } from "../constants/actionNames";

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