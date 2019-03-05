import GoogleMapsLoader from 'google-maps';

const googleAPIKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

// The below method checks if the google maps API key is configured in .env file
const checkIfGoogleApiKeyAvailable = () => {
    if(!googleAPIKey) {
        alert("Google API key not found, please refer readme.md for more information!!");
    } else {
        GoogleMapsLoader.KEY = googleAPIKey;
    }
}

// This method is used to initialize google maps with settings
const initializeGoogleMapSettings = () => {
    checkIfGoogleApiKeyAvailable();
    
    GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];    
}

initializeGoogleMapSettings();

let google;

// The below method is loading google map library
const loadMap = () => 
    new Promise((resolve, reject) => {
        if (google) {
            resolve(google);
        } else {
            GoogleMapsLoader.load(api => {
                google = api;
                resolve(api);
            });
        }
    });

export const googleMapsLoad = async () => {
    const google = await loadMap();
    return google.maps;
};