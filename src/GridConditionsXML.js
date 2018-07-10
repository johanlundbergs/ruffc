import React, { Component } from 'react';
import './main.css';

class GridConditionsXML extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locationArray: ['Visby', 'Tofta', 'Östergarn', 'Fårösund', 'Klintehamn', 'Hoburg'],
            filledArray: [],
            colors: ['#98d700', '#B000B5', '#76D7EA', '#5DADEC', '#FF7A00', '#FF3855'],
            loaded: false
        }
        this.createGrid = this.createGrid.bind(this);
    }

    componentDidMount = () => {
        this.createGrid();
    }

    createGrid = () => {
        const self = this;
        const tempArr = [];
        const locationArr = self.state.locationArray;
        for (let i = 0; i < locationArr.length; i++) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    const xmlDoc = this.responseXML;
                    const windspeed = xmlDoc.getElementsByTagName('windSpeed')[0].getAttribute('mps');
                    const windtype = xmlDoc.getElementsByTagName('windSpeed')[0].getAttribute('name');
                    const winddirection = xmlDoc.getElementsByTagName('windDirection')[0].getAttribute('name');;
                    const airtemp = xmlDoc.getElementsByTagName('temperature')[0].getAttribute('value');
                    tempArr.push({
                        name: locationArr[i],
                        windspeed: windspeed,
                        winddirection: winddirection,
                        windtype: windtype,
                        airtemp: airtemp
                    })
                }
            };
            xhttp.open("GET", `http://www.yr.no/place/Sweden/Gotland/${locationArr[i]}/forecast_hour_by_hour.xml`, true);
            xhttp.send();
        }
        self.setState({
            filledArray: tempArr
        })
    }

    /*Since render() fires as soon as the component is loaded,
     this function prevents the array from returning empty.
     2000ms is just for show, 400ms is plenty.
     THIS IS VERY IMPORTANT DO NOT REMOVE*/
    reLoader = () => {
        setTimeout(() => {
            if (this.state.filledArray.length === this.state.locationArray.length) {
                this.setState({
                    loaded: true
                })
            }
        }, 2000);
    }
    render() {
        const filledArray = this.state.filledArray
        if (this.state.filledArray.length === this.state.locationArray.length) {
            const data = [];
            for(let i=0; i<filledArray.length; i++){
                var spanStyle = {
                    color: this.state.colors[i]
                }
                data.push(<div key={i} className="grid-item">
                    <p className="normal">Name: <span style={spanStyle} className="fatData">{filledArray[i].name}</span></p>
                    <p className="normal">Velocity: <span style={spanStyle} className="fatData">{filledArray[i].windspeed}m/s</span></p>
                    <p className="normal">Direction: <span style={spanStyle} className="fatData">{filledArray[i].winddirection}</span></p>
                    <p className="normal">Type: <span style={spanStyle} className="fatData">{filledArray[i].windtype}</span></p>
                    <p className="normal">Temperature: <span style={spanStyle} className="fatData">{filledArray[i].airtemp}°</span></p>
                </div>);
            }
            return (
                data
            );
        }
        else {
            return (
                <div> You can display spinner/ Show some waiting msg{this.reLoader()}</div>
            );
        }
    }
}

export default GridConditionsXML;

