import React, { Component } from 'react';
import '../../App.css';

import Paper from 'material-ui/Paper';


const styles = {
	tweet: {
		margin: 8,
	},
	negative: {
		backgroundColor: "#ff2a2a"
	},
	neutral: {
		backgroundColor: "#ffe300"
	},
	positive: {
		backgroundColor: "#0fe22c"
	},
	defaultStyle: {
		
	}
}

class Tweet extends Component {
  constructor(props){
		super(props);
		/* REMOVE THIS WHEN BACK TO SENTIMENT! */
		/*let twitStuff = props.data;
		twitStuff.sentiment = {
			"polarity": "positive",
			"subjectivity": "subjective",
			"text": "RT @20committee: I'm confident that any SERIOUS investigation of #TrumpRussia will find enough intel to end Trump's admin &amp; send people to…",
			"polarity_confidence": 0.6273645162582397,
			"subjectivity_confidence": 1
		};*/
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
		const {created, text, entities, user, favorites, retweets, sentiment} = this.state.tweet;
		switch(this.state.hover){
			case true:
				return(
					<div>
						<p>Hovering</p>
					</div>
				);
				break;
			case false:
				var keywordArr, urlArr = undefined;
				if(entities.entities != undefined){
					if(entities.entities.keyword != undefined && entities.entities.keyword.length > 0){
						keywordArr = entities.entities.keyword.map(function(item, i){
							if(item.split(" ").length == 1){
								return (" " + item + ", ");
							}
						});
					}
					
					if(entities.entities.url != undefined){
						urlArr = entities.entities.url.map(function(item, i){
							return (" " + item + " ");
						});
					}
				}
				return (
					<div>
						<h3>{sentiment.subjectivity}, {sentiment.polarity}</h3>
						<p>{text}</p>
						{
							keywordArr !== undefined && 
								(<p>Keywords: <b>{keywordArr}</b></p>)
						} 
						{
							urlArr !== undefined &&
								(<p>Urls: <a href={urlArr[0]}>{urlArr}</a></p>)
						}
						<hr/>
						<p>Subjectivity confidence: {sentiment.subjectivity_confidence.toFixed(3) * 100}%</p>
						<p>polarity confidence: {sentiment.polarity_confidence.toFixed(3) * 100}%</p>
						<p>Favorites: {favorites}, Retweets: {retweets}</p>
					</div>
				);
				break;
		}
	}
	
	getBackgroundColor(){
		switch(this.state.tweet.sentiment.polarity){
			case "neutral":
				return styles.neutral;
			case "positive":
				return styles.positive;
			case "negative":
				return styles.negative;
			default:
				return styles.defaultStyle;
		}
	}
	
	/*
	onMouseOver={this.setHover} onMouseLeave={this.setNotHover}
	*/
	
	
	render() {
		
    return (
      <div className="" style={styles.tweet}>
      	<Paper zDepth={1} className="center tweet-card" style={this.getBackgroundColor()}>
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
