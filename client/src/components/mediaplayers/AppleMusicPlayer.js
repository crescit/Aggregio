import React , {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'reactstrap';
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
        this.state = { music :window.MusicKit.getInstance(), triggered: false};
    };
    onNextClick = (music) => {
        music.player.skipToNextItem();
    };
    onPrevClick = (music) => {
        music.player.skipToPreviousItem();
    };
    onPlayClick = (music) => {
        music.player.play();
    };
    onPrevClick = (music) => {
        music.player.skipToPreviousItem();
    };
    render(){

        let {music}  = this.state;

        let content;

        const queue = this.props.queue.queue;
        let imgContent;
        //if queues duration field is undefined then the queue item is an album else its a song
        if(queue[0] !== undefined && queue[0].duration_ms !== undefined) {

            music.setQueue({
                song: queue[0].id
            });
            imgContent = <img style={{height: '128px', width: '128px'}} src={queue[0].artwork} alt="coverart" />
            content = <Row><Col>{imgContent}</Col><Col><p>Track: {queue[0].name}</p><p>Artist: {queue[0].artist}</p><p>Album: {queue[0].album}</p></Col></Row>
        }else{

            music.setQueue({
                album: queue[0].id
            });

            imgContent = <img style={{height: '128px', width: '128px'}} src={queue[0].artwork} alt="coverart" />
            content = <Row><Col>{imgContent}</Col><Col><p>Playing Artist: {queue[0].artistName}</p><p>from Album: {queue[0].albumName}</p></Col></Row>

        }
        return(
            <div>
            <hr/>
                <Container>
                {content}
                <Row>
                <button onClick={() => this.onPrevClick(music)}className="btn btn-round btn-light data-apple-music-skip-to-previous-item">
                    <i className="fa fa-step-backward" aria-hidden="true"></i>
                </button>


                <button onClick={() => this.onPauseClick(music)} className="btn btn-round btn-light data-apple-music-pause"><i
                    className="fa fa-pause" aria-hidden="true"></i></button>
                <button onClick={() => this.onPlayClick(music)} className="btn btn-round btn-light data-apple-music-play"><i
                    className="fa fa-play" aria-hidden="true"></i>
                </button>
                <button onClick={() => this.onNextClick(music)}className="btn btn-round btn-light data-apple-music-skip-to-next-item">
                    <i className="fa fa-step-forward" aria-hidden="true"></i>
                </button>
                </Row>
                </Container>
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