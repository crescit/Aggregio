import React, {Component} from 'react';
import AuthorizeMusicServices from '../authorization/AuthorizeMusicServices';
class Settings extends Component{
    render(){
        return(<div><h1>Settings</h1>
            <h3> Authorize Apple Music</h3>
            <AuthorizeMusicServices/>
            <h3> Authorize Spotify</h3>
        </div>);
    }
}
export default Settings;