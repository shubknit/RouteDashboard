import React from 'react';
import { RouteDashboard } from '../RouteDashboard';
import renderer from 'react-test-renderer';

beforeAll(() => {
    const script = document.createElement('script');
    document.body.appendChild(script);
})

it('should render the dashboard page correctly', () => {
    const wrapper = renderer.create(<RouteDashboard/>).toJSON();
    expect(wrapper).toMatchSnapshot();
})