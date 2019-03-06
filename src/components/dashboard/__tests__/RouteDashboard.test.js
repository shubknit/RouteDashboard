import React from 'react';
import { RouteDashboard } from '../RouteDashboard';
import renderer from 'react-test-renderer';



it('should render the dashboard page correctly', () => {
    const wrapper = renderer.create(<RouteDashboard/>).toJSON();
    expect(wrapper).toMatchSnapshot();
})