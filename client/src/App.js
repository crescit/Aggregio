import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';

import Main from './components/MainPage/Main';
import PrivateRoute from './components/common/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
//component imports go below
import LandingPage from './components/layoutcomponents/LandingPage';
import Footer from './components/layoutcomponents/Footer';
import NavigationBar from './components/layoutcomponents/NavigationBar';
import Login from './components/authorization/Login';
import Register from './components/authorization/Register';
import Settings from './components/settings/Settings';
import Logout from './components/Logout';

// Check for token
if (localStorage.jwtToken) {

    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

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
        <Router>
      <div className="App" >
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
                  path="/logout"
                  component={Logout}
              />
          </Switch>
            <Footer/>
      </div>
        </Router>

        </Provider>
    );
  }
}

export default App;
