import axios from 'axios';
import { MockAPIDetails, MockAPIStatus } from '../constants/apiConfig';

// Get token from API
const getTokenFromAPI = async (start, end) => {
    const URL = MockAPIDetails.baseURL + MockAPIDetails.route;
    const response = await axios.post(URL, {start,end});
    return response.data.token
}

// Get Route details from API using token
const getRoute = async (token) => {
    const URL = MockAPIDetails.baseURL + MockAPIDetails.route + "/" + token;
    const response = await axios.get(URL);
    return response.data
}

// Calling API again when server is busy
export const getRouteDetails = async (start, end) => {
    const token = await getTokenFromAPI(start, end);
    let response = await getRoute(token);
    if(response && response.status === MockAPIStatus.status){
        response = await getRouteDetails(start, end);
    }
    return response;
}
