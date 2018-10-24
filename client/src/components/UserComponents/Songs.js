import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSongs} from "../../actions/libraryActions";

class Songs extends Component {
    componentDidMount(){
        this.props.getSongs();
    }
    render(){
        return(<div><h1>Songs</h1></div>)
    }
}
Songs.propTypes = {
    library: PropTypes.object.isRequired,
    getSongs: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    library: state.library
});
export default connect(mapStateToProps, {getSongs})(Songs);