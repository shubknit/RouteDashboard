import React, { Component } from 'react';
import { Header } from '../header/Header';
import { UserForm } from '../form/UserForm';
import  { ViewRoute }  from '../direction/ViewRoute';
import { getRouteDetails } from '../../services/routeapi/RouteDetailsAPI';
import { responseError } from '../../constants/apiConfig';

// This Component acts a dashboard  which includes user form and map view.
export class RouteDashboard extends Component {
	constructor() {
		super();
		this.state = {
			mapData : {},
			isFetching: false
		}
  }
	// setstate when call turned into server error from API
	handleError = () => {
		this.setState({
			status: responseError.status,
			error: responseError.error,
			isFetching: false
		})
	}

	// set state when call get success from API
	handleResponse = (response) => {
		if(response && response.error){
			this.setState({
	  		status: response.status,
				error: response.error,
				isFetching: false
			})
		}
		else if(response && response.path){
			this.setState({
				mapData: {
					start: response.path[0],
					waypoint: response.path[1],
					end: response.path[2],
					distance: response.total_distance,
					time: response.total_time
				},
				status: response.status,
				isFetching: false
			})
		}
	}
  
  // callback when form submit is called with start and end point.	
  addLocation = async (data) => {
		const {start, end} = data;
		this.setState({
			mapData: {},
			error: '',
			status: '',
			isFetching: true,
		})
		const response = await getRouteDetails(start, end).catch(e => {
			this.handleError();
		});
		this.handleResponse(response);	
	}

	// Reset the map, form and button state when reset button is clicked
	resetPage = () => {
		this.setState({
			mapData : {},
			isFetching: false,
			error: '',
			status: ''
		})
	}
	
	render(){
		return (
			<div className = 'main-container'>
				<Header/>
				<div className = 'content'>
            <UserForm  addLocation = {this.addLocation} data = {this.state} resetForm = {this.resetPage} />
					<div className = 'map-container'>
						<ViewRoute data = {this.state}/>
					</div>
				</div>
			</div>
		)
	}

}