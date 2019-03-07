import axios from 'axios';
import { getTokenFromAPI, getRoute, getRouteDetails } from '../RouteDetailsAPI';

const token = 'abc';
const responseToken = {
    token: 'abc'
}
const failureResponse = {
    status: "failure",
    error: "Location not accessible by car"
}
const requestInput = {
    start: '1',
    end: '2'
}
const successResponse = {
    status: "success",
    path: [
      ["22.372081", "114.107877"],
      ["22.326442", "114.167811"],
      ["22.284419", "114.159510"]
    ],
    total_distance: 20000,
    total_time: 1800
}

const internalServerErrorResponse = {
    status : 500,
    error : 'Internal Server error'
}

const errorMessage = 'Internal Server Error';

const inProgressResponse = {
    status: 'In Progress'
} 

// function to calculate random number  between two numbers 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const responseOb = { 
    data: {
        status: null
    }
};



it('check if getTokenFromAPI get token value from response ', async () => {
    const spy = jest.spyOn(axios, 'post');
    spy.mockImplementation(() => 
        Promise.resolve({ data : responseToken })
    )
    const response = await getTokenFromAPI(requestInput.start, requestInput.end);
    expect(response).toBe(token); 
    spy.mockRestore();
});

it('check if getRoute get route details from response' , async () => {
    const spy = jest.spyOn(axios, 'get');
    spy.mockImplementation(() => 
        Promise.resolve({ data : successResponse })
    )
    const response = await getRoute(token);
    expect(response.status).toEqual('success');
    expect(response.total_distance).toEqual(20000);
    expect(response.total_time).toEqual(1800);
});

it('check if getRoute get failure error from response' , async () => {
    const spy = jest.spyOn(axios, 'get');
    spy.mockImplementation(() => 
        Promise.resolve({ data : failureResponse })
    )
    const response = await getRoute(token);
    expect(response.status).toEqual('failure');
    expect(response.error).toEqual('Location not accessible by car');
});

it('check if getRoute get internal server error from response' , async () => {
    const spy = jest.spyOn(axios, 'get');
    spy.mockImplementation(() => 
        Promise.resolve({ data : internalServerErrorResponse })
    )
    const response = await getRoute(token);
    expect(response.status).toEqual(500);
    expect(response.error).toEqual('Internal Server error');
});


it('check if getRoute get in progress from response' , async () => {
    const spy = jest.spyOn(axios, 'get');
    spy.mockImplementation(() => 
        Promise.resolve({ data : inProgressResponse })
    )
    const response = await getRoute(token);
    expect(response.status).toEqual('In Progress');
});


it("Whether recusion occurs on 'in progress' state", async () => {
    let callCount = 0;
    const postService = jest.spyOn(axios, 'post');
    const getService = jest.spyOn(axios, 'get');
  
    getService.mockImplementation(() => {
        const apiBehaviour = getRandomInt(0, 4);
        if (apiBehaviour === 0) {
            responseOb.data.status = 500;
        } else if (apiBehaviour === 1) {
            responseOb.data.status = 'in progress'; // Should cause recursions
        } else if (apiBehaviour === 2) {
            responseOb.data.status = 'failure';
        } else {
            responseOb = Object.create(successResponse); 
        }
        return Promise.resolve(responseOb);
    })

    postService.mockImplementation(() => {
        const apiBehaviour = getRandomInt(0, 1);
        callCount++;
        if (apiBehaviour === 0)
         return Promise.reject(errorMessage); // for Internal server error
        else
         return  Promise.resolve({data: responseToken});
    });

    const res = await getRouteDetails(requestInput.start, requestInput.end).catch((errormsg) => {
        expect(errormsg).toBe(errorMessage); // Should match when got internal server error
        expect(postService).toHaveBeenCalledTimes(callCount);
    });

    expect(postService).toHaveBeenCalledTimes(callCount);

    postService.mockRestore();
    getService.mockRestore();

})





