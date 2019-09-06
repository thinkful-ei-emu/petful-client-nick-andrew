import React from 'react';

function PetDisplay(props){

  const pet = props.pet;


  return (
    <div className='pet-display-container'>
    <h2 className='pet-header'>{pet.name}</h2>
    <img src={pet.imageURL} alt='dog' className='pet-img'/>
    <ul className='pet-attr'>
      <li><strong>Sex: </strong>{pet.sex}</li>
      <li><strong>Age: </strong>{pet.age}</li>
      <li><strong>Breed: </strong>{pet.breed}</li>
    </ul>
    <p className='pet-story'><strong>{pet.name}'s story: </strong>{pet.story}</p>
    </div>
  )

}

export default PetDisplay;