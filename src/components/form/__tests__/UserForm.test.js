import React from 'react';
import { UserForm } from '../UserForm';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const data = {
    mapData: {
        distance: '200',
        time: 20
    }
}
const errorData = {
    mapData: {
      
    },
    error: 'location not accesbile'
}
const _startPoint = {
    value: ''
}
const _endPoint = {
    value: ''
}


it('should render the form correctly with distance and time', () => {
    const wrapper = renderer.create(<UserForm data = {data}/>).toJSON();
    expect(wrapper).toMatchSnapshot();
})

it('should render the error correctly', () => {
    const wrapper = renderer.create(<UserForm data = {errorData}/>).toJSON();
    expect(wrapper).toMatchSnapshot();
})

it('should submit form correctly', () => {
    const onSubmitSpy = jest.fn();
	const wrapper = shallow(<UserForm data = {data} addLocation = {onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
    	preventDefault: () => {}
    })
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
        start : _startPoint.value,
        end : _endPoint.value
	})
})