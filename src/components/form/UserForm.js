import React, { Component } from 'react';

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
                    {this.props.data.isFetching && <p>Loading...</p>}
                    {this.props.data.mapData.distance && <p> total distance: {this.props.data.mapData.distance} </p>}
                    {this.props.data.mapData.time && <p> total time: {this.props.data.mapData.time} </p>}
                    {this.props.data.error && <p className = 'error'>  {this.props.data.error} </p>}
                    <div className = 'button-container'><button  className = 'button' type ="submit"> {this.state.buttonText} </button>
                        <button className = 'button' type ="reset"> Reset </button>
                     </div>
                    </form>
            </div>
        )
    }
   
}