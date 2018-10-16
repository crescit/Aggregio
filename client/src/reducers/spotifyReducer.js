import {LOGIN_USER, REFRESH_TOKEN} from "../actions/types";

const initialState = {
    accessToken : "",
    refreshToken : "",
};

export default function(state = initialState, action) {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case REFRESH_TOKEN:
            return {
                ...state,
                accessToken: action.payload.access_token
            };
        default:
            return state;
    }
}