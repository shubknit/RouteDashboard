import axios from 'axios';
import { routeApiDetails, routeApiStatus } from '../../constants/apiConfig';

// Get token from API
export const getTokenFromAPI = async (origin, destination) => {
    const URL = routeApiDetails.baseURL + routeApiDetails.route;
    const response = await axios.post(URL, {origin,destination});
    return response.data.token
}

// Get Route details from API using token
export const getRoute = async (token) => {
    const URL = routeApiDetails.baseURL + routeApiDetails.route + "/" + token;
    const response = await axios.get(URL);
    return response.data
}

// Calling getTokenFromAPI & getRoute in sequence
export const getRouteDetails = async (start, end) => {
    const token = await getTokenFromAPI(start, end);
    let response = await getRoute(token);
    // Following recursion on getRouteDetails when response status is in progress
    if(response && response.status === routeApiStatus.inProgress){
        response = await getRouteDetails(start, end);
    }
    return response;
}
