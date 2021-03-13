import React, { Component } from 'react';
//import {Footer} from './components/navbar';

class App extends Component {
  render() {
    return (
      <div className="content" id="content">
        {this.props.children}
      </div>
    );
  }
}

export default App;