import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from '../Form/Form.js';
import firebase from 'firebase';

const ParamsExample = () => (
  <Router>
    <div>
      <h2>Room List { RoomList() } </h2>
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

let Child = ({ match }) => (
  <div>
    {/* <h3>room: {match.params.room}</h3> */}
    <Form params={match.params} />
  </div>
);

let RoomList = function (){
  let roomlistRef = firebase.database().ref().child('roomlist').child('baoat1ts');
  roomlistRef.on("value", function(snapshot){
    
    // console.log('RoomList');
    // console.log(snapshot.val());
    // let list = snapshot.val()
    // list.map((anObjectMapped, index) =>{
    //   console.log(index);
    // })

    let data = [
      {
         created: '2017-02-21T09:50:21.441815Z',
         duration: 1575,
         final_script: 'some script',
         language: 'en-GB',
         rating: 2,
         url: 'some url',
          }
      ];
    console.log(data);
    //console.log(JSON.parse(snapshot.val()));
    data.map((anObjectMapped, index) => console.log(index))
  });
  
}



export default ParamsExample;