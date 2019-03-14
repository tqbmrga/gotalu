import React from "react";
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./ChatListLayout.css";

export default class ChatListLayout extends React.Component {
    constructor(props) {
      super(props)  
      this.state = {
        dataChatlist : [],
        dataChatRoom : [],
        userID: props.params.userID,
        userKey:props.params.userKey,
      }
    }
    componentWillMount() {  
      let ref = firebase.database().ref('roomlist/'+this.state.userID)      
      var query = ref.orderByKey()       
      query.once("value").then((snapshot) =>{  
        let dataChatRoom = []
        snapshot.forEach(function(childSnapshot) {
          dataChatRoom.push([childSnapshot.val()])
        })
        this.setState({          
          dataChatRoom: dataChatRoom
        });      
      })
    } 
    render() {
      return (
        <div>
            {   
              this.state.dataChatRoom.map((data,i)=>
                  <ChatList i={i} 
                  data={data}
                  userID={this.state.userID} 
                  userKey={this.state.userKey}
                  />
                )                 
            }
        </div>
      )
    }
}

var ChatList = (props) => { 
    let url = "/r/"+props.data[0].roomID+"/"+props.userID+"/"+props.userKey
  return (    
      <div class="chatListItem">              
          <Link to={url}>{props.data[0].nameRoom}</Link>    
      </div>    
  )
}
