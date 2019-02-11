import React, { Component } from 'react';

class Child extends Component {
    getAlert() {
      alert('clicked hi lulu');
    }
  
    render() {
      return (
        <h1>Hello</h1>
      );
    }
    
  }

export default Child;