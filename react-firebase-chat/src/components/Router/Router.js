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

var Child = ({ match }) => (
  <div>    
    <Form params={match.params} />
  </div>
);

var RoomList = () => {  

  let rootRef = firebase.database().ref()
  let ref = rootRef.child('roomlist').child('baoat1ts')
  let htmlRes = [];
  ref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let key = childSnapshot.key
      //let childData = childSnapshot.val()
      htmlRes.push(<div>Column {key}</div>)
      // console.log(key)
      // console.log(childData)
    })
    // console.log('snapshot.val()')
    // console.log(snapshot.val())
  })
  
    // const elements = ['one', 'two', 'three'];
  
    // const items = []
  
    // for (const [index, value] of elements.entries()) {
    //   items.push(<li key={index}>{value}</li>)
    // }
  
    return (htmlRes)
}

  // let rootRef = firebase.database().ref()
  // let ref = rootRef.child('roomlist').child('baoat1ts')
  // let htmlRes = [];
  // ref.once("value").then(function(snapshot) {
  //   snapshot.forEach(function(childSnapshot) {
  //     let key = childSnapshot.key
  //     //let childData = childSnapshot.val()
  //     htmlRes.push(<div>Column {key}</div>)
  //     // console.log(key)
  //     // console.log(childData)
  //   })
  //   console.log('snapshot.val()')
  //   console.log(snapshot.val())
  // })
 
  // console.log('htmlRes')
  // console.log(htmlRes)
  // return (htmlRes)
  //render() { }



export default ParamsExample;