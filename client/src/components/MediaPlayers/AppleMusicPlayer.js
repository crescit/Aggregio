import React , {Component} from 'react';


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
        music.setQueue({
            song: '1107054256'
        });
        return(
            <div>
            <hr/>
            <h3 style={{color: 'white'}}>Apple Music Player</h3>
                <button onClick={() => this.onPrevClick(music)}className="data-apple-music-skip-to-previous-item">Previous</button>
                <button onClick={() => this.onPauseClick(music)}className="data-apple-music-pause">Pause</button>
                <button onClick={() => this.onPlayClick(music)} className="data-apple-music-play">Play</button>
                <button onClick={() => this.onNextClick(music)}className="data-apple-music-skip-to-next-item">Next</button>
            </div>
        )
    }
}

export default AppleMusicPlayer;