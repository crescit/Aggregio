/*
   searchCarly(){
       let music = window.MusicKit.getInstance();
       let results = music.api.search('james brown', { limit: 2, types: 'songs' });

       console.log(results);
       axios.get(`https://api.spotify.com/v1/search?q=${this.state.term}&type=${this.state.filter}`, {headers: {
                   Authorization: 'Bearer ' + this.state.token
               }}
           )
           .then(res => console.log(res.data)).catch(err => console.log(err));
   }
*/
//search artist
//search track
//search albums
import axios from 'axios';
window.MusicKit.configure({
    developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktIUjg1RkJKSzcifQ.eyJpYXQiOjE1Mzk1MjU0MjgsImV4cCI6MTU1NTA3NzQyOCwiaXNzIjoiSDk0UVFVQkJWOCJ9.qQt6sCOhK6ygnF1MQeESlDHfwIgxZnCTemd1ZV9RIrSbmAHKUop4ANj5fyGpGHHvRF0Ng_rUSDiOKzxqMo_Crw',
    app: {
        name: 'Aggregio',
        build: '1.0.0'
    }
});
export const searchArtist  = (term, token) => {
    let artists = {
        appleArtist: {},
        spotifyArtist: {}
    };
    let music = window.MusicKit.getInstance();
    let results = music.api.search(term, { limit: 2, types: 'artists' });
    axios.get(`https://api.spotify.com/v1/search?q=${term}&type=artist`, {headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
        }}
    )
        .then(res => {artists.spotifyArtist = res.data}).catch(err => console.log(err));
    results.then(function(results){
        artists.appleArtist = results;
    });
    return artists;
};
export const searchTrack  = (term, token) => {
    let tracks = {
        appleTracks: {},
        spotifyTracks: {}
    };
    let music = window.MusicKit.getInstance();
    let results = music.api.search(term, { limit: 2, types: 'songs' });
    axios.get(`https://api.spotify.com/v1/search?q=${term}&type=track`, {headers: {
            Authorization: 'Bearer ' + token
        }}
    )
        .then(res => {tracks.spotifyTracks = res.data}).catch(err => console.log(err));
    results.then(function(results){
       tracks.appleTracks = results;
    });
    return tracks;

};
export const searchAlbum  = (term, token) => {
    let albums = {
        appleAlbums: {},
        spotifyAlbums: {}
    };
    let music = window.MusicKit.getInstance();
    let results = music.api.search(term, { limit: 2, types: 'albums' });
    axios.get(`https://api.spotify.com/v1/search?q=${term}&type=album`, {headers: {
            Authorization: 'Bearer ' + token
        }}
    )
        .then(res => {albums.spotifyAlbums = res.data}).catch(err => console.log(err));
    results.then(function(results){
        albums.appleAlbums = results;
    });
    return albums;
};