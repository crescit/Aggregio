import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';


class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false
        }
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.setState({auth: true});
        }
    };
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        let NavItems;
        if(this.state.auth === false){
            NavItems = (<div>
                 <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Aggregio</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar><NavItem>
                <NavLink href="/register">Sign Up</NavLink>
            </NavItem>
                <NavItem>
                    <NavLink href="/login">Login</NavLink>
                </NavItem></Nav>
             </Collapse>
            </Navbar></div>);
        }else{
            NavItems = (<div>
                 <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Aggregio</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar><NavItem>
                <NavLink href="/settings">Settings</NavLink>
            </NavItem>
                <NavItem>
                    <NavLink href="/logout">Logout</NavLink>
                </NavItem></Nav>
             </Collapse>
            </Navbar></div>);
        }

        return(<div>


                        {NavItems}


        </div>);
    }
}
NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps)(NavigationBar);