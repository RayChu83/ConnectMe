import { UPDATE_ALL_POSTS } from "../constants/actionNames";

const postsReducer = (state = null, action) => {
    switch(action.type) {
        case UPDATE_ALL_POSTS:
            return [
                // [{}, {}, {},]
                ...action.payload
            ]
        default:
            return state
    }
}
export default postsReducer