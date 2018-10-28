import {ADD_SONG_TO_QUEUE, CLEAR_QUEUE} from "../actions/types";

const initialState = {
    queue: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_SONG_TO_QUEUE:
            return {
                ...state,
                queue: [action.payload, ...state.queue]
            };
        case CLEAR_QUEUE:
            return {
                ...state,
                queue:[]
            };
        default:
            return state;
    }
}
