import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addSong} from "../../actions/libraryActions";
import {connect} from 'react-redux';

class TrackItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            artist: this.props.artist,
            album: this.props.album,
            artwork: this.props.artwork,
            id: this.props.id,
            duration_ms: this.props.duration,
            apple: false || this.props.apple,
            uri: "apple" || this.props.uri
        };
        String.prototype.toProperCase = function () {
            return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };
    }
    addSong = () => {
        const songData = {
            name: this.state.name,
            artist: this.state.artist,
            album: this.state.album,
            id: this.state.id,
            artwork: this.state.artwork,
            duration_ms: this.state.duration_ms,
            apple: this.state.apple,
            uri: this.state.uri
        };
        this.props.addSong(songData);
        this.setState({
            name: null,
            artist: null,
            album: null,
            artwork: null,
            id: null,
            duration_ms: null,
            apple: null,
            uri: null
        })
    };
    render(){
        let url = this.props.artwork;
        var w = url.indexOf("{w}");
        var h = url.indexOf("{h}");
        let first = url.slice(0, w) + '128x';
        let second = '128' + url.slice(h + 3, url.length);
        url = first + second;
        let imgContent;
        if(this.state.apple){
            imgContent = <img alt="cover art" style={{height: 128, width: 128}}src={url} />;

        }else{
            imgContent = <img alt="cover art" style={{height: 128, width: 128}}src={this.state.artwork} />

        }
        return(
            <div >
                {this.state.artist === null ? null :
                    <button className="btn btn-dark">
                        <div className="container1">{imgContent}
                            <div className="overlay">
                                <div className="text1"><i className="fa fa-play"></i></div>
                            </div>
                        </div>
                    </button>
                }
                {this.state.artist === null ? null : <button onClick={() => this.addSong()} style={{float: 'center'}}className="btn btn-info">+</button>}

                <h6>{this.state.name}</h6>
                <h6>{this.state.artist === null ? null : this.state.artist.toProperCase()}</h6>
            </div>);
    }
}
TrackItem.propTypes = {
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    artwork: PropTypes.string.isRequired,
    addSong: PropTypes.func.isRequired,
    apple: PropTypes.bool.isRequired
};

export default connect(null, {addSong})(TrackItem);