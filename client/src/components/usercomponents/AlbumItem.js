import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {removeAlbum} from "../../actions/libraryActions";
import {connect} from 'react-redux';
import {addSongToQueue, clearQueue} from "../../actions/queueActions";

class AlbumItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            _id: this.props._id,
            id: this.props.id,
            artwork: this.props.artwork,
            artistName: this.props.artistName,
            albumName: this.props.albumName,
            apple: false || this.props.apple,
            uri: this.props.uri || "apple"
        }
    }
    remove = () => {
        this.props.removeAlbum(this.state._id);
        window.location.reload(true);
    };
    play = () => {
        this.props.clearQueue();
        const albumData = {
            artistName: this.state.artistName,
            albumName: this.state.albumName,
            id: this.state.id,
            artwork: this.props.artwork,
            apple: this.state.apple,
            uri: this.state.uri
        };
        this.props.addSongToQueue(albumData);
    };
    render(){
        let imgContent;
        if(this.state.apple){
            imgContent = <img alt="cover art" style={{height: 128, width: 128}}src={this.props.artwork} />;

        }else{
            imgContent = <img alt="cover art" style={{height: 128, width: 128}}src={this.state.artwork} />

        }
        return(
            <div>
                <button onClick={() => this.play()} className="btn btn-dark">
                    <div className="container1">{imgContent}
                        <div className="overlay">
                            <div className="text1"><i className="fa fa-play"></i> </div>
                        </div>
                    </div></button>
                <button onClick={() => this.remove()} style={{position:'absolute', top:0, left:0}}className="btn badge btn-danger">-</button>
                <h6>{this.state.albumName}</h6>
                <h6>{this.state.artistName}</h6>

            </div>
        )
    }
}
AlbumItem.propTypes = {
    albumName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    artwork: PropTypes.string.isRequired,
    apple: PropTypes.bool.isRequired,
    removeAlbum: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    addSongToQueue: PropTypes.func.isRequired,
    clearQueue: PropTypes.func.isRequired
};
export default connect(null, {removeAlbum, addSongToQueue, clearQueue})(AlbumItem);