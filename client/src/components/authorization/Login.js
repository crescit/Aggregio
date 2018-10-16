import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames';
class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/main');
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/main');
        }

        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(user);
    };
    render() {

        const {errors} = this.state;

        return (<div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">
                            Log In
                        </h1>
                        <p className="lead text-center">
                            Sign in to your Aggregio Account
                        </p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input onChange={this.onChange} type="email" className={classnames("form-control form-control-lg", {
                                    'is-invalid': errors.email
                                })}  placeholder="Email Address" name="email"/>
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            </div>
                            <div className="form-group">
                                <input onChange={this.onChange} className={classnames("form-control form-control-lg", {
                                    'is-invalid': errors.password
                                })} type="password" placeholder="Password" name="password"/>
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {loginUser})(Login);
