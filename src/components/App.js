import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AdoptionPage from './AdoptionPage';
import config from '../config';
import '../styles/App.css';


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      dogs: [],
      cats: [],
      tickets: [],
      loaded: false,
      submitted: false,
      display: 'dogs',
    }
  }

  handleChangeAnimal = () => {
    let display = this.state.display
    if (display === 'dogs') {
      display = 'cats';
    }
    else if (display === 'cats') {
      display = 'dogs'
    }
    this.setState({
      display
    })
  }

  async componentDidMount() {

    let tickets = await fetch(`${config.API_ENDPOINT}/tickets`);
    tickets = await tickets.json();
    console.log(tickets);

    let cats = await fetch(`${config.API_ENDPOINT}/pets/cats`);
    cats = await cats.json();

    let dogs = await fetch(`${config.API_ENDPOINT}/pets/dogs`);
    dogs = await dogs.json();

    this.setState({
      dogs,
      cats,
      loaded: true,
      tickets,
    })
  }


  handleInterval = () => {
    let currArr;
    let display = this.state.display
    console.log(this.state.dogs)
    if (this.state.display === 'dogs'){
      currArr = this.state.dogs
    } else {
      currArr = this.state.cats
    }
    setInterval(() => {
      console.log('set interval')
      console.log(currArr)
      if(window.localStorage.getItem('ticket') === this.state.tickets[0].id){
        setTimeout(() => {}, 5000)
      } else {
        fetch(`${config.API_ENDPOINT}/adopt`, {
          method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({display, ticketId: this.state.tickets[0].id, petId: currArr[0].id})
        })
        .then(() => {
          let newArr = this.rotateArr(currArr)
          let newTickets = this.rotateArr(this.state.tickets)
          if(display === 'dogs'){
            this.setState({
              dogs: newArr,
              tickets: newTickets,
            })
          } else {
            this.setState({
              cats: newArr,
              tickets: newTickets,
            })
          }
          
        })
      }
    }, 2000)
  }


  handleAdoption = () => {
    let display = this.state.display
    let ticketId = window.localStorage.getItem('ticket');
    let petId;
    if(display === 'dogs'){
      petId = this.state.dogs[0].id
    } else {
      petId = this.state.cats[0].id
    }

    let info = {
      display,
      ticketId,
      petId,
    }

    fetch(`${config.API_ENDPOINT}/adopt`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(() => {
      let newDogs = this.rotateArr(this.state)
      let newTickets = this.rotateArr(this.state.tickets)
      this.setState({
        dogs: newDogs,
        tickets: newTickets,
      })
    })
     
  }

  rotateArr = (arr) => {

    if(!arr.length){
      return arr
    }
    let temp = [...arr]

    temp.push(temp.shift())
    
    return temp
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
          tickets: [...this.state.tickets, ticket]
        })
        window.localStorage.setItem('ticket', ticket.id)
      })

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
                  display={this.state.display}
                  handleInterval={this.handleInterval}
                  handleAdoption={this.handleAdoption}
                  handleChangeAnimal={this.handleChangeAnimal}
                  cats={this.state.cats}
                  dogs={this.state.dogs}
                  tickets={this.state.tickets}
                  loaded={this.state.loaded}
                />
              
            )
          }
          }
        />
      </Switch>
    )
  }
}

export default App;
