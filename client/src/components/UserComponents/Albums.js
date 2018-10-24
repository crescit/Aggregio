import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAlbums} from "../../actions/libraryActions";

class Albums extends Component {
    componentDidMount(){
        this.props.getAlbums();
    }
    render(){
        let AlbumContent;
        if(this.props.library.loadingAlbums){
            AlbumContent = <div><h1>User Albums are loading</h1></div>
        }
        if(this.props.library.albums.length === 0){
            AlbumContent = <div><h1>There are no albums in the user library, you can add albums to your library from the search function. </h1></div>
        }
        return(<div><h1>Albums</h1>{AlbumContent}</div>)
    }
}
Albums.propTypes = {
    library: PropTypes.object.isRequired,
    getAlbums: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    library: state.library
});
export default connect(mapStateToProps, {getAlbums})(Albums);