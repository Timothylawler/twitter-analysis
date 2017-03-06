import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Twitter text analysis</h2>
        </div>
        <div className="container">
				{
					this.props.children
				}
				</div>
      </div>
    );
  }
}

export default App;
