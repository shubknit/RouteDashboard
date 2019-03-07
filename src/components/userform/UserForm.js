import React, { Component } from 'react';
import { ViewRouteDetails } from '../routedetail/ViewRouteDetails';
import { InputFieldAutoComplete } from  '../../shared/components/InputFieldAutoComplete';

export class UserForm extends Component {
    constructor(){
        super();
        this.state = {
            buttonText: 'Submit'
        };
    }
    
    // update states(startingLocation and DropOffPoint) on selecting the places from autocomplete
    handleOnSelectAddress = (locationDetail, name) => {
        this.setState({
            [name]: locationDetail,
        })
    }

    // Below method enables or disables the submit button
    enableSubmit = () => {
        const { startingLocation, dropOffPoint } = this.state;
         return startingLocation && dropOffPoint;
    }

    // handles when user click submit button
    submit = (e) => {
        const { startingLocation, dropOffPoint } = this.state;
        e.preventDefault();
        this.setState({
            buttonText: 'Re-Submit',
           
        })
        this.props.addLocation({
            start : startingLocation,
            end : dropOffPoint
        })
    }

    // handles when user click reset button
    resetForm = () => {
        this.setState({
            buttonText: 'Submit'
        })
        this.props.resetForm();
    }

    render(){
        return (
            <div className = 'form-container'>
                <form onSubmit = {this.submit} className = 'form'>
                    <InputFieldAutoComplete 
                        label="Starting location"
                        handleOnSelectAddress={this.handleOnSelectAddress}
                        inputName="startingLocation"
                    />
                    <InputFieldAutoComplete 
                        label="Drop-off point"
                        handleOnSelectAddress={this.handleOnSelectAddress}
                        inputName="dropOffPoint"
                    />
                    <ViewRouteDetails data = { this.props.data }/>
                    <div className = 'button-container'>
                    <button  className = 'button' type ="submit" disabled={!this.enableSubmit()}> {this.state.buttonText} </button>
                    <button className = 'button' type ="reset" onClick = {this.resetForm}> Reset </button>
                     </div>
                </form>
            </div>
        )
    }
   
}