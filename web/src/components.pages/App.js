import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { checkAuth, demo } from '../utils/Authenticated';

// import { Provider } from 'react-redux';
// import store from './store';
// import jwt_decode from 'jwt-decode';
// import setAuthToken from './setAuthToken';
// import { setCurrentUser, logoutUser } from './actions/authentication';

// import Navbar from './components/Navbar';
// import Register from './components/Register';
// import Login from './components/Login';
// import Home from './components/Home';

// import 'bootstrap/dist/css/bootstrap.min.css';

// if(localStorage.jwtToken) {
  // setAuthToken(localStorage.jwtToken);
  // const decoded = jwt_decode(localStorage.jwtToken);
  // store.dispatch(setCurrentUser(decoded));

//   const currentTime = Date.now() / 1000;
//   if(decoded.exp < currentTime) {
//     store.dispatch(logoutUser());
//     window.location.href = '/login'
//   }
// }

class App extends Component {
  render() {
    return (
      // <Provider store = { store }>
        <Router>
            <div>
              {/* <Navbar /> */}
                <Route exact path="/" component={ Home } />                
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } /> 
                <PrivateRoute path="/protected" component={Protected} />
                {/* <Route path="*" component={NotFound} /> */}
            </div>
          </Router>
        // </Provider>
    );
  }
}

// if isAuthenticated: false goto login pages
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


const Protected = () => <h3>Protected</h3>;
const Home = () =>      <h3>Home</h3>;
const Register = () =>  <h3>Register</h3>;
const Login = () =>     <h3>Login</h3>;
// const NotFound = () =>  <h3>NotFound</h3>;

export default App;