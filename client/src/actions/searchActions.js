import {SPOTIFY_SEARCH_ALBUM, SPOTIFY_SEARCH_ARTIST, SPOTIFY_SEARCH_TRACK,
    APPLE_SEARCH_ALBUM, APPLE_SEARCH_ARTIST, APPLE_SEARCH_TRACK,
    APPLE_TRACK_LOADING, APPLE_ARTIST_LOADING, APPLE_ALBUM_LOADING,
    SPOTIFY_ARTIST_LOADING, SPOTIFY_ALBUM_LOADING, SPOTIFY_TRACK_LOADING} from  "../actions/types";

import axios from 'axios';
window.MusicKit.configure({
    developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktIUjg1RkJKSzcifQ.eyJpYXQiOjE1Mzk1MjU0MjgsImV4cCI6MTU1NTA3NzQyOCwiaXNzIjoiSDk0UVFVQkJWOCJ9.qQt6sCOhK6ygnF1MQeESlDHfwIgxZnCTemd1ZV9RIrSbmAHKUop4ANj5fyGpGHHvRF0Ng_rUSDiOKzxqMo_Crw',
    app: {
        name: 'Aggregio',
        build: '1.0.0'
    }
});
export const searchArtist  = (term, token) => dispatch => {
    dispatch(setSpotifyArtistLoading());

    let music = window.MusicKit.getInstance();
    let results = music.api.search(term, { limit: 8, types: 'artists' });
    axios.get(`https://api.spotify.com/v1/search?q=${term}&type=artist&limit=8`, {headers: {
            Authorization: 'Bearer ' + token,
        }}
    )
        .then(res => dispatch({ type: SPOTIFY_SEARCH_ARTIST, payload: res.data})).catch(err => console.log(err));
    dispatch(setAppleArtistLoading());
    results.then(function(results){
        dispatch({
            type: APPLE_SEARCH_ARTIST,
            payload: results
        })
    });
};
export const searchTrack  = (term, token) => dispatch =>  {
    dispatch(setSpotifyTrackLoading());
    let music = window.MusicKit.getInstance();
    let results = music.api.search(term, { limit: 8, types: 'songs' });
    axios.get(`https://api.spotify.com/v1/search?q=${term}&type=track&limit=8`, {headers: {
            Authorization: 'Bearer ' + token
        }}
    )
        .then(res => dispatch({
            type: SPOTIFY_SEARCH_TRACK,
            payload: res.data
        })).catch(err => console.log(err));
    dispatch(setAppleTrackLoading());
    results.then(function(results){
       dispatch({
           type: APPLE_SEARCH_TRACK,
           payload: results
       })
    });
};
export const searchAlbum  = (term, token) => dispatch =>  {
    dispatch(setSpotifyAlbumLoading());
    let music = window.MusicKit.getInstance();
    let results = music.api.search(term, { limit: 8, types: 'albums' });
    axios.get(`https://api.spotify.com/v1/search?q=${term}&type=album&limit=8`, {headers: {
            Authorization: 'Bearer ' + token
        }}
    )
        .then(res => dispatch({
            type: SPOTIFY_SEARCH_ALBUM,
            payload: res.data
        })).catch(err => console.log(err));
    dispatch(setAppleAlbumLoading());
    results.then(function(results){
        dispatch({
            type: APPLE_SEARCH_ALBUM,
            payload: results
        })
    });
};
export const nextTracks  = (url, token) => dispatch => {
    dispatch(setSpotifyTrackLoading());
    axios.get(url, {headers: {
            Authorization: 'Bearer ' + token
        }}
    )
        .then(res => dispatch({
            type: SPOTIFY_SEARCH_TRACK,
            payload: res.data
        })).catch(err => console.log(err));
    dispatch({
        type: APPLE_SEARCH_TRACK,
        payload: null
    })

};
export const nextAlbums = (url, token) => dispatch => {
    dispatch(setSpotifyAlbumLoading());
    axios.get(url, {headers: {
            Authorization: 'Bearer ' + token
        }}
    )
        .then(res => dispatch({
            type: SPOTIFY_SEARCH_ALBUM,
            payload: res.data
        })).catch(err => console.log(err));
    dispatch({
        type: APPLE_SEARCH_ALBUM,
        payload: null
    })
};
export const setAppleArtistLoading = () => {
    return {
        type: APPLE_ARTIST_LOADING
    }
};
export const setAppleAlbumLoading = () => {
    return {
        type: APPLE_ALBUM_LOADING
    }
};
export const setAppleTrackLoading = () => {
    return {
        type: APPLE_TRACK_LOADING
    }
};
export const setSpotifyArtistLoading = () => {
    return {
        type: SPOTIFY_ARTIST_LOADING
    }
};
export const setSpotifyAlbumLoading = () => {
    return {
        type: SPOTIFY_ALBUM_LOADING
    }
};
export const setSpotifyTrackLoading = () => {
    return {
        type: SPOTIFY_TRACK_LOADING
    }
};