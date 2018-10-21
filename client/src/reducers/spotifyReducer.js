import {LOGIN_USER, REFRESH_TOKEN, SET_CURRENT_TOKENS} from "../actions/types";
import {isEmpty} from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    accessToken : "",
    refreshToken : "",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        case REFRESH_TOKEN:
            return {
                ...state,
                accessToken: action.payload.access_token
            };
        case SET_CURRENT_TOKENS:
            return {
                ...state,
                isAuthenticated: action.payload.accessToken !== undefined,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        default:
            return state;
    }
}