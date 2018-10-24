import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPlaylists} from "../../actions/libraryActions";

class Playlists extends Component {
    componentDidMount(){
        this.props.getPlaylists();
    }
    render(){
        return(<div><h1>Playlists</h1></div>)
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