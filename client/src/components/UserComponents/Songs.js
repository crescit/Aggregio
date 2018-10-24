import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSongs} from "../../actions/libraryActions";

class Songs extends Component {
    componentDidMount(){
        this.props.getSongs();
    }
    render(){
        let SongContent;
        if(this.props.library.loadingSongs){
            SongContent = <div><h1>User Songs are loading</h1></div>
        }
        if(this.props.library.songs.length === 0){
            SongContent = <div><h1>There are no songs in the user library, you can add songs to your library from the search function. </h1></div>
        }
        return(<div><h1>Songs</h1>{SongContent}</div>)
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