import React, { Component } from 'react';
import { ViewRouteDetails } from '../directionDetails/ViewRouteDetails';

export class UserForm extends Component {
    constructor(){
        super();
        this.state = {
            buttonText: 'Submit'
        };
        this._startPoint = {
            value: ''
        };
        this._endPoint = {
            value: ''
        };
    }
    submit = (e) => {
        e.preventDefault();
        this.setState({
            buttonText: 'Re-Submit'
        })
        this.props.addLocation({
            start : this._startPoint.value,
            end : this._endPoint.value
        })
    }

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
                    <label htmlFor = 'start-point'> Starting Location </label>
                    <input type ="text" id ="start-point" placeholder ='start point' className = 'text-input' 
                    ref = { input => this._startPoint = input  } required/>
    
                    <label htmlFor = 'end-point'> Drop-off point</label>
                    <input type ="text" id ="end-point" placeholder ='end point' className = 'text-input'
                    ref = { input => this._endPoint = input } required/>
                    <ViewRouteDetails data = { this.props.data }/>
                    <div className = 'button-container'><button  className = 'button' type ="submit"> {this.state.buttonText} </button>
                        <button className = 'button' type ="reset" onClick = {this.resetForm}> Reset </button>
                     </div>
                    </form>
            </div>
        )
    }
   
}