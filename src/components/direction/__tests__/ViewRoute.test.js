import React from 'react';
import { ViewRoute } from '../ViewRoute';
import renderer from 'react-test-renderer';

beforeAll(() => {
  const script = document.createElement('script');
  document.body.appendChild(script);
})

it('should render the Map Component correctly', () => {
    const wrapper = renderer.create(<ViewRoute/>).toJSON();
    expect(wrapper).toMatchSnapshot();
})