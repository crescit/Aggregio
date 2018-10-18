import {LOGIN_USER, REFRESH_TOKEN} from "../actions/types";

//login to spotify
export const loginSpotify = (data) => dispatch => {

  dispatch({type: LOGIN_USER,
      payload: data});

};
export const refreshSpotify = (data) => dispatch => {
   dispatch({type: REFRESH_TOKEN,
            payload: data});


};