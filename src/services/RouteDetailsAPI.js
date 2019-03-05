import axios from 'axios';
import { routeApiDetails, routeApiStatus } from '../constants/apiConfig';

// Get token from API
const getTokenFromAPI = async (start, end) => {
    const URL = routeApiDetails.baseURL + routeApiDetails.route;
    const response = await axios.post(URL, {start,end});
    return response.data.token
}

// Get Route details from API using token
const getRoute = async (token) => {
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
