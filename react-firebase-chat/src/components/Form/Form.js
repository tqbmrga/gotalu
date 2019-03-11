import React, { Component } from 'react';
import './Form.css';
import Message from '../Message/Message';
import firebase from 'firebase';

export default class Form extends Component {
  constructor(props) {    
    super(props);
    this.state = {
      room: props.params.room,
      userName: props.params.userName,
      userKey:props.params.userKey,
      message: '',
      list: [],
    };      
  }
  componentWillReceiveProps(nextProps) {    
    this.messageRef = firebase.database().ref().child('messages').child(nextProps.params.room);
    this.listenMessages();
  }
  handleChange(event) {
    this.setState({message: event.target.value});
  }
  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }
  listenMessages() {   
    this.messageRef
      .limitToLast(10)
      .on('value', message => {
        let msg = '';
        if(message.val()!=null)
        {
          msg = message.val();
        }
        this.setState({
          list: Object.values(msg),
        });
      });
  }
  render() {    
    return (      
      <div className="form">
      
        <div className="form__message">
          { 
            this.state.list.map((item, index) => <Message key={index} message={item} /> ) 
          }
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button
            className="form__button"
            onClick={this.handleSend.bind(this)}
          >
            send
          </button>
        </div>
        <div> </div>
      </div>
    );
  }
}
