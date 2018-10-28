import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AppleMusicPlayer from './AppleMusicPlayer';
import SpotifyPlayer from './SpotifyPlayer';

class GeneralMusicPlayer extends Component{

    render(){
        let queue = this.props.queue.queue;
        let playerContent;
        if(queue.length === 0){
            playerContent = <h5>No items in the queue</h5>
        }else{
            //if current album or song is apple display apple player
            if(queue[0].apple){
                playerContent = <AppleMusicPlayer/>
            }else{
                playerContent = <SpotifyPlayer/>
            }
        }
        return(<div>{playerContent}</div>)
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

