import React, { Component } from 'react';
import logo from './twitter.png';
import './App.css';

import Twitter from './templates/twitter/twitter.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
          <h2>TWITTER TEXT ANALYSIS</h2>
        </div>
        <div className="container">
				
				{
					this.props.children || <Twitter />
				}
				</div>
      </div>
    );
  }
}

export default App;
