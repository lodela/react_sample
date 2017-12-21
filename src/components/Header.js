import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class Header extends Component{
  constructor(){
    super();
    this.name='Norberto'
  }
  render(){
    return(
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Lodela React Exercises</h1>
      </header>
    );
  }
}
