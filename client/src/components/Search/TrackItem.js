import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TrackItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            artist: this.props.artist,
            album: this.props.album,
            artwork: this.props.artwork,
            id: this.props.id,
            duration_ms: this.props.duration
        }
    }
    render(){
        return(
            <div>
                <img alt="cover art" style={{height: 128, width: 128}}src={this.props.artwork} />
                <h3>name: {this.props.name}</h3>
                <h3>artist: {this.props.artist}</h3>
                <h3>album: {this.props.album}</h3>
                <h3>duration: {this.props.duration_ms}</h3>
                <h3>id: {this.props.id}</h3>

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
};
export default TrackItem;