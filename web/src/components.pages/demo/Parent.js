import React, { Component } from 'react';
import Child from './Child';

class Parent extends Component {
    render() {
      return (
        <div>
          <Child ref={myref => { this.child = myref; }} />
          <button onClick={() => { this.child.getAlert(); }}>Click</button>
        </div>
      );
    }
  }

export default Parent;