import React, {Component} from 'react';

class AuthorizeMusicServices extends Component {
    render(){
        return(
            <div>
                <button className="btn btn-info mt-4" id="apple-music-authorize">Log in to apple music </button>
                <button className="btn btn-danger mt-4" id="apple-music-unauthorize"> Log out of apple music</button>
            </div>
        )
    }
}
export default  AuthorizeMusicServices;