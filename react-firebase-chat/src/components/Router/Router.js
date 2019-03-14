import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form from '../Form/Form.js';
import ChatListLayout from '../ChatListLayout/ChatListLayout.js';
import firebase from 'firebase';

import { Col,Container,Row } from 'react-bootstrap';


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
          <Container>
          <div> APP </div>
              <Row>
                <Col sm={2}>
                  <Route path="/r/:room/:userID/:userKey" component={ChildChatListLayout} /> 
                </Col>    
                <Col sm={10}>
                  <Route path="/r/:room/:userID/:userKey" component={Child} />
                </Col>   
              </Row>              
          </Container>        
      </Router>
    );
  }
}

var Child = ({ match }) => (      
      <Form params={match.params} />     
);

var ChildChatListLayout = ({ match }) => (      
      <ChatListLayout params={match.params} />   
);

