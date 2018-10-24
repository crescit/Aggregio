import axios from 'axios';
import {GET_ALBUMS, GET_ERRORS, GET_PLAYLISTS, GET_TRACKS, LOADING_ALBUMS, LOADING_PLAYLISTS, LOADING_TRACKS} from "../actions/types";

//get songs
export const getSongs = () => dispatch => {
    dispatch(setTracksLoading());
    axios.get('/api/songs/library').then(res => {
        dispatch({
            type: GET_TRACKS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    });
};
//get albums
export const getAlbums = () => dispatch => {
    dispatch(setAlbumsLoading());
    axios.get('/api/songs/albums').then(res => {
        dispatch({
            type: GET_ALBUMS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    });

};
//get playlists
export const getPlaylists = () => dispatch => {
    dispatch(setPlaylistsLoading());
    axios.get('/api/songs/playlist').then(res => {
        dispatch({
            type: GET_PLAYLISTS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    });
};
export const setTracksLoading = () => {
    return {
        type: LOADING_TRACKS
    }
};
export const setAlbumsLoading = () => {
    return {
        type: LOADING_ALBUMS
    }
};
export const setPlaylistsLoading = () => {
    return {
        type: LOADING_PLAYLISTS
    }
};