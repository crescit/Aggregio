import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPlaylists, createPlaylist} from "../../actions/libraryActions";
import PlaylistTrackItem from './PlaylistTrackItem';
import { Container, Row, Col } from 'reactstrap';

class Playlists extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedPlaylist : "",
            value: ""
        }
    }
    componentDidMount(){
        this.props.getPlaylists();
    }
    create = () => {
        const body = {
            name: this.state.value
        };
        this.props.createPlaylist(body);
        window.location.reload(true);
    };
    onChange = (e) => {
        this.setState({value: e.target.value});
    };
    choose = (id) => {
        this.setState({selectedPlaylist: id});
    };
    onDelete = (id) => {

    };
    render(){
        let PlaylistContent;
        let SongContent;
        let DeleteButton;
        if(this.props.library.loadingPlaylist){
            PlaylistContent = <div><h1>User Playlists are loading</h1></div>
        }
        if(this.props.library.playlists.length === 0){
            PlaylistContent = <div><h1>No Playlists, please create one </h1></div>
        }else{
            PlaylistContent = this.props.library.playlists.map(item => {
                return <li key={item._id} onClick={() => this.choose(item._id)} className="btn btn-info btn-block nav nav-pills nav-stacked">{item.playlistName}</li>
            });
            if(this.state.selectedPlaylist === ""){
                SongContent = <h4>Choose a playlist above</h4>
            }else{
                let index;
                for(var i = 0; i < this.props.library.playlists.length; i++){
                    if(this.props.library.playlists[i]._id === this.state.selectedPlaylist){
                        index = i;
                        break;
                    }
                }

                    SongContent = this.props.library.playlists[index].songs.map(data => (
                        <Col className="col-3 col-sm-3 col-md-3" key={data._id}>
                            <PlaylistTrackItem apple={data.apple} uri={data.uri} key={data.id} name={data.name} artist={data.artist}
                                       album={data.album} duration={data.duration_ms}
                                       id={data.id} _id={data._id} artwork={data.artwork}/>
                        </Col>

                    ));
                DeleteButton = <button onClick={() => this.onDelete(this.props.library.playlist[index]._id)} className="btn btn-danger btn-block"> DELETE PLAYLIST</button>
            }

        }
        return(<div>
            <h1>Playlists</h1>

            <input onChange={() => this.onChange} value={this.state.value} placeholder="Name for a New Playlist"></input>
            <button onClick={() => this.create()}className="btn btn-bar btn-info"> Create Playlist</button>
            <hr/>
            <ul className="nav navbar-pills nav-stacked">
            {PlaylistContent}
            </ul>
            <Container>
                <Row>
            {SongContent}
                </Row>
            </Container>
            {DeleteButton}
            </div>)
    }
}
Playlists.propTypes = {
    library: PropTypes.object.isRequired,
    getPlaylists: PropTypes.func.isRequired,
    createPlaylist: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    library: state.library
});
export default connect(mapStateToProps, {getPlaylists, createPlaylist})(Playlists);