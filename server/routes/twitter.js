var express = require("express");
var twitter = express.Router();

const request = require('request');
const Twitter = require('twitter');
const async = require('async');


const keys = {
	consumer : "KaAdZOT3aeqe0MObfa5S9OtaO",
	secret : "XzelgSC7dEgQebXKYWvyYea7vW4S2GWCnlUGpn0xuVXW2mMqkN",
	access_token : "806807637463445509-8pOFWnsQc9wofxe5FBxgmFqRl8AULP0",
	access_token_secret : "b7iz7EogQgFaJsbRiRYTuHzDvr999ItqPdi8Y09m1DYOR",
};

/* Twitter oauth object */
const client = new Twitter({
	consumer_key: keys.consumer,
  consumer_secret: keys.secret,
  access_token_key: keys.access_token,
  access_token_secret: keys.access_token_secret
});

const dummy = {
	"tweetList": [
    {
      "id": 1,
      "created": "Wed Mar 08 13:59:51 +0000 2017",
      "text": "Just loved @amtrac - Informal Disco https://t.co/2ODQNHzOuG on @hypem",
      "user": {
        "name": "Ceasar Nilhag",
        "screen_name": "ceasarnilhag",
        "statuses_count": 4582,
        "profile_image": "http://pbs.twimg.com/profile_images/378800000476909395/a269b138cc2e2fbcd13a820e1f063800_normal.jpeg",
        "profile_image_https": "https://pbs.twimg.com/profile_images/378800000476909395/a269b138cc2e2fbcd13a820e1f063800_normal.jpeg"
      },
      "favorites": 0,
      "retweets": 0,
      "sentiment": {
        "polarity": "neutral",
        "subjectivity": "objective",
        "text": "Just loved @amtrac - Informal Disco https://t.co/2ODQNHzOuG on @hypem",
        "polarity_confidence": 0.9454591274261475,
        "subjectivity_confidence": 0.9993181747182511
      }
    },
    {
      "id": 2,
      "created": "Wed Mar 08 13:59:52 +0000 2017",
      "text": "RT @LaloGonzalezM: Joaquín #Sabina presentará su nuevo disco 💿 en el Metro 🚋  de Madrid 🇪🇸 https://t.co/VZTLJ8wgiX vía @siempre889",
      "user": {
        "name": "Siempre 88.9",
        "screen_name": "Siempre889",
        "statuses_count": 207947,
        "profile_image": "http://pbs.twimg.com/profile_images/750035270716710916/b7gWQVqm_normal.jpg",
        "profile_image_https": "https://pbs.twimg.com/profile_images/750035270716710916/b7gWQVqm_normal.jpg"
      },
      "favorites": 0,
      "retweets": 1,
      "sentiment": {
        "polarity": "neutral",
        "subjectivity": "subjective",
        "text": "RT @LaloGonzalezM: Joaquín #Sabina presentará su nuevo disco 💿 en el Metro 🚋  de Madrid 🇪🇸 https://t.co/VZTLJ8wgiX vía @siempre889",
        "polarity_confidence": 0.8161288499832153,
        "subjectivity_confidence": 0.9999999999999947
      }
    },
    {
      "id": 3,
      "created": "Wed Mar 08 13:59:52 +0000 2017",
      "text": "RT @LaloGonzalezM: Joaquín #Sabina presentará su nuevo disco 💿 en el Metro 🚋  de Madrid 🇪🇸 https://t.co/VZTLJ8wgiX vía @siempre889",
      "user": {
        "name": "Siempre 88.9",
        "screen_name": "Siempre889",
        "statuses_count": 207947,
        "profile_image": "http://pbs.twimg.com/profile_images/750035270716710916/b7gWQVqm_normal.jpg",
        "profile_image_https": "https://pbs.twimg.com/profile_images/750035270716710916/b7gWQVqm_normal.jpg"
      },
      "favorites": 0,
      "retweets": 1,
      "sentiment": {
        "polarity": "negative",
        "subjectivity": "subjective",
        "text": "RT @LaloGonzalezM: Joaquín #Sabina presentará su nuevo disco 💿 en el Metro 🚋  de Madrid 🇪🇸 https://t.co/VZTLJ8wgiX vía @siempre889",
        "polarity_confidence": 0.8161288499832153,
        "subjectivity_confidence": 0.9999999999999947
      }
    },
    {
      "id": 4,
      "created": "Wed Mar 08 13:59:52 +0000 2017",
      "text": "RT @LaloGonzalezM: Joaquín #Sabina presentará su nuevo disco 💿 en el Metro 🚋  de Madrid 🇪🇸 https://t.co/VZTLJ8wgiX vía @siempre889",
      "user": {
        "name": "Siempre 88.9",
        "screen_name": "Siempre889",
        "statuses_count": 207947,
        "profile_image": "http://pbs.twimg.com/profile_images/750035270716710916/b7gWQVqm_normal.jpg",
        "profile_image_https": "https://pbs.twimg.com/profile_images/750035270716710916/b7gWQVqm_normal.jpg"
      },
      "favorites": 0,
      "retweets": 1,
      "sentiment": {
        "polarity": "neutral",
        "subjectivity": "subjective",
        "text": "RT @LaloGonzalezM: Joaquín #Sabina presentará su nuevo disco 💿 en el Metro 🚋  de Madrid 🇪🇸 https://t.co/VZTLJ8wgiX vía @siempre889",
        "polarity_confidence": 0.8161288499832153,
        "subjectivity_confidence": 0.9999999999999947
      }
    }
	]
};

twitter.get("/search", function(req, res){
	//console.log(req.query);
	const toSearchFor = req.query.search;
	var result_type = "popular";
	var geocode = undefined;
	var hashtag = undefined;
	var from = undefined;
	
	//	Does the user request geo statuses
	if(req.query.latitude != undefined && req.param('longitude') != undefined){
		geocode = req.param('latitude') + "," + req.param('longitude') + ",100mi";
	}
	
	if(req.query.from != undefined){
		from = "from:"+req.query.from;
	}
	
	if(req.param('result_type') != undefined){
		result_type = req.param('result_type')
	}
	
	//	Query for data
	if(toSearchFor != undefined){
		var params = {
			q : toSearchFor,
			//result_type: result_type,
		}
		if(from != undefined){
			params.q += (" " + from);
		}
		
		if(req.query.hashtag != undefined){
			params.q += (" #" + req.query.hashtag);
		}
		
		if (geocode != undefined){
			params.geocode = geocode;
		}
		var q ={
			q : params.q
		}
		console.log(params);
		
		client.get("search/tweets.json" , params, function(error, data, response){
			if(response.statusCode == 200){
				var self = this;
				//	Seathe what we want
				this.relevantShit = {};
				//	Get the meta
				let metaData = {
					query: data.search_metadata.query,
					count: data.search_metadata.count,
					refresh_url: data.search_metadata.refresh_url,
					next_results: data.search_metadata.next_results,
				}
				this.relevantShit.metadata = metaData;
				let tweetList = [];
				this.relevantShit.tweetList = tweetList;
				
				//	GET TWEET DATA
				let parse = data.statuses.map(function(item, i){
					return new Promise(function(resolve){
						let parseSelf = this;
						let tweet = {
							id : item.id,
							created: item.created_at,
							text : item.text,
							user : {
								name : item.user.name,
								screen_name : item.user.screen_name,
								statuses_count : item.user.statuses_count,
								profile_image : item.user.profile_image_url,
								profile_image_https : item.user.profile_image_url_https,
							},
							favorites : item.favorite_count,
							retweets : item.retweet_count,
						}
						
						//	Call to analyse the text right away
						/*	COMMENT THIS BLOCK WHEN NOT ANALYSING! */
						/*analyseSentiment(item.text).then(function(result){
							if(result.status == 200){
								tweet.sentiment = JSON.parse(result.data);
								
							} else{
								tweet.sentiment = "N/A";
							}
							//self.relevantShit.push(tweet);
							self.relevantShit.tweetList.push(tweet);
							resolve();
						});*/
						/*	UNCOMMENT HERE WHEN NOT ANALYSING! */
						self.relevantShit.tweetList.push(tweet);
						resolve();
					});
				});
				
				//	return when done with the stuff above. nice comment bruh
				Promise.all(parse).then(function(){
					self.relevantShit = dummy;
					res.send(JSON.stringify(self.relevantShit));
				});

			} else{
				console.log("Error: ", error);
				res.status(500).send("error connecting to twitter")
			}
			
		});
	} else{
		res.status(400).send("No search term passed");
	}
});




/*	call aylient/sentiment to analyse passed data based on sentiment	*/
function analyseSentiment(data){
	const params = {
		text : data
	};
	return new Promise(function(fulfill, reject){
		try{
			request.get({url:"http://localhost:4000/aylien/sentiment", qs: params}, function(error, response, data){
				//console.log("Error: ", error);
				//console.log("Response: ", response);
				//console.log("Data: ", data);
				if(error){
					reject({status: "400", data: error});
				} else{
					fulfill({status: "200", data: data});
				}
			});
		} catch(ex){
			reject({status: "400", data: ex});
		}
		
	});
}



twitter.get("/testRoute", function(req, res){
	var data = req.query.text;
	
	analyseSentiment(data).then(function(result){
		console.log("Promise:", result);
		if(result.status == 200)
			res.end(result.data);
	});
	
});

twitter.get("/test", function(req, res){
	client.get("account/verify_credentials", function(error, tweets, resp){
		res.send(JSON.stringify(resp));
	});
});


module.exports = twitter;