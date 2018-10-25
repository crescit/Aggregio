import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAlbums} from "../../actions/libraryActions";
import { Container, Row, Col } from 'reactstrap';

import AlbumItem from './AlbumItem';

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
        }else{
            AlbumContent = this.props.library.albums.map(
                data => (
                    <Col className="col-3 col-sm-3 col-md-3" key={data._id}>
                        <AlbumItem apple={data.apple} uri={data.uri} key={data.id} artistName={data.artistName}
                                   albumName={data.albumName} duration={data.duration_ms}
                                   id={data.id} _id={data._id} artwork={data.artwork}/>
                    </Col>
                ));
        }
        return(<div><h1>Album</h1><Container><Row>{AlbumContent}</Row></Container></div>)
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