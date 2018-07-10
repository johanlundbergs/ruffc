import React, { Component } from 'react';
import './main.css';
import './ConditionsXML';
//import Search from './Search.js';
//import ConditionsXML from './ConditionsXML';
import GridConditionsXML from './GridConditionsXML';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Östergarn'
    }
  }
  /*
  FÖR SÖK
  <div className="searchContainer">
        <Search setLocation={location => { this.setState({ location }) }} />
        <ConditionsXML location={this.state.location} />
  </div>
  */
  render() {
    return (
      <div className="rootContainer">
        <div className="container">
          <div className="grid-container">

            <GridConditionsXML />

          </div>
          

        </div>
      </div>
    );
  }
}

export default App;
