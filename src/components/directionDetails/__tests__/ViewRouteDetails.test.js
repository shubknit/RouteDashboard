import React from 'react';
import { ViewRouteDetails } from '../ViewRouteDetails';
import renderer from 'react-test-renderer';


const state = {
    mapData:  {
        distance: '',
         time: ''
    },
    isFetching: '',
    error: '',
}

it('should render the ViewRouteDetails correctly', () => {
    const wrapper = renderer.create(<ViewRouteDetails data = { state }/>).toJSON();
    expect(wrapper).toMatchSnapshot();
})