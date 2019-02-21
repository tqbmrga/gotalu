import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHome, faPhone} from '@fortawesome/free-solid-svg-icons'

class Login extends Component {    
    constructor() {
        super();    
        this.state = {chats: []};
    }
    
    componentDidMount() {
        fetch('http://localhost:8001/products')
        .then(response =>  response.json())
        .then(resData => {
           console.log(JSON.stringify(resData))
           //do your logic here       
           //let person = resData.results
           this.setState({ chats: resData.results }); //this is an asynchronous function
        })
    }
    
    render(){
    
      return(
      <div>
        { 
          this.state.chats.map((chatRecord) => {
            return <div> {chatRecord.name} </div>
          })
        }
      </div>
      )
    }
}
export default Login;

//set up html
let loginForm = (
    <Form>
        <h3>login</h3>
        <FormGroup>
          <Label for="exampleEmail" hidden>Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
          <FormFeedback>You will not be able to see this</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        {' '}
        <FormGroup>
          <Label for="examplePassword" hidden>Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Password" />
        </FormGroup>
        {' '}
        <Button>Login</Button>        
        <Button>Register</Button>
        <Button>Forgot</Button>
      </Form>
   
  );

  
