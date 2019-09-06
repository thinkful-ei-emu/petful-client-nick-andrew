import React from 'react';
import PetDisplay from './PetDisplay';
import '../styles/AdoptionPage.css';
class AdoptionPage extends React.Component {

  constructor(){
    super()
    this.state = {
      display: 'dogs',
      isFirst: false,
      petIndex: 0,
    }
  }

  determineOptions = () => {
    let options = {
      petProp: null,
      buttonText: null,
    };
    if(this.state.display === 'dogs'){
      options.petProp = dog
      options.buttonText = 'Show me cats'
    } else {
      options.petProp = cat
      options.buttonText = 'Show me dogs'

    }
    return options;
  }

  handleChangeAnimal = () => {
    let display = this.state.display
    if(display === 'dogs'){
      display = 'cats';
    }
    else if(display === 'cats'){
      display = 'dogs'
    }
    this.setState({
      display
    })
  }

  



  render(){
    let {petProp, buttonText} = this.determineOptions();

    return(
      <div className='adoption-container'>
      <h1>Petful</h1>
      <button onClick={this.handleChangeAnimal} className='change-button'>{buttonText}</button>
      <PetDisplay pet={petProp}/>
      <button onClick={this.props.handleAdoption} className='adopt-button'>Adopt</button>
      </div>
    )
  }
}

export default AdoptionPage



const dog = {
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
}

const cat = {
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
}