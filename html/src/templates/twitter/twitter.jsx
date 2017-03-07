import React, { Component } from 'react';
import '../../App.css';
import SearchBar from './searchBar.jsx';
import Tweets from './tweets.jsx';
import axios from 'axios';

import update from 'react-addons-update';

const baseUrl = "http://localhost:3000"

const styles ={
	content: {
		marginTop: 32,
	}
}

class twitterSignIn extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			tweets: {
				metadata: {},
				tweetList: [],
			},
			tweetsUpdateKey: Math.random()
		}
	}
	
	sendTweetRequest(data){
		let self=this;
		var params = {};
		console.log(data.search);
		if(data !== undefined && data.search.searchTerm != undefined){
			params.search = data.search.searchTerm;
			if(data.search.searchFrom !== undefined){
				params.from = data.search.searchFrom;
			}
			if(data.search.searchTo !== undefined){
				params.to = data.search.searchTo
			}
			
			axios.get("http://localhost:4000/twitter/search", {params})
				.then(function(res){
					//self.setState({tweets: res.data});
					self.setState({ tweets: update(self.state.tweets, {$set: res.data}) });
				
					/* Generate a new key for the tweet objects to force it to update */
					self.setState({ tweetsUpdateKey: Math.random()});
				})
				.catch(function(error){
					console.log(error);
				});
			
		}
	}
	
	updateSearchValue(evt){
		this.setState({
			search: update(this.state.search,{searchTerm: {$set: evt.target.value}})
		});
	}
	
  render() {
		
		
    return (
      <div className="row">
				<div className="col-sm-12">
					<SearchBar analyseOnClick={this.sendTweetRequest.bind(this)}/>
				</div>
				<div className="col-sm-12" style={styles.content}>
					{
						this.state.tweets.tweetList.length > 0 &&
						<Tweets key={this.state.tweetsUpdateKey} tweetData={this.state.tweets.tweetList}/>
					}
					
				</div>
				
      </div>
    );
  }
}

export default twitterSignIn;
