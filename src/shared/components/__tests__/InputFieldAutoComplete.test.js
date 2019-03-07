import React from 'react';
import { InputFieldAutoComplete } from '../InputFieldAutoComplete';
import renderer from 'react-test-renderer';


it('should render the InputFieldAutoComplete  correctly', () => {
    const wrapper = renderer.create(<InputFieldAutoComplete label = 'start' name = 'start'/>).toJSON();
    expect(wrapper).toMatchSnapshot();
})