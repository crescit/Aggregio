import {LOGIN_USER, REFRESH_TOKEN,  SET_CURRENT_TOKENS} from "../actions/types";

//login to spotify
export const loginSpotify = (data) => dispatch => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    const tokens = { accessToken: localStorage.accessToken, refreshToken: localStorage.refreshToken};
    console.log(tokens);
    dispatch({type: LOGIN_USER,
      payload: data});
    dispatch(setCurrentTokens(data));
};
export const refreshSpotify = (data) => dispatch => {
   dispatch({type: REFRESH_TOKEN,
            payload: data});
};
export const setCurrentTokens = (decoded) => {
    return {
        type: SET_CURRENT_TOKENS,
        payload: decoded
    }
};