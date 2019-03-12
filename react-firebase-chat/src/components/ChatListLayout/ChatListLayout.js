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
        userName: props.params.userName,
        userKey:props.params.userKey,
      }
    }
    componentWillMount() {  
      let ref = firebase.database().ref('roomlist/'+this.state.userName)
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
        <div>
            {         
                this.state.dataChatlist.map((name, i) => 
                <ChatList i={i} name={name} userName={this.state.userName} userKey={this.state.userKey} dataRoom={this.state.dataChatRoom[i]}/>
                )
            }
        </div>
      )
    }
}

var ChatList = (props) => { 
    return (    
        <div class="chatList">
            <div>{props.name}</div>
            {<ChatListNameRoom userName={props.userName} userKey={props.userKey} dataRoom={props.dataRoom} />}      
        </div>    
    )
}

var ChatListNameRoom = (props)=>{ 
    //console.log(props.dataRoom[0].room1)
    return(  
            Object.keys(props.dataRoom[0]).map((name, i) =>                 
                <NameRoom 
                userName={props.userName} 
                userKey={props.userKey} 
                room={name} 
                roomData={props.dataRoom[0]}
                />
            )
    )
}

var NameRoom = (props) => {
   let room = props.room
    let url = "/r/"+props.room+"/"+props.userName+"/"+props.userKey
    //let chatTo = Object.keys(props.roomData);  
    return ( 
        <div> 
            <Link to={url}>{props.roomData[room].nameRoom}</Link>  
        </div>       
    )
  }
  