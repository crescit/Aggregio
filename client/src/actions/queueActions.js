import {ADD_SONG_TO_QUEUE, CLEAR_QUEUE} from "./types";
import axios from 'axios';
export const addSongToQueue = (payload) => dispatch => {

a
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