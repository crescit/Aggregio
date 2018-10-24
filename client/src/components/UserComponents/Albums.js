import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAlbums} from "../../actions/libraryActions";

class Albums extends Component {
    componentDidMount(){
        this.props.getAlbums();
    }
    render(){
        return(<div><h1>Albums</h1></div>)
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