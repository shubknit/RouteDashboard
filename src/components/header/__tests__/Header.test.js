import React from 'react';
import { Header } from '../Header';
import renderer from 'react-test-renderer';


it('should render the header correctly', () => {
    const wrapper = renderer.create(<Header/>).toJSON();
    expect(wrapper).toMatchSnapshot();
})