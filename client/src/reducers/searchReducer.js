import {SPOTIFY_SEARCH_ALBUM, SPOTIFY_SEARCH_ARTIST, SPOTIFY_SEARCH_TRACK, APPLE_SEARCH_ALBUM, APPLE_SEARCH_ARTIST, APPLE_SEARCH_TRACK, SPOTIFY_TRACK_LOADING, SPOTIFY_ALBUM_LOADING, SPOTIFY_ARTIST_LOADING, APPLE_TRACK_LOADING,APPLE_ALBUM_LOADING,APPLE_ARTIST_LOADING} from "../actions/types";

const initialState = {
    appleTracks: {},
    appleArtists: {},
    appleAlbums: {},
    spotifyTracks: {},
    spotifyArtists: {},
    spotifyAlbums: {},
    loadingAppleTrack: false,
    loadingAppleArtist: false,
    loadingAppleAlbum: false,
    loadingSpotifyTrack: false,
    loadingSpotifyArtist: false,
    loadingSpotifyAlbum: false
};
export default function(state = initialState, action) {
    switch(action.type){
        case SPOTIFY_TRACK_LOADING:
            return {
                ...state,
                loadingSpotifyTrack: true
            };
        case SPOTIFY_ARTIST_LOADING:
            return {
                ...state,
                loadingSpotifyArtist: true
            };
        case SPOTIFY_ALBUM_LOADING:
            return {
                ...state,
                loadingSpotifyAlbum: true
            };
        case APPLE_TRACK_LOADING:
            return {
                ...state,
                loadingAppleTrack: true
            };
        case APPLE_ARTIST_LOADING:
            return {
                ...state,
                loadingAppleArtist: true
            };
        case APPLE_ALBUM_LOADING:
            return {
                ...state,
                loadingAppleAlbum: true
            };
        case SPOTIFY_SEARCH_TRACK:
            return {
                ...state,
                spotifyTracks: action.payload,
                loadingSpotifyTrack: false
            };
        case SPOTIFY_SEARCH_ARTIST:
            return {
                ...state,
                spotifyArtists: action.payload,
                loadingSpotifyArtist: false
            };
        case SPOTIFY_SEARCH_ALBUM:
            return {
                ...state,
                spotifyAlbums: action.payload,
                loadingSpotifyAlbum: false
            };
        case APPLE_SEARCH_TRACK:
            return {
                ...state,
                appleTracks: action.payload,
                loadingAppleTrack: false
            };
        case  APPLE_SEARCH_ARTIST:
            return {
                ...state,
                appleArtists: action.payload,
                loadingAppleArtist: false
            };
        case  APPLE_SEARCH_ALBUM:
            return {
                ...state,
                appleAlbums: action.payload,
                loadingAppleAlbum: false
            };
        default:
            return state;
    }
}