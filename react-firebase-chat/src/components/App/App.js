import React, { Component } from 'react';
import Router from '../Router/Router.js';
//import logo from '../../images/logo.svg';
import './App.css';

import firebase from 'firebase';
import firebaseConfig from '../../config';
firebase.initializeApp(firebaseConfig);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
  }
  render() {
    //const demovalue ="demo";
    // console.log('app.js');
    // console.log(demovalue);
    return (
      <div className="app">
        {/* <div className="app__header">
          <img src={logo} className="app__logo" alt="logo" />
          <h2>
            SIMPLE APP WITH REACT
          </h2>
          { !this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Sign in
            </button>
          ) : (
            <button
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </button>
          )}
        </div> */}
        <div className="app__list">
          <Router/>                 
        </div>
      </div>
    );
  }
}
export default App;