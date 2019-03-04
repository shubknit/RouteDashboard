import React, { Component } from 'react';
import { Header } from '../header/Header';
import { UserForm } from '../form/UserForm';
import  { ViewRoute }  from '../direction/ViewRoute';
import { getRouteDetails } from '../../services/mockAPI';
import { responseError } from '../../constants/apiConfig';

// This Component acts a dashboard which includes form and map view.
export class RouteDashboard extends Component {
	constructor() {
		super();
		this.state = {
			mapData : {},
			isFetching: false
		}
		this.addLocation = this.addLocation.bind(this);
	}

	async addLocation(data){
		const {start, end} = data;
		this.setState({
			isFetching: true
		})
		const response = await getRouteDetails(start, end).catch(e => {
			this.setState({
				mapData: {},
				status: responseError.status,
				error: responseError.error,
				isFetching: false
			})
		});
		if(response && response.error){
			this.setState({
				mapData: {},
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
				error: '',
				isFetching: false

			})
		}
	}
	
	render(){
		return (
			<div className = 'main-container'>
				<Header/>
				<div className = 'content'>
            <UserForm  addLocation = {this.addLocation} data = {this.state} />
					<div className = 'map-container'>
						<ViewRoute data = {this.state}/>
					</div>
				</div>
			</div>
		)
	}

}