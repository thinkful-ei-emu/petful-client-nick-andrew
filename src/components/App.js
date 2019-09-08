import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdoptionPage from './AdoptionPage';
import config from '../config';
import '../styles/App.css';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      submitted: false,
      ticket: null
    };
  }


  handleUserSubmit = ev => {
    ev.preventDefault();
    const { username, email } = ev.target;

    let user = {
      username: username.value,
      email: email.value
    };

    fetch(`${config.API_ENDPOINT}/tickets`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(ticket => {
        this.setState({
          submitted: true,
          ticket
        });
        window.localStorage.setItem('ticket', ticket.id);
      })
      .then(() => {
        // console.log('print');
      });

  }

  render() {
    console.log('render app');

    return (
      <Switch>
        <Route
          exact path={'/'}
          component={() => <LandingPage submitted={this.state.submitted} handleUserSubmit={this.handleUserSubmit} />}
        />

        <Route
          exact path={'/Pets'}
          render={() => {
            return (
              <AdoptionPage
                handleChangeAnimal={this.handleChangeAnimal}
                ticket={this.state.ticket}
              />
            );
          }
          }
        />
      </Switch>
    );
  }
}

export default App;
