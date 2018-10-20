/* this is the file for our root reducer */
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import spotifyReducer from './spotifyReducer';
import songReducer from './songReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    spotify: spotifyReducer,
    songs: songReducer
});
