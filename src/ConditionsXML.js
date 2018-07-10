import React, { Component } from 'react';
import './main.css';

class ConditionsXML extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: '',
            windspeed: '',
            winddirection: '',
            windtype: '',
            airtemp: ''
        }
        this.startXML = this.startXML.bind(this);
        //this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    }

    componentDidMount = () => {
        this.startXML();
    }

    componentWillReceiveProps = (newprops) => {
        this.startXML(newprops.location);
    }

    startXML = (location) => {
        var xhttp = new XMLHttpRequest();
        const self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const xmlDoc = this.responseXML;
                const windSpeed = xmlDoc.getElementsByTagName('windSpeed')[0];
                const windspeed = windSpeed.getAttribute('mps');
                const windDirection = xmlDoc.getElementsByTagName('windDirection')[0];
                const winddirection = windDirection.getAttribute('name');
                const windtype = windSpeed.getAttribute('name');
                const airtemp = xmlDoc.getElementsByTagName('temperature')[0].getAttribute('value');
                console.log(windspeed);
                self.setState({
                    windspeed: windspeed,
                    winddirection: winddirection,
                    windtype: windtype,
                    airtemp: airtemp
                })
            }
        };
        xhttp.open("GET", `http://www.yr.no/place/Sweden/Gotland/${location || this.props.location}/forecast_hour_by_hour.xml`, true);
        xhttp.send();
    }

    /*capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }*/

    render() {
        //const a = this.capitalizeFirstLetter(this.props.location);
        return (
            <div>
                <p className="normal">Location: <span className="fatData">{this.props.location}</span></p>
                <p className="normal">Velocity: <span className="fatData">{this.state.windspeed}m/s</span></p>
                <p className="normal">Direction: <span className="fatData">{this.state.winddirection}</span></p>
                <p className="normal">Type: <span className="fatData">{this.state.windtype}</span></p>
                <p className="normal">Temperature: <span className="fatData">{this.state.airtemp}°</span></p>
            </div>
        )
    }
}

export default ConditionsXML;