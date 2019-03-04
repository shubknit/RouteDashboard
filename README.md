# Route Dashboard

A web application to draw route on google maps when user submit starting and drop off location

## Pre-Requisties

Backend [mockApi](https://github.com/lalamove/challenge/tree/master/mockApi) should be running on the system as a supporting API.

## Steps to configure the google map api key

1) Create a .env file in the root directory of the application
2) Create a new variable called 'REACT_APP_GOOGLE_MAP_API_KEY'
3) Assign your google map api key to the above variable, as shown below

```
REACT_APP_GOOGLE_MAP_API_KEY = <Google map api key>
```

## Steps to run app

```
npm install
npm start
```
// Access on http://localhost:3000/

## Tests

Run `npm test` to run the tests
