import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AppleMusicPlayer from './AppleMusicPlayer';
import SpotifyPlayer from './SpotifyPlayer';
import axios from 'axios';

class GeneralMusicPlayer extends Component{

    spotifyCallBack = (loaded) => {
        if(loaded == true){
            this.setQueue();
        }
    };
    setQueue() {

        let queue = this.props.queue.queue;
        axios.put('https://api.spotify.com/v1/me/player/play',
            {
                "context_uri" : queue[0].uri},{
                headers: {
                    Authorization: 'Bearer ' + this.props.spotify.accessToken
                }
            })
            .then().catch(err => console.log(err));

    }
    render(){
        let queue = this.props.queue.queue;
        let playerContent;
        let visibleApple;
        let visibleSpotify;

        if(queue.length === 0){
            playerContent = <h5>No items in the queue</h5>;
            visibleApple = {display: 'none'};
            visibleSpotify = {display: 'none'};
        }else{
            //if current album or song is apple display apple player
            if(queue[0].apple){
                visibleSpotify = {display: 'none'};
            }else{
                visibleApple = {display: 'none'};

            }
        }
        return(<div>{playerContent} <div style={visibleApple}>< AppleMusicPlayer/></div><div style={visibleSpotify}>< SpotifyPlayer callBack={this.spotifyCallBack}/></div></div>)
    }

}
GeneralMusicPlayer.propTypes = {
    queue: PropTypes.object.isRequired,
    spotify: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    queue: state.queue,
    spotify: state.spotify
});
export default connect(mapStateToProps)(GeneralMusicPlayer);

