import {GET_ALBUMS, GET_PLAYLISTS, GET_TRACKS, LOADING_ALBUMS, LOADING_PLAYLISTS, LOADING_TRACKS} from "../actions/types";

const initialState = {
    albums: [],
    songs: [],
    playlists: [],
    loadingAlbums: false,
    loadingSongs: false,
    loadingPlaylist: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_ALBUMS:
            return {
                ...state,
                loadingAlbums: true
            };
        case LOADING_TRACKS:
            return {
                ...state,
                loadingSongs: true
            };
        case LOADING_PLAYLISTS:
            return {
                ...state,
                loadingPlaylist: true
            };
        case GET_ALBUMS:
            return {
                ...state,
                albums:  action.payload,
                loadingAlbums: false
            };
        case GET_TRACKS:
            return{
                ...state,
                songs: action.payload,
                loadingSongs: false
            };
        case GET_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload,
                loadingPlaylist: false
            };
        default:
            return state;
    }
}