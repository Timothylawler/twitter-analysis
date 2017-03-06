import React, { Component } from 'react';
import '../../App.css';
import SearchBar from './searchBar.jsx';
import Tweets from './tweets.jsx';



class twitterSignIn extends Component {
	
	
  render() {
    return (
      <div className="row">
				<div className="col-sm-12">
					<SearchBar />
				</div>
				<div className="col-sm-12">
					<Tweets />
					
				</div>
				
      </div>
    );
  }
}

export default twitterSignIn;
