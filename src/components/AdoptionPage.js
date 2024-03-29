import React from 'react';
import PetDisplay from './PetDisplay';
import TicketDisplay from './TicketDisplay';
import config from '../config';
import '../styles/AdoptionPage.css';


// Component renders everything to do with the adoption functionallity

class AdoptionPage extends React.Component {

  static defaultProps = {
    ticket: { id: 0, username: '', email: '' }
  }

  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
      cats: [],
      tickets: [],
      display: 'dogs',
      loaded: false,
      isFirst: false,
      catIndex: 0,
      dogIndex: 0,
      ticketInterval: false,
    };
    this.adoptSimulator = null;
  }

  rotateArr = (arr) => {

    if (!arr.length) {
      return arr;
    }
    let temp = [...arr];

    let first = temp.shift();

    temp.push(first);


    return temp;
  }

  handleAdoption = () => { // Handles user adoption
    

    let display = this.state.display;
    let ticketId = window.localStorage.getItem('ticket');
    let petId;
    if (display === 'dogs') {
      petId = this.state.dogs[0].id;
    } else {
      petId = this.state.cats[0].id;
    }

    let info = {
      display,
      ticketId,
      petId
    };


    fetch(`${config.API_ENDPOINT}/adopt`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(() => {
        let newArr = (display === 'dogs') ? this.state.dogs : this.state.cats;

        let rotatedArr = this.rotateArr(newArr);

        let newTickets = this.rotateArr(this.state.tickets);

        if(display === 'dogs'){
          this.setState({
            dogs: rotatedArr,
            tickets: newTickets,
          }, () => {
            this.handleInterval();
          });
        } else {
          this.setState({
            cats: rotatedArr,
            tickets: newTickets,
          }, () => {
            this.handleInterval();
          });
        }
        
      });
      

  }


  handleInterval = () => { // simulates dummy user adoption to provide UX
    

    this.adoptSimulator = setInterval(() => {
      let display = this.state.display;

      let currArr = (display === 'dogs') ? this.state.dogs : this.state.cats;
      
   
      if (this.state.loaded) {
        if (window.localStorage.getItem('ticket') === this.state.tickets[0].id) {
          clearInterval(this.adoptSimulator);
        }
        else {
          let info = {
            display: this.state.display,
            ticketId: this.state.tickets[0].id,
            petId: currArr[0].id
          };
          
          fetch(`${config.API_ENDPOINT}/adopt`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(info)
          })
            .then(() => {
              let newArr = this.rotateArr(currArr);
              let newTickets = this.rotateArr(this.state.tickets);
              if (display === 'dogs') {
                this.setState({
                  dogs: newArr,
                  tickets: newTickets,
                });
              } else {
                this.setState({
                  cats: newArr,
                  tickets: newTickets,
                });
              }
            });
        }
      }
    }, 1000);
  }


  async componentDidMount() { // Gets ticket and pet info from server

    let tickets = await fetch(`${config.API_ENDPOINT}/tickets`);
    tickets = await tickets.json();

    let cats = await fetch(`${config.API_ENDPOINT}/pets/cats`);
    cats = await cats.json();

    let dogs = await fetch(`${config.API_ENDPOINT}/pets/dogs`);
    dogs = await dogs.json();

    this.setState({
      dogs,
      cats,
      tickets,
      loaded: true,
    }, () => {
      if (!this.state.ticketInterval) {
        this.handleInterval();
        this.setState({
          ticketInterval: true,
        });
      }
    });
  }


  componentWillUnmount() { //clears interval
    this.setState({
      ticketInterval: false,
    });
    clearInterval();
  }


  determineOptions = () => { //helper function for button text from cats to dogs
    let buttonText = null;
    if (this.state.display === 'dogs') {
      buttonText = 'Show me cats';
    } else {
      buttonText = 'Show me dogs';
    }
    return buttonText;
  }

  handleNext = () => { // handles next button
    let display = this.state.display;
    let currIndex;
    if (display === 'dogs') {
      currIndex = this.state.dogIndex;
      currIndex++;
      this.setState({
        dogIndex: currIndex,
      });
    } else {
      currIndex = this.state.catIndex;
      currIndex++;
      this.setState({
        catIndex: currIndex,
      });
    }

  }




  handleChangeAnimal = () => { // toggles display to dogs or cats
    let display = this.state.display;
    if (display === 'dogs') {
      display = 'cats';
    }
    else if (display === 'cats') {
      display = 'dogs';
    }
    this.setState({
      display
    });
  }

  render() {
    let buttonText = this.determineOptions();
    let petProp = [];
    let currIndex;
    let disabled = false;
    let adoptDisabled = true;
    let ticketId = window.localStorage.getItem('ticket');

    if (this.state.display === 'cats') {
      petProp = this.state.cats;
      currIndex = this.state.catIndex;
      if (currIndex >= this.state.cats.length - 1) {
        disabled = true;
      }
    }
    else {
      petProp = this.state.dogs;
      currIndex = this.state.dogIndex;
      if (currIndex >= this.state.dogs.length - 1) {
        disabled = true;
      }
    }


    if (!this.state.loaded) {
      return (<p>Loading</p>);
    }
    else if (petProp.length === 0) {
      return <p>No pets to display</p>;
    } else {
      if (this.state.tickets.length && ticketId === this.state.tickets[0].id) {
        adoptDisabled = false;
      }

      return (
        <div className='adoption-container'>
          <h1>Petful</h1>
          <TicketDisplay tickets={this.state.tickets} loaded={this.state.loaded} />
          <button onClick={this.handleChangeAnimal} className='change-button'>{buttonText}</button>
          <PetDisplay pet={petProp[currIndex]} />
          <button onClick={this.handleAdoption} className='adopt-button' disabled={adoptDisabled}>Adopt</button>
          <button onClick={this.handleNext} className='next-button' disabled={disabled} >Next</button>
        </div>
      );
    }

  }
}

export default AdoptionPage;



