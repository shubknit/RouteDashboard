import React, { Component } from 'react';
import { googleMapsLoad } from '../../services/googlemap/googleMapAPI';

export class InputFieldAutoComplete extends Component {
    inputAutoComplete;
    inputElement;

    constructor(){
        super();
    }

    componentDidMount(){
        this.renderAutoComplete();
    }

    handleOnChange = (e) => {
        const userInput = e.target.value.trim();
        this.props.handleOnSelectAddress(userInput, this.props.inputName);
    }

    renderAutoComplete = async () => {
        const maps = await this.props.googleMapsLoad();
        const locationDetails = {};
        this.inputAutoComplete = new maps.places.Autocomplete(this.inputElement);
        this.inputAutoComplete.addListener('place_changed', ()=>{
            const place = this.inputAutoComplete.getPlace();
            if (place && place.geometry) {
                locationDetails.lat = place.geometry.location.lat();
                locationDetails.lng = place.geometry.location.lng();
                this.props.handleOnSelectAddress(locationDetails, this.props.inputName)
            }
        })
    }

    render(){
        return (
            <div>
                <label> {this.props.label} </label>
                <input className = 'text-input'
                    type="text" 
                    name={this.props.inputName}
                    ref={ elem => this.inputElement = elem }
                    onChange={this.handleOnChange}
                />
            </div>
        )
    }
}

InputFieldAutoComplete.defaultProps = {
    googleMapsLoad
}    
