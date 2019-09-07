import React from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/LandingPage.css';


class LandingPage extends React.Component {

  


  render() {

    if (this.props.submitted) {
      return <Redirect to='/Pets' />
    } else {
      return (
        <div className='landing-page-container'>
          <div className='lp-info'>
            <h1 className='lp-header'>Adopt Today!</h1>
            <p className='lp-desc'>Petful is a service that allows you to adopt a pet easily.
              The service is first come first serve. Reserve your spot today.
        </p>
            <img className='lp-img' src='https://www.all3dfree.net/uploads/5/1/9/6/51967249/pet_orig.jpg' alt='dog and cat' />
          </div>
          <div className='lp-form-container'>
            <form onSubmit={this.props.handleUserSubmit}>
              <div className='lp-form-row'>
                <label htmlFor='username'>Username: </label>
                <input type='text' id='username' required></input>
              </div>
              <div className='lp-form-row'>
                <label htmlFor='email' required>Email: </label>
                <input type='email' id='email'></input>
              </div>
              <div className='lp-form-row'>
                <button type='submit' className='lp-button'>Get Started!</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default LandingPage;