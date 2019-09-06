import React from 'react';
import {Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdoptionPage from './AdoptionPage';
import '../styles/App.css';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      dogs: [],
      cats: [],
    }
  }

  // componentDidMount(){
  //   fetch()
  // }
  
  handleAdoption = () => {
    console.log('Adoption working');
  }

  render(){
    return (
      <Switch>
      <Route
      exact path={'/'}
      component={() => <LandingPage/>} />}
      />

      <Route
        exact path={'/Pets'}
        component={() => <AdoptionPage handleAdoption={this.handleAdoption}/>}
        />
      </Switch>
    )
  }
}

export default App;
