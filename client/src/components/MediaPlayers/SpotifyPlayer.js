import React , {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as SpotifyWebApi from 'spotify-web-api-js';

class SpotifyPlayer extends Component {
    waitForSpotify() {
        return new Promise(resolve => {
            if ('Spotify' in window) {
                resolve();
            } else {
                window.onSpotifyWebPlaybackSDKReady = () => { resolve(); };
            }
        });
    }
    componentDidMount(){
        this.waitForSpotify();

    }
    render(){

        return(
            <div>
                <h3>Spotify Player Goes Here</h3>
                <hr/>
            </div>
        )
    }
}
SpotifyPlayer.propTypes = {
    errors: PropTypes.object.isRequired,
    spotify: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    errors: state.errors,
    spotify: state.spotify
});
export default connect(mapStateToProps)(SpotifyPlayer);