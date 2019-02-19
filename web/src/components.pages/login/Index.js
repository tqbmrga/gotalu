import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPhone} from '@fortawesome/free-solid-svg-icons'

 
class Login extends Component {
    render() {
        return (
            <div>
				<h3>Sign In <FontAwesomeIcon icon={faPhone} /></h3>
				<div class="d-flex justify-content-end social_icon">
                
					
				</div>
                <div class="d-flex justify-content-end social_icon">
					<span><i class=" fa-facebook-square"></i></span>
					<span><i class="fab fa-google-plus-square"></i></span>
					<span><i class="fab fa-twitter-square"></i></span>
				</div>
			</div>
           
        );
    }
}
export default Login;