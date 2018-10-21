import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {searchTrack, searchAlbum, } from "../../actions/searchActions";
import TrackItem from './TrackItem';
import AlbumItem from './AlbumItem';
import { Container, Row, Col } from 'reactstrap';

class SearchResults extends Component {
    componentDidMount(){
        this.props.searchTrack(this.props.location.state[0].term, this.props.spotify.accessToken);
        this.props.searchAlbum(this.props.location.state[0].term, this.props.spotify.accessToken);
    }
    render(){
        const { appleTracks, loadingAppleTrack} = this.props.search;
        const { appleAlbums, loadingAppleAlbum} = this.props.search;
        const { spotifyTracks, loadingSpotifyTrack} = this.props.search;
        const { spotifyAlbums, loadingSpotifyAlbum} = this.props.search;

        let appleTrackContent;
        let appleAlbumContent;
        let spotifyTrackContent;
        let spotifyAlbumContent;

        if(appleTracks === null || loadingAppleTrack){
            appleTrackContent = (<h3> Apple Track Loading</h3>)
        }else{
            if(appleTracks.songs === undefined){

            }else {
                appleTrackContent = appleTracks.songs.data.map(data => (
                    <Col className="col-3 col-sm-3 col-md-3" key={data.id}>
                    <TrackItem apple={true} key={data.id} name={data.attributes.name} artist={data.attributes.artistName}
                               album={data.attributes.albumName} duration={data.attributes.durationInMillis.toString()}
                               id={data.id} artwork={data.attributes.artwork.url}/>
                    </Col>
                ));
            }

        }
        if(spotifyTracks === null || loadingSpotifyTrack){
            spotifyTrackContent = (<h3> Spotify Track Loading</h3>)
        }else{
            if(spotifyTracks.tracks === undefined){

            }else {
                spotifyTrackContent = spotifyTracks.tracks.items.map(data => (
                    <Col className="col-3 col-sm-3 col-md-3" key={data.id}>
                        <TrackItem uri={data.uri} key={data.id} name={data.name} artist={data.artists[0].name}
                                   album={data.album.name} duration={data.duration_ms.toString()}
                                   id={data.id} artwork={data.album.images[0].url}/>
                    </Col>
                ));
            }
        }

        if(appleAlbums === null || loadingAppleAlbum){
            appleAlbumContent = (<h3> Apple Album Loading</h3>)
        }else{
            if(appleAlbums.albums === undefined){

            }else{
                appleAlbumContent = appleAlbums.albums.data.map(data => (
                    <Col className="col-3 col-sm-3 col-md-3">
                        <AlbumItem apple={true} albumName={data.attributes.name} artistName={data.attributes.artistName} id={data.id} artwork={data.attributes.artwork.url}/>
                    </Col>
                ));
            }
        }
        if(spotifyAlbums === null || loadingSpotifyAlbum){
            spotifyAlbumContent = (<h3> Spotify Album Loading</h3>)
        }else{
            if(spotifyAlbums.albums === undefined){

            }else{
                spotifyAlbumContent = spotifyAlbums.albums.items.map(data => (
                    <Col className="col-3 col-sm-3 col-md-3">
                        <AlbumItem  uri={data.uri} albumName={data.name} artistName={data.artists[0].name} id={data.id} artwork={data.images[0].url}/>
                    </Col>
                ));
            }
        }


        return(

          <div className="p-3 mb-2 bg-dark text-white"><h1>Search Results</h1>
              <Container>
              <div >
                    <h2>Songs</h2>
                  <hr/>
                  <Row >
                  {spotifyTrackContent}
                  {appleTrackContent}
                  </Row>
                  <hr/>
              </div>
              <div>
              <h2> Albums </h2>
                    <Row>
                  {spotifyAlbumContent}
                  {appleAlbumContent}
                    </Row>
                  <hr/>
              </div>

              </Container>
              </div>
        );
    }
}
SearchResults.propTpes = {
    searchTrack: PropTypes.func.isRequired,
    searchAlbum: PropTypes.func.isRequired,
    spotify: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    spotify: state.spotify,
    errors: state.errors,
    search: state.search
});
export default connect(mapStateToProps, {searchTrack, searchAlbum})(SearchResults);