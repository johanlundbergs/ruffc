import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locationArray: [],
            location: ''
        }
        this.getUserInput = this.getUserInput.bind(this);
    }

    getUserInput = (e) => {
        e.preventDefault();
        const searchLocation = document.getElementById("searchId").value;
        console.log(searchLocation);
        this.props.setLocation(searchLocation);

    }

    render() {
        return (
            <div>
                <form role="search" autoComplete="off">
                    <input id="searchId" className="searchBar" type="search" name="searchField" placeholder="Gotlandic locations only"></input>
                    <button onClick={this.getUserInput} value="submit" className="searchButton"><i class="fa fa-search"></i></button>
                </form>
            </div>
        )
    }


}

export default Search;