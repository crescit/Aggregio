import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
class SpotifyPlayer extends Component {
    constructor(props) {
        super(props);
        // set the initial state
        this.state = {
            token: this.props.spotify.accessToken,
            deviceId: "",
            loggedIn: false,
            error: "",
            trackName: "Track Name",
            artistName: "Artist Name",
            albumName: "Album Name",
            albumArtWork: "https://placeimg.com/640/480/any",
            playing: false,
            position: 0,
            duration: 1,
        };
        // this will later be set by setInterval
        this.playerCheckInterval = null;

    }

    // when we click the "go" button
    componentDidMount(){
        this.handleLogin();
    }
    playCarly(){
        axios.put('https://api.spotify.com/v1/me/player/play',
            {
                "context_uri" : 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr'},{
                headers: {
                    Authorization: 'Bearer ' + this.state.token
                }
            })
            .then().catch(err => console.log(err));
    }
    handleLogin() {
        if (this.state.token !== "") {
            // change the loggedIn variable, then start checking for the window.Spotify variable
            this.setState({ loggedIn: true });
            this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
        }
    }

    // when we receive a new update from the player
    onStateChanged(state) {
        // only update if we got a real state
        if (state !== null) {
            const {
                current_track: currentTrack,
                position,
                duration,
            } = state.track_window;
            const trackName = currentTrack.name;
            const albumName = currentTrack.album.name;
            const albumArtWork = currentTrack.album.images[2].url;
            const artistName = currentTrack.artists
                .map(artist => artist.name)
                .join(", ");
            const playing = !state.paused;
            this.setState({
                position,
                duration,
                trackName,
                albumName,
                albumArtWork,
                artistName,
                playing
            });
        } else {
            // state was null, user might have swapped to another device
            this.setState({ error: "You most likely have swapped to another device." });
        }
    }

    createEventHandlers() {
        // problem setting up the player
        this.player.on('initialization_error', e => { console.error(e); });
        // problem authenticating the user.
        // either the token was invalid in the first place,
        // or it expired (it lasts one hour)
        this.player.on('authentication_error', e => {
            console.error(e);
            this.setState({ loggedIn: false });
        });
        // currently only premium accounts can use the API
        this.player.on('account_error', e => { console.error(e); });
        // loading/playing the track failed for some reason
        this.player.on('playback_error', e => { console.error(e); });

        // Playback status updates
        this.player.on('player_state_changed', state => this.onStateChanged(state));

        // Ready
        this.player.on('ready', async data => {
            let { device_id } = data;
            console.log("Let the music play on!");
            // set the deviceId variable, then let's try
            // to swap music playback to *our* player!
            await this.setState({ deviceId: device_id });
            this.transferPlaybackHere();
        });
    }

    checkForPlayer() {
        const { token } = this.state;

        // if the Spotify SDK has loaded
        if (window.Spotify !== null) {
            // cancel the interval
            clearInterval(this.playerCheckInterval);
            // create a new player
            this.player = new window.Spotify.Player({
                name: "Aggregio",
                getOAuthToken: cb => { cb(token); },
            });
            // set up the player's event handlers
            this.createEventHandlers();

            // finally, connect!
            this.player.connect();
        }
    }

    onPrevClick() {
        this.player.previousTrack();
    }

    onPlayClick() {
        this.player.togglePlay();
    }

    onNextClick() {
        this.player.nextTrack();
    }

    transferPlaybackHere() {
        const { deviceId, token } = this.state;
        // https://beta.developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
        fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "device_ids": [ deviceId ],
                // true: start playing music if it was paused on the other device
                // false: paused if paused on other device, start playing music otherwise
                "play": true,
            }),
        });
    }

    render() {
        const {
            loggedIn,
            trackName,
            artistName,
            albumName,
            albumArtWork,
            error,
            playing
        } = this.state;


        return (
            <div className="App">
                <div className="App-header">
                    <h3 style={{color: 'white'}}>Spotify Player</h3>
                </div>

                {error && <p>Error: {error}</p>}

                {loggedIn ?
                    (<div>
                        <img alt="track cover art" style={{height : "256px", width : "256px" }}src={albumArtWork}/>
                        <p style={{color: 'white'}}>Artist: {artistName}</p>
                        <p style={{color: 'white'}}>Track: {trackName}</p>
                        <p style={{color: 'white'}}>Album: {albumName}</p>
                        <p>
                            <button onClick={() => this.onPrevClick()}>Previous</button>
                            <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
                            <button onClick={() => this.onNextClick()}>Next</button>
                        </p>
                    </div>)
                    :
                    (<div>
                        <p style={{color: 'white'}} className="App-intro">
                            Please authenticate Spotify in settings.
                        </p>
                    </div>)
                }
            </div>
        );
    }
}
SpotifyPlayer.propTpes = {
    spotify: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    spotify: state.spotify,
    errors: state.errors
});

export default connect(mapStateToProps)(SpotifyPlayer);
