import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

//component imports go below
import LandingPage from './layoutcomponents/LandingPage';
import Footer from './layoutcomponents/Footer';
import Login from './authorization/Login';
import Register from './authorization/Register';

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
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
        <Footer/>
      </div>
        </Router>
        </Provider>
    );
  }
}

export default App;
