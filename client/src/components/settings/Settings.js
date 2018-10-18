import React, {Component} from 'react';
import AuthorizeMusicServices from '../authorization/AuthorizeMusicServices';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Settings extends Component{
    constructor(){
        super();
        this.state = {
            accessToken: '',
            refreshToken: '',
            errors: {}
        };
    }

    render(){
        return(<div><h1>Settings</h1>
            <h3> Authorize Apple Music</h3>
            <AuthorizeMusicServices/>
            <h3> Authorize Spotify</h3>
            <a className="btn btn-info mt-4" href="http://localhost:5000/api/spotify/login"> Login to Spotify </a>

        </div>);
    }
}
Settings.propTypes = {
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    errors: state.errors,
});
export default connect(mapStateToProps)(Settings);