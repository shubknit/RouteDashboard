import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

beforeAll(() => {
  const script = document.createElement('script');
  document.body.appendChild(script);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
