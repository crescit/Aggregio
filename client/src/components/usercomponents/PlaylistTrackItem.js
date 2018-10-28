import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {removeTrackFromPlaylist } from "../../actions/libraryActions";
import {connect} from 'react-redux';

class PlaylistTrackItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            _playlistid: this.props._playlistid,
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
        this.props.removeTrackFromPlaylist(this.state._playlistid, this.state._id)
        window.location.reload(true);
    };

    render(){
        let imgContent;
        if(this.state.apple){
            imgContent = <img alt="cover art" style={{height: 128, width: 128}}src={this.props.artwork} />;

        }else{
            imgContent = <img alt="cover art" style={{height: 128, width: 128}}src={this.props.artwork} />
        }

        return(
            <div >
                <button  className="btn btn-dark">
                    <div className="container1">{imgContent}<div className="overlay">
                        <div className="text1"><i className="fa fa-play"></i></div>
                    </div>
                    </div>
                </button>
                <button onClick={() => this.remove()} style={{position:'absolute', top:0, left:0}}className="btn badge btn-danger">-</button>
                <h6>{this.props.name}</h6>
                <h6>{this.props.artist.toProperCase()}</h6>
            </div>);
    }
}
PlaylistTrackItem.propTypes = {
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    artwork: PropTypes.string.isRequired,
    removeTracksFromPlaylist: PropTypes.func.isRequired,
    apple: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    library: PropTypes.object.isRequired,
    _playlistid: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
    library: state.library
});

export default connect(mapStateToProps, {removeTrackFromPlaylist})(PlaylistTrackItem);