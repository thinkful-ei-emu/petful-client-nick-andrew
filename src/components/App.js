import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './LandingPage';
import '../styles/App.css';

class App extends React.Component {

  handleUserSubmit = ev => {
    ev.preventDefault();
    console.log('Working');
  }


  render(){
    return (
      <Switch>
      <Route
      exact path={'/'}
      component={() => <LandingPage handleUserSubmit={this.handleUserSubmit} />}
      />
      </Switch>
    )
  }
}

export default App;
