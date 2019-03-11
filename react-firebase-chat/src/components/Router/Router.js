import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from '../Form/Form.js';
import ChatListLayout from '../ChatListLayout/ChatListLayout.js';
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
      //console.log(dataChatlist)
      //console.log(dataChatRoom)
    })
  } 
  render() {
    return (
      <Router>
        <div>
          <h2>
              demo
          </h2>
          <Route path="/r/:room/:userName/:userKey" component={ChildChatListLayout} />

          <Route path="/r/:room/:userName/:userKey" component={Child} />
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

var ChildChatListLayout = ({ match }) => (
  <div>    
    <ChatListLayout params={match.params} />
  </div>
);

