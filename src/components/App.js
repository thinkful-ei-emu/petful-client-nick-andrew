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
    };
  }


  // async componentDidMount() {
  //   let tickets = await fetch(`${config.API_ENDPOINT}/tickets`);
  //   tickets = await tickets.json();
  //   console.log(tickets);

  //   let cats = await fetch(`${config.API_ENDPOINT}/pets/cats`);
  //   cats = await cats.json();

  //   let dogs = await fetch(`${config.API_ENDPOINT}/pets/dogs`);
  //   dogs = await dogs.json();

  //   this.setState({
  //     dogs,
  //     cats,
  //     loaded: true,
  //     tickets,
  //   }, () => {
  //     console.log('dogs', this.state.dogs);
  //     console.log('cats', this.state.cats);
  //   });
  // }


  // handleInterval = (petArray) => {
  //   let currArr = petArray;

  //   // console.log('petarray', petArray);
  //   let display = this.state.display;
  //   // if (this.state.display === 'dogs') {
  //   //   currArr = [...this.state.dogs];
  //   // } else {
  //   //   currArr = [...this.state.cats];
  //   // }
  //   setInterval(() => {
  //     console.log('set interval');
  //     if (this.state.loaded) {
  //       if (window.localStorage.getItem('ticket') !== this.state.tickets[0].id) {
  //         // console.log('currArr', currArr);
  //         fetch(`${config.API_ENDPOINT}/adopt`, {
  //           method: 'POST',
  //           headers: {
  //             'content-type': 'application/json'
  //           },
  //           body: JSON.stringify({ display, ticketId: this.state.tickets[0].id, petId: currArr[0].id })
  //         })
  //           .then(() => {
  //             let newArr = this.rotateArr(currArr);
  //             let newTickets = this.rotateArr(this.state.tickets);
  //             if (display === 'dogs') {
  //               this.setState({
  //                 dogs: newArr,
  //                 tickets: newTickets,
  //               });
  //             } else {
  //               this.setState({
  //                 cats: newArr,
  //                 tickets: newTickets,
  //               });
  //             }

  //           });
  //       }
  //     }
  //   }, 2000);
  // }




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
          tickets: [...this.state.tickets, ticket]
        });
        window.localStorage.setItem('ticket', ticket.id);
      });

  }

  render() {

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
