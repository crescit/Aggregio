import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const initialState = {};
const persistConfig = {
    key: 'root',
    storage,
};
const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);
/*
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )|| compose
));
*/

export const store = createStore(persistedReducer, initialState, compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )|| compose
));

export const persistor = persistStore(store);