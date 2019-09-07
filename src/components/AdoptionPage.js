import React from 'react';
import PetDisplay from './PetDisplay';
import TicketDisplay from './TicketDisplay';
import '../styles/AdoptionPage.css';


class AdoptionPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isFirst: false,
      catIndex: 0,
      dogIndex: 0,
      ticketInterval: false,
    }
  }

  componentDidMount() {
    console.log('component did mount ran')
    if (!this.state.ticketInterval) {
      console.log('interval set')
      this.props.handleInterval()
      this.setState({
        ticketInterval: true,
      })
    } 

  }

  componentWillUnmount() {
    console.log('interval cleared')
    this.setState({
      ticketInterval: false,
    })
    clearInterval();
  }


  determineOptions = () => {
    let buttonText = null
    if (this.props.display === 'dogs') {
      buttonText = 'Show me cats'
    } else {
      buttonText = 'Show me dogs'
    }
    return buttonText;
  }

  

  handleNext = () => {
    let display = this.props.display
    let currIndex;
    if (display === 'dogs') {
      currIndex = this.state.dogIndex
      currIndex++
      this.setState({
        dogIndex: currIndex,
      })
    } else {
      currIndex = this.state.catIndex
      currIndex++
      this.setState({
        catIndex: currIndex,
      })
    }

  }



  render() {
    let buttonText = this.determineOptions();
    let petProp;
    let currIndex;
    let disabled = false;
    let adoptDisabled = true;
    let ticketId = window.localStorage.getItem('ticket');



    if (this.props.display === 'cats') {
      petProp = this.props.cats;
      currIndex = this.state.catIndex;
      if (currIndex >= this.props.cats.length - 1) {
        disabled = true;
      }
    }
    else {
      petProp = this.props.dogs;
      currIndex = this.state.dogIndex;
      if (currIndex >= this.props.dogs.length - 1) {
        disabled = true;
      }
    }



    if (!this.props.loaded) {
      return (<p>Loading</p>)
    }
    else if (petProp.length === 0) {
      return <p>No pets to display</p>
    } else {
      if (this.props.tickets.length && ticketId === this.props.tickets[0].id) {
        console.log(ticketId, this.props.tickets)
        adoptDisabled = false
      }
      
      return (
        <div className='adoption-container'>
          <h1>Petful</h1>
          <TicketDisplay tickets={this.props.tickets} loaded={this.props.loaded} />
          <button onClick={this.props.handleChangeAnimal} className='change-button'>{buttonText}</button>
          <PetDisplay pet={petProp[currIndex]} />
          <button onClick={this.props.handleAdoption} className='adopt-button' disabled={adoptDisabled}>Adopt</button>
          <button onClick={this.handleNext} className='next-button' disabled={disabled} >Next</button>
        </div>
      )
    }

  }
}

export default AdoptionPage



