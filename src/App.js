import React, { Component } from 'react';
import './styles/index.scss';
import { RouteDashboard } from './components/dashboard/RouteDashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
       <RouteDashboard/>
      </div>
    );
  }
}

export default App;
