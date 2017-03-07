import React, { Component } from 'react';
import '../../App.css';

import Paper from 'material-ui/Paper';


const styles = {
	tweet: {
		margin: 8,
	}
}

class Tweet extends Component {
  constructor(props){
		super(props);
		/* REMOVE THIS WHEN BACK TO SENTIMENT! */
		let twitStuff = props.data;
		twitStuff.sentiment = {
			"polarity": "neutral",
			"subjectivity": "subjective",
			"text": "RT @20committee: I'm confident that any SERIOUS investigation of #TrumpRussia will find enough intel to end Trump's admin &amp; send people to…",
			"polarity_confidence": 0.6273645162582397,
			"subjectivity_confidence": 1
		};
		/**/
		this.state={
			hover: false,
			tweet: props.data,
		};
		this.setHover = this.setHover.bind(this);
		this.setNotHover = this.setNotHover.bind(this);
		
	}
	
	setHover(){
		this.setState({
			hover: true
		});
	}
	
	setNotHover(){
		this.setState({
			hover: false
		});
	}
	
	getContent(){
		const {created, text, user, favorites, retweets, sentiment} = this.state.tweet;
		switch(this.state.hover){
			case true:
				return(
					<div>
						<p>Hovering</p>
					</div>
				);
				break;
			case false:
				return (
					<div>
						<h3>{sentiment.subjectivity}, {sentiment.polarity}</h3>
						<p>{text}</p>
						<hr/>
						<p>Subjectivity confidence: {sentiment.polarity_confidence.toFixed(3)}</p>
					</div>
				);
				break;
		}
	}
	
	
	
	render() {
		
		
    return (
      <div className="" style={styles.tweet}>
      	<Paper zDepth={1} className="center tweet-card" onMouseOver={this.setHover} onMouseLeave={this.setNotHover}>
      		{this.getContent()}
      	</Paper>
      </div>
    );
  }
}

export default Tweet;

/*
tweet:{
				"created": "Mon Mar 06 12:47:34 +0000 2017",
				"text": "RT @20committee: I'm confident that any SERIOUS investigation of #TrumpRussia will find enough intel to end Trump's admin &amp; send people to…",
				"user": {
					"name": "Linda",
					"screen_name": "exgci",
					"statuses_count": 82682,
					"profile_image": "http://pbs.twimg.com/profile_images/796714136013049856/aSWMsTEl_normal.jpg",
					"profile_image_https": "https://pbs.twimg.com/profile_images/796714136013049856/aSWMsTEl_normal.jpg"
				},
				"favorites": 0,
				"retweets": 3209,
				"sentiment": {
					"polarity": "neutral",
					"subjectivity": "subjective",
					"text": "RT @20committee: I'm confident that any SERIOUS investigation of #TrumpRussia will find enough intel to end Trump's admin &amp; send people to…",
					"polarity_confidence": 0.6273645162582397,
					"subjectivity_confidence": 1
				}
			}*/
