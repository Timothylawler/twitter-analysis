import React, { Component } from 'react';
import '../../App.css';
import Tweet from './tweet.jsx';

import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "100%",
    height: "100%",
    overflowY: 'auto',
  },
	
};

class Tweets extends Component {
	constructor(props){
		super(props);
		this.state= {
			tweets: props.tweetData
		}
		console.log("TWEETS CONSTRUCTOR:" , props);
	}
	
	
	
  render() {
		console.log("IN TWEETS: ", this.state.tweets);
		var tweetComps = this.state.tweets.map(function(item, i){
			return(
				<GridTile key={item.id} cols={1}>
					<Tweet data={item} />
				</GridTile>
			);
		});
		
    return (
      <div className="">
      	<ReactCSSTransitionGroup
					transitionName="tweetAnimation"
					transitionAppear={true}
      		transitionAppearTimeout={200}
					transitionEnterTimeout={400}
					transitionLeaveTimeout={200}>
					<GridList
						key="tweet-gridList"
						cellHeight={"auto"}
						style={styles.gridList}
						cols={2}
					>
						<Subheader key="tweet-subHeader">Tweets</Subheader>
					
						{tweetComps}
					</GridList>
				</ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Tweets;
