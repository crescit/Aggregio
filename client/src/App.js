import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import jwt_decode from 'jwt-decode';



import Main from './components/mainpage/Main';
import PrivateRoute from './components/common/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { setCurrentTokens } from './actions/spotifyActions';

//component imports go below
import LandingPage from './components/layoutcomponents/LandingPage';
import Footer from './components/layoutcomponents/Footer';
import NavigationBar from './components/layoutcomponents/NavigationBar';
import Login from './components/authorization/Login';
import Register from './components/authorization/Register';
import Settings from './components/settings/Settings';
import SearchResults from './components/search/SearchResults';
import Logout from './components/Logout';
import Songs from './components/usercomponents/Songs';
import Playlists from './components/usercomponents/Playlists';
import Albums from './components/usercomponents/Albums';
import GeneralMusicPlayer from './components/mediaplayers/GeneralMusicPlayer';
import {clearErrors} from "./actions/errorActions";
// Check for token
if (localStorage.jwtToken) {

    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    const tokens = { accessToken: localStorage.accessToken, refreshToken: localStorage.refreshToken};

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    store.dispatch(setCurrentTokens(tokens));
    store.dispatch(clearErrors());
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Clear current Profile
        // Redirect to login
        window.location.href = '/login';
    }
}

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <PersistGate  loading={null} persistor={persistor}>
        <Router>
      <div  className="App p-3 mb-2 bg-dark text-white">
          <NavigationBar/>
        <Route exact path="/" component={LandingPage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>

          <Switch>
              <PrivateRoute
                  exact
                  path="/main"
                  component={Main}
              />
          </Switch>
          <Switch>
              <PrivateRoute
                  exact
                  path="/settings"
                  component={Settings}
              />
          </Switch>
          <Switch>
              <PrivateRoute
                  exact
                  path="/searchresults"
                  component={SearchResults}
              />
          </Switch>
          <Switch>
              <PrivateRoute
                  exact
                  path="/logout"
                  component={Logout}
              />
          </Switch>
          <Switch>
              <PrivateRoute
                  exact
                  path="/songs"
                  component={Songs}
              />
          </Switch>
          <Switch>
              <PrivateRoute
                  exact
                  path="/playlists"
                  component={Playlists}
              />
          </Switch>
          <Switch>
              <PrivateRoute
                  exact
                  path="/albums"
                  component={Albums}
              />
          </Switch>
          <Switch>
              <PrivateRoute component={GeneralMusicPlayer}
         />
          </Switch>
            <Footer/>
      </div>
        </Router>

        </PersistGate>
        </Provider>
    );
  }
}

export default App;
