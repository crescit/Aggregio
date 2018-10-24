import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPlaylists} from "../../actions/libraryActions";

class Playlists extends Component {
    componentDidMount(){
        this.props.getPlaylists();
    }
    render(){
        let PlaylistContent;
        if(this.props.library.loadingPlaylist){
            PlaylistContent = <div><h1>User Playlists are loading</h1></div>
        }
        if(this.props.library.playlists.length === 0){
            PlaylistContent = <div><h1>There are no playlists in the user library, you can create a playlist </h1></div>
        }
        return(<div><h1>Playlists</h1>{PlaylistContent}</div>)
    }
}
Playlists.propTypes = {
    library: PropTypes.object.isRequired,
    getPlaylists: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    library: state.library
});
export default connect(mapStateToProps, {getPlaylists})(Playlists);