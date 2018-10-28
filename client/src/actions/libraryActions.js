import axios from 'axios';
import {GET_ALBUMS, GET_ERRORS, CLEAR_ERRORS, GET_PLAYLISTS, GET_TRACKS, LOADING_ALBUMS, LOADING_PLAYLISTS, LOADING_TRACKS, ADD_TRACK, REMOVE_ALBUM, REMOVE_TRACK, REMOVE_FROM_PLAYLIST, ADD_TO_PLAYLIST, DELETE_PLAYLIST, CREATE_PLAYLIST, ADD_ALBUM} from "../actions/types";

//get songs
export const getSongs = () => dispatch => {
    dispatch({type: CLEAR_ERRORS});

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
    dispatch({type: CLEAR_ERRORS});

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
    })).catch(err => dispatch({type: GET_ERRORS, payload: err}));
};
//add album to album section
export const addAlbum = (albumData) => dispatch => {
    dispatch({type: CLEAR_ERRORS});
    axios.post('api/songs/albums', albumData)
        .then(res => dispatch({
            type: ADD_ALBUM,
            payload: res.response.data
        }))
        .catch(err => dispatch({type: GET_ERRORS, payload: err}));
};
//remove album from album section
export const removeAlbum = (id) => dispatch => {
    dispatch({type: CLEAR_ERRORS});

    axios.delete(`api/songs/albums/${id}`).then(res => dispatch({
        type: REMOVE_ALBUM,
        payload: res.response.data
    })).catch(err => dispatch({type: GET_ERRORS, payload: err}));
};
//remove track from library
export const removeTrack = (id) => dispatch => {
    dispatch({type: CLEAR_ERRORS});

    axios.delete(`api/songs/library/${id}`).then(res => dispatch({
        type: REMOVE_TRACK,
        payload: res.response.data
    })).catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};
//add a track to a specific playlist
export const addToPlaylist = (songData, id) => dispatch => {
    dispatch({type: CLEAR_ERRORS});

    axios.post(`api/songs/addToPlaylist/${id}`, songData).then(res => {
        dispatch({
            type: ADD_TO_PLAYLIST,
            payload: res.response.data
        })
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    });
};
//create a playlsit
export const createPlaylist = (data) => dispatch => {
    dispatch({type: CLEAR_ERRORS});
    axios.post('api/songs/playlist', data).then(res => {
        dispatch({
            type: CREATE_PLAYLIST,
            payload: res.response.data
        })
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    });
};
//delete a playlist with a specific id
export const deletePlaylist = (id) => dispatch => {
    dispatch({type: CLEAR_ERRORS});
    axios.delete(`api/songs/playlist/${id}`).then(res => {
        dispatch({
            type: DELETE_PLAYLIST,
            payload: res.response.data
        })
    }).catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })});
};
//remove a specific track from a playlist
export const removeTrackFromPlaylist = (playlistId, id) => dispatch => {
    dispatch({type: CLEAR_ERRORS});
    axios.delete(`api/songs/removeFromPlaylist/${playlistId}/${id}`).then(res => {
        dispatch({
            type: REMOVE_FROM_PLAYLIST,
            payload: res.response.data
        })
    }).catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })})

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