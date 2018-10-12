import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './layoutcomponents/LandingPage';
import Footer from './layoutcomponents/Footer';
class App extends Component {
  render() {
    return (
        <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Footer/>
      </div>
        </Router>
    );
  }
}

export default App;
