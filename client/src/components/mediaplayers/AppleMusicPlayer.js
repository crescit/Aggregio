import React , {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



/*
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
 */
class AppleMusicPlayer extends Component {
    constructor(props){
        super(props);
        window.MusicKit.configure({
            developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktIUjg1RkJKSzcifQ.eyJpYXQiOjE1Mzk1MjU0MjgsImV4cCI6MTU1NTA3NzQyOCwiaXNzIjoiSDk0UVFVQkJWOCJ9.qQt6sCOhK6ygnF1MQeESlDHfwIgxZnCTemd1ZV9RIrSbmAHKUop4ANj5fyGpGHHvRF0Ng_rUSDiOKzxqMo_Crw',
            app: {
                name: 'Aggregio',
                build: '1.0.0'
            }
        });
        this.state = { music :window.MusicKit.getInstance()};
    };
    onPlayClick = (music) => {
        music.player.play();
    };
    onPauseClick = (music) => {
        music.player.pause();
    };
    onNextClick = (music) => {
        music.player.skipToNextItem();
    };
    onPrevClick = (music) => {
        music.player.skipToPreviousItem();
    };


    render(){

        let {music}  = this.state;
        const queue = this.props.queue.queue;
        let imgContent;
        //if queues duration field is undefined then the queue item is an album else its a song
        if(queue[0] !== undefined && queue[0].duration_ms !== undefined) {

            music.setQueue({
                song: queue[0].id
            });

            imgContent = <img style={{height: '128px', width: '128px'}} src={queue[0].artwork} alt="coverart" />
        }else{

            music.setQueue({
                album: queue[0].id
            });

            imgContent = <img style={{height: '128px', width: '128px'}} src={queue[0].artwork} alt="coverart" />

        }
        return(
            <div>
            <hr/>
            <h3 style={{color: 'white'}}>Apple Music Player</h3>
                {imgContent}
                <button onClick={() => this.onPrevClick(music)}className="data-apple-music-skip-to-previous-item">Previous</button>
                <button onClick={() => this.onPauseClick(music)}className="data-apple-music-pause">Pause</button>
                <button onClick={() => this.onPlayClick(music)} className="data-apple-music-play">Play</button>
                <button onClick={() => this.onNextClick(music)}className="data-apple-music-skip-to-next-item">Next</button>
            </div>
        )
    }
}
AppleMusicPlayer.propTypes = {
    queue: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    queue: state.queue,
});
export default connect(mapStateToProps)(AppleMusicPlayer);