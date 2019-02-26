import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from '../Form/Form.js';
    // console.log('form');
    // console.log(demovalue);
const ParamsExample = () => (
  <Router>
    <div>
      <h2>Room List</h2>
      <ul>
        <li>
          <Link to="/r/room1/tqbmrga/123456">room1</Link>
        </li>
        <li>
          <Link to="/r/room2/tqbmrga/123456">room2</Link>
        </li>
        <li>
          <Link to="/r/room3/tqbmrga/123456">room3</Link>
        </li>
        <li>
          <Link to="/r/room4/tqbmrga/123456">room4</Link>
        </li>
      </ul>

      <Route path="/r/:room/:userName/:key" component={Child} />

    </div>
  </Router>
);

const Child = ({ match }) => (
  <div>
    <h3>room: {match.params.room}</h3>
    <Form params={match.params} />   
  </div>
);



export default ParamsExample;