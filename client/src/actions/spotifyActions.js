import {LOGIN_USER, REFRESH_TOKEN,  SET_CURRENT_TOKENS} from "../actions/types";
import axios from 'axios';
//login to spotify
export const loginSpotify = (data) => dispatch => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    dispatch({type: LOGIN_USER,
      payload: data});
    dispatch(setCurrentTokens(data));
};
export const refreshSpotify = (data) => dispatch => {
    axios.get(`/api/spotify/refresh_token?refresh_token=${data}`).then(res => console.log(res.data)).catch(err => console.log(err));
    dispatch({type: REFRESH_TOKEN,
        payload: data});

};
export const setCurrentTokens = (decoded) => {
    return {
        type: SET_CURRENT_TOKENS,
        payload: decoded
    }
};