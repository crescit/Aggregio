import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {searchTrack, searchAlbum, searchArtist} from "../../actions/searchActions";

class SearchResults extends Component {
    componentDidMount(){
        this.props.searchTrack(this.props.location.state[0].term, this.props.spotify.accessToken);
        this.props.searchAlbum(this.props.location.state[0].term, this.props.spotify.accessToken);
        this.props.searchArtist(this.props.location.state[0].term, this.props.spotify.accessToken);
    }
    render(){
        /*
            Current error is that the state hasn't resolved
         */
        //this.state.tracks.appleTracks.songs.data[0].attributes
        //has albumName, artistName, artwork (width, height, url), id, duration_ms
        //this.state.tracks.spotifyTracks.tracks.items[0]
        //has album.images[], albums.name, artists[0].name, duration, name, uri, id, isrc
        //let appleTrack = this.state.tracks.appleTracks.songs.data[0].attributes;
        //const item = (     <TrackItem name={"hey"} artist={appleTrack.artistName} album={appleTrack.albumName} duration={appleTrack.duration_ms} id={appleTrack.id} artwork={appleTrack.artwork.url}/>);
        return(
          <div><h1>Search Results</h1>

              </div>
        );
    }
}
SearchResults.propTpes = {
    searchTrack: PropTypes.func.isRequired,
    searchAlbum: PropTypes.func.isRequired,
    searchArtist: PropTypes.func.isRequired,
    spotify: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    spotify: state.spotify,
    errors: state.errors,
    search: state.search
});
export default connect(mapStateToProps, {searchTrack, searchAlbum, searchArtist})(SearchResults);