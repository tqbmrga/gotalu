import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from '../Form/Form.js';
import firebase from 'firebase';

const ParamsExample = () => (
  <Router>
    <div>
      <h2>Room List <ChatList /> </h2>
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
)

export default ParamsExample;

var Child = ({ match }) => (
  <div>    
    <Form params={match.params} />
  </div>
);

// class GroupName extends React.Component {
//   render() {
//     return <div>{this.props.name}</div>;
//   }
// }

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlRes: []
      };
  }
  componentDidlMount () {
    alert('component just finished mounting!');
  }
  componentWillMount() {
   
    let rootRef = firebase.database().ref()
    let ref = rootRef.child('roomlist').child('baoat1ts')
    let data = []
    var query = ref.orderByKey();
    
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          let key = childSnapshot.key
          //this.state.htmlRes.push(<div>{key}</div>)
          data.push(<div>{key}</div>)
          
          //htmlRes.push(<GroupName name={key} />)
          // childData will be the actual contents of the child
          //var childData = childSnapshot.val()
          
      });
    });     
    
    this.state.htmlRes=data
    console.log(data);
    //this.state.htmlRes.push(<div>demo</div>)
    //console.log(this.state.htmlRes)

    // this.setState({
    //   htmlRes: htmlRes
    // });

  }
  render() {   
    var links = [
      { endpoint: '/america' },
      { endpoint: '/canada' },
      { endpoint: '/norway' },
      { endpoint: '/bahamas' }
    ];
    const listItems = links.map((link) =>
        <li key={link.endpoint}>{link.endpoint}</li> 
    );
    return (
      <div className="navigation">
        <ul>
          {this.state.htmlRes}
          {listItems}
        </ul>
      </div>
    );
  }
}

