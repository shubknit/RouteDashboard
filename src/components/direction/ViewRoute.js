import React, {Component} from 'react';

// This components is used to get the google map display on the dashboard page.
export class ViewRoute extends Component {
  constructor(){
    super();
    this.map = {};
    this.google = {};
  }
  componentDidMount(){
    this.renderMap();
  }

  componentDidUpdate(){
    if(this.props.data.status === 'success'){
      this.getDirectionsDisplay(this.map);
    }
    else {
      this.initMap();
    }
  }
  
  // Loading google map API url
  renderMap() {
    const googleAPIKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}&libraries=places&callback=initMap`);
    window.initMap = this.initMap;
  }

  // Placing script tag  script in DOM
  loadScript(url){
    let index = document.getElementsByTagName("script")[0];
    let script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
    
  }
  
  // Initializing Map
  initMap = () =>  {
    let { mapOptions } = this.props;
    this.google = window.google;
    this.map = new this.google.maps.Map(document.getElementById('map'), mapOptions);
    let  startInput = document.getElementById('start-point');
    var endInput = document.getElementById('end-point');
    new this.google.maps.places.Autocomplete(startInput);
    new this.google.maps.places.Autocomplete(endInput);
  }

  // Getting Route display on map 
  getDirectionsDisplay = (map) =>{
      const dataPoints = this.props.data.mapData;
      const [startLat, startLng] = dataPoints.start,
       [endLat, endLng] = dataPoints.end,
       [wayPointLat, wayPointLng] = dataPoints.waypoint;

      let directionsDisplay = new this.google.maps.DirectionsRenderer(),
       directionsService = new this.google.maps.DirectionsService();
      directionsDisplay.setMap(map);
      let destinationA = new this.google.maps.LatLng(startLat, startLng),
       destinationB = new this.google.maps.LatLng(endLat, endLng);
      let waypoint = [{
        location: new this.google.maps.LatLng(wayPointLat, wayPointLng), 
        stopover: true
      }];
      let request = {
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

ViewRoute.defaultProps = {
  mapOptions :{
    zoom: 10,
    center: {lat: 22.3964, lng: 114.1095 }
  }
}