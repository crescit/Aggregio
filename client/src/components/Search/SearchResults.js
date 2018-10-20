import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {refreshSpotify} from "../../actions/spotifyActions";
import {searchTrack, searchAlbum, searchArtist} from "./Search";

class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            'token': this.props.spotify.accessToken,
            'refresh': this.props.spotify.refreshToken,
            'term': this.props.location.state[0].term,
            'filter': this.props.location.state[1].filter,
            'albums': {},
            'tracks': {},
            'artists': {}
        };
    }
    componentDidMount(){
        switch(this.state.filter){
            case 'track':
                this.setState({tracks: searchTrack(this.state.term, this.state.token)});

                return;
            case 'artist':
                this.setState({artists: searchArtist(this.state.term, this.state.token)});
                return;
            case 'album':
                this.setState({albums: searchAlbum(this.state.term, this.state.token)});
                return;
            default:
                this.setState({tracks: searchTrack(this.state.term, this.state.token)});
                return;
        }
    }
    render(){

        return(
          <div><h1>Search Results</h1>
              </div>
        );
    }
}
SearchResults.propTpes = {
    spotify: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    spotify: state.spotify,
    errors: state.errors
});
export default connect(mapStateToProps, {refreshSpotify})(SearchResults);