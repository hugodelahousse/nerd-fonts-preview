import React, { Component } from 'react';
import './App.css';
import Fonts from './Fonts'

class App extends Component {
  render() {
    return (
      <div className="App" style={{fontFamily: 'Test'}}>
        <Fonts/>
      </div>
    );
  }
}

export default App;
