import React from "react";
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
        <ul>{props.name}    
        {<ChatListNameRoom userName={props.userName} userKey={props.userKey} dataRoom={props.dataRoom} />}       
        </ul>    
    )
}

var ChatListNameRoom = (props)=>{ 
    return(  
            Object.keys(props.dataRoom[0]).map((name, i) => 
                <NameRoom userName={props.userName} userKey={props.userKey} name={name}/>
            )
    )
}

var NameRoom = (props) => {
    let url = "/r/"+props.name+"/"+props.userName+"/"+props.userKey
    return (
      <li>
        <Link to={url}>{props.name}</Link>
      </li>   
    )
  }
  