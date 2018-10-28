import {ADD_SONG_TO_QUEUE, CLEAR_QUEUE} from "./types";

export const addSongToQueue = (payload) => dispatch => {
    dispatch({
        type: ADD_SONG_TO_QUEUE,
        payload: payload
    })
};
export const clearQueue = () => dispatch => {
    dispatch({
        type: CLEAR_QUEUE,
        payload: null
    })
};