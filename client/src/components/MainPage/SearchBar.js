import React, {Component} from 'react';
import {
    InputGroup,
    Input,
} from 'reactstrap';
import {withRouter} from 'react-router-dom';


class SearchBar extends Component{
    constructor(props) {
        super(props);
        this.state = {text: ""};
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleSplit = this.toggleSplit.bind(this);
        this.term = "";
        this.state = {
            dropdownOpen: false,
            splitButtonOpen: false,
            value: '',
        };
        this.handleKey = this.handleKey.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleSplit() {
        this.setState({
            splitButtonOpen: !this.state.splitButtonOpen
        });
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleKey(e){
        if(e.keyCode === 13){
            this.handleSubmit(e);
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.value === ""){
            return;
        }else {
            this.props.history.push(`/searchresults`, [{term: this.state.value}]);
        }
    }
    render(){
        return(<div><InputGroup>
            <InputGroup >
                <Input  onKeyDown={this.handleKey} onChange={this.handleChange} value={this.state.value} placeholder="Search for music"/>
            </InputGroup>
        </InputGroup></div>);
    }
}
export default withRouter(SearchBar);