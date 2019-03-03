import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from '../Form/Form.js';
import firebase from 'firebase';

export default class MainRouter extends React.Component {
  constructor(props) {
    super(props)  
    this.state = {
      dataChatlist : [],
      dataChatRoom : []
    }    
  }
  componentWillMount() {  
    let ref = firebase.database().ref('roomlist/baoat1ts')    
    var query = ref.orderByKey();    
    query.once("value").then((snapshot) =>{   
      let dataChatlist = []
      let dataChatRoom = []
      snapshot.forEach(function(childSnapshot) {
        dataChatlist.push([childSnapshot.key])  
        dataChatRoom.push([childSnapshot.val()])
      })
      this.setState({
        dataChatlist: dataChatlist,
        dataChatRoom: dataChatRoom
      });
    })
  } 
  render() {        
    return (
      <Router>
        <div>
          <h2>
          {
            //call tới class ChatList
            //truyền biến dataChatRoom qua sau đó loop tiếp.
            this.state.dataChatlist.map(
              (name, i) => 
              <ul key={i}>{name}
                <li>room1</li>
                <li>room2</li>
              </ul>
            )           
          }
          </h2>
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
  }

}



var Child = ({ match }) => (
  <div>    
    <Form params={match.params} />
  </div>
);
