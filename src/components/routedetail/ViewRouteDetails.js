import React from 'react';

// This component is display a route details or any error if found during API response
export const ViewRouteDetails = (props) => (
	<div className ="route-info">
		{ props.data.isFetching && <p>Loading...</p> }
        { props.data.mapData.distance && <p> total distance: { props.data.mapData.distance } </p> }
        { props.data.mapData.time && <p> total time: { props.data.mapData.time } </p> }
        { props.data.error && <p className = 'error'>  { props.data.error } </p> } 
	</div>
)