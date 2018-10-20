import React, {Component} from 'react';
import {
    InputGroup,
    InputGroupButtonDropdown,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
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
            filter: 'track'
        };
        this.handleKey = this.handleKey.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
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
            this.props.history.push(`/searchresults`, [{term: this.state.value}, {filter: this.state.filter}]);
        }
    }
    handleFilter(filter){
        this.setState({filter: filter});
    }
    render(){
        return(<div><InputGroup>
            <InputGroup >
                <Input  onKeyDown={this.handleKey} onChange={this.handleChange} value={this.state.value} placeholder="Search for music"/>
                <InputGroupButtonDropdown  addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                    <DropdownToggle caret>
                        Filter By (current: {this.state.filter})
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem header>Filters</DropdownItem>
                        <DropdownItem onClick={() => this.handleFilter('track')}>Track</DropdownItem>
                        <DropdownItem onClick={() => this.handleFilter('artist')}>Artist</DropdownItem>
                        <DropdownItem onClick={() => this.handleFilter('album')}>Album</DropdownItem>
                    </DropdownMenu>
                </InputGroupButtonDropdown>
            </InputGroup>
        </InputGroup></div>);
    }
}
export default withRouter(SearchBar);