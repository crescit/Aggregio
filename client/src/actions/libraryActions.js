import axios from 'axios';
import {GET_ALBUMS, GET_ERRORS, CLEAR_ERRORS, GET_PLAYLISTS, GET_TRACKS, LOADING_ALBUMS, LOADING_PLAYLISTS, LOADING_TRACKS, ADD_ALBUM, ADD_PLAYLIST, ADD_TRACK, REMOVE_ALBUM, REMOVE_TRACK, REMOVE_FROM_PLAYLIST, ADD_TO_PLAYLIST, DELETE_PLAYLIST} from "../actions/types";

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
            payload: err.response.data
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
            payload: err.response.data
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
            payload: err.response.data
        })
    });
};

//add to song library
export const addSong = (songData) => dispatch => {
    dispatch({type: CLEAR_ERRORS});
    axios.post('/api/songs/library', songData).then(res => dispatch({
        type: ADD_TRACK,
        payload: res.response.data
    })).catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

export const addAlbum = (albumData) => dispatch => {
    dispatch({type: CLEAR_ERRORS});
    axios.post('api/songs/albums', albumData)
        .then(res => dispatch({
            type: ADD_ALBUM,
            payload: res.response.data
        }))
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};
export const removeAlbum = (id) => dispatch => {
    axios.delete(`api/songs/albums/${id}`).then(res => dispatch({
        type: REMOVE_ALBUM,
        payload: res.response.data
    })).catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};
export const removeTrack = (id) => dispatch => {
    axios.delete(`api/songs/library/${id}`).then(res => dispatch({
        type: REMOVE_TRACK,
        payload: res.response.data
    })).catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
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