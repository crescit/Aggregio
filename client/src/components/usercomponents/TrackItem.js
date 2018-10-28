import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {removeTrack, addToPlaylist} from "../../actions/libraryActions";
import {connect} from 'react-redux';
import {addSongToQueue, clearQueue} from "../../actions/queueActions";

class TrackItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id: this.props._id,
            name: this.props.name,
            artist: this.props.artist,
            album: this.props.album,
            artwork: this.props.artwork,
            id: this.props.id,
            duration_ms: this.props.duration,
            apple: false || this.props.apple,
            uri: this.props.uri || "apple"
        };
        String.prototype.toProperCase = function () {
            return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };
    }
    remove = () => {
        this.props.removeTrack(this.state._id);
        window.location.reload(true);
    };
    addTo = (id) => {
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
        this.props.addToPlaylist(songData, id);
        window.location.reload(true);
    };
    play = () => {
        this.props.clearQueue();
        const songData = {
            name: this.state.name,
            artist: this.state.artist,
            album: this.state.album,
            id: this.state.id,
            artwork: this.props.artwork,
            duration_ms: this.state.duration_ms,
            apple: this.state.apple,
            uri: this.state.uri
        };
        this.props.addSongToQueue(songData);
    };
    render(){
        let imgContent;
        if(this.state.apple){
            imgContent = <img alt="cover art" style={{height: 128, width: 128}}src={this.props.artwork} />;

        }else{
            imgContent = <img alt="cover art" style={{height: 128, width: 128}}src={this.props.artwork} />
        }
        let playlistContent;
        if(this.props.library.playlists.length === 0){
            playlistContent = <li>No Playlists to add song to</li>
        }else{
            playlistContent = this.props.library.playlists.map(item => (
                <li key={item._id} className="btn" onClick={() => this.addTo(item._id)}>{item.playlistName}</li>
            ))
        }

        return(
            <div >
                <button  onClick={() => this.play()} className="btn btn-dark">
                    <div className="container1">{imgContent}<div className="overlay">
                        <div className="text1"><i className="fa fa-play"></i></div>
                    </div>
                    </div>
                </button>
                <button onClick={() => this.remove()} style={{position:'absolute', top:0, left:0}}className="btn badge btn-danger">-</button>
                <div  style={{position:'absolute', top:20, left:0}} className="dropdown">
                    <button  className="btn btn-primary badge" type="button" data-toggle="dropdown">
                        +</button>
                    <ul  className="noCaret dropdown-menu">
                        <li className="dropdown-header">Add track to playlist:</li>
                        {playlistContent}
                    </ul> </div>
                <h6>{this.props.name}</h6>
                <h6>{this.props.artist.toProperCase()}</h6>
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
    removeTrack: PropTypes.func.isRequired,
    apple: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    library: PropTypes.object.isRequired,
    addToPlaylist: PropTypes.func.isRequired,
    addSongToQueue: PropTypes.func.isRequired,
    clearQueue: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    library: state.library
});

export default connect(mapStateToProps, {removeTrack, addToPlaylist, addSongToQueue, clearQueue})(TrackItem);