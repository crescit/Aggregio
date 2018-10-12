import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {registerUser} from "../actions/authActions";
import {connect} from 'react-redux';

class Register extends Component {
    constructor(){
        super();
        this.state  = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }
    onChange = (e) => {
        this.setState({
           [e.target.name]:e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(user, this.props.history);
    }
    render(){
        return(<div><h1>Register</h1></div>);
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {registerUser})(withRouter(Register));