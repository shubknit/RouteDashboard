import React, {Component} from 'react';
import { googleMapsLoad } from '../../services/googlemap/googleMapAPI';

// This components is used to get the google map display on the dashboard page.
export class ViewRoute extends Component {
  constructor(){
    super();
    this.map = {};
    this.google = {};
  }

  componentDidMount(){
    this.initMap();
  }

  componentDidUpdate(){
    if(this.props.data.status === 'success'){
      this.getDirectionsDisplay(this.map);
    }
    else {
      this.initMap();
    }
  }

  
  // Initializing Map
  initMap = async () =>  {
    const { mapOptions } = this.props;
    this.google = await googleMapsLoad();
    this.map = new this.google.Map(document.getElementById('map'), mapOptions);
  }

  // Getting Route display on map 
  getDirectionsDisplay = (map) =>{
      const dataPoints = this.props.data.mapData;
      const [startLat, startLng] = dataPoints.start,
       [endLat, endLng] = dataPoints.end,
       [wayPointLat, wayPointLng] = dataPoints.waypoint;

      const directionsDisplay = new this.google.DirectionsRenderer(),
       directionsService = new this.google.DirectionsService();
      directionsDisplay.setMap(map);
      const destinationA = new this.google.LatLng(startLat, startLng),
       destinationB = new this.google.LatLng(endLat, endLng);
      const waypoint = [{
        location: new this.google.LatLng(wayPointLat, wayPointLng), 
        stopover: true
      }];
      const request = {
        origin: destinationA,
        destination : destinationB,
        waypoints: waypoint,
        optimizeWaypoints: true,
        travelMode : 'DRIVING'
      }
      directionsService.route(request, function(result, status){
         if(status === 'OK'){
           directionsDisplay.setDirections(result);
         }
      })
  }

  render() {
    return(
      <div id = 'map'>
      </div>
    )
  }
}

// Map Default Props 
ViewRoute.defaultProps = {
  mapOptions :{
    zoom: 10,
    center: {lat: 22.3964, lng: 114.1095 }
  }
}