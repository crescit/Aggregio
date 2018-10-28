import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSongs} from "../../actions/libraryActions";
import TrackItem from './TrackItem';
import { Container, Row, Col } from 'reactstrap';

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
        }else{
            SongContent = this.props.library.songs.map(
                data => (
                    <Col className="col-3 col-sm-3 col-md-3" key={data._id }>
                        <TrackItem apple={data.apple} uri={data.uri} key={data._id} name={data.name} artist={data.artist}
                                   album={data.album} duration={data.duration_ms}
                                   id={data.id} _id={data._id} artwork={data.artwork}/>
                    </Col>
            ));
        }
        return(<div><h1>Songs</h1><Container><Row>{SongContent}</Row></Container></div>)
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