import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

//component imports go below
import LandingPage from './components/layoutcomponents/LandingPage';
import Footer from './components/layoutcomponents/Footer';
import Login from './components/authorization/Login';
import Register from './components/authorization/Register';

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
