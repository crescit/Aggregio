import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loginSpotify} from "../../actions/spotifyActions";
import {isEmpty} from '../../validation/is-empty';
import SpotifyPlayer from '../MediaPlayers/SpotifyPlayer';
import AppleMusicPlayer from '../MediaPlayers/AppleMusicPlayer';

class Main extends Component {
    constructor(props){
        super(props);
        this.state ={ params : this.getHashParams()};

    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q);
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }
    componentDidMount(){
        this.getHashParams();
        const params = this.state.params;
        if(!isEmpty(params)){
            const data = {
                accessToken: params.access_token,
                refreshToken: params.refresh_token
            };
            this.props.loginSpotify(data);
        }
    }
    render(){



        return(<div>
            <h1>Main Page</h1>
            <SpotifyPlayer/>
            <AppleMusicPlayer/>
        </div>);
    }
}
Main.propTypes = {
  errors: PropTypes.object.isRequired,
  spotify: PropTypes.object.isRequired,
  loginSpotify: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    errors: state.errors,
    spotify: state.spotify
});
export default connect(mapStateToProps, {loginSpotify})(Main);