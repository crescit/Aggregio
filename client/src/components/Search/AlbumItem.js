import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addAlbum} from "../../actions/libraryActions";
import {connect} from 'react-redux';

class AlbumItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            artwork: this.props.artwork,
            artistName: this.props.artistName,
            albumName: this.props.albumName,
            apple: false || this.props.apple,
            uri: "apple" || this.props.uri
        }
    }
    addAlbum = () => {
        const albumData = {
            id: this.state.id,
            apple: this.state.apple,
            uri: this.state.uri,
            artwork: this.state.artwork,
            albumName: this.state.albumName,
            artistName: this.state.artistName
        };
        this.props.addAlbum(albumData);
        this.setState({
            artistName: null,
            albumName: null,
            artwork: null,
            id: null,
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
                {this.state.artistName === null ? null :
                    <button className="btn btn-dark">
                        <div className="container1">{imgContent}
                            <div className="overlay">
                                <div className="text1"><i className="fa fa-play"></i></div>
                            </div>
                        </div>
                    </button>
                }
                {this.state.artistName === null ? null : <button onClick={() => this.addAlbum()} style={{float: 'center'}}className="btn btn-info">+</button>}

                <h6>{this.state.artistName}</h6>
                <h6>{this.state.artistName === null ? null : this.state.albumName.toProperCase()}</h6>
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
    addAlbum: PropTypes.func.isRequired
};
export default connect(null, {addAlbum})(AlbumItem);