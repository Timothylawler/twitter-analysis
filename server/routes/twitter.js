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
      "id": 840115504077463600,
      "created": "Fri Mar 10 08:21:59 +0000 2017",
      "text": "Trump Might Want To Build A Hyperloop. What The Heck Is A Hyperloop? https://t.co/deL0hlbYjH",
      "user": {
        "name": "jacoo",
        "screen_name": "pjkate",
        "statuses_count": 38500,
        "profile_image": "http://pbs.twimg.com/profile_images/548366910681653248/7EaCr4Bm_normal.jpeg",
        "profile_image_https": "https://pbs.twimg.com/profile_images/548366910681653248/7EaCr4Bm_normal.jpeg"
      },
      "favorites": 0,
      "retweets": 0,
      "sentiment": {
        "polarity": "neutral",
        "subjectivity": "objective",
        "text": "Trump Might Want To Build A Hyperloop. What The Heck Is A Hyperloop? https://t.co/deL0hlbYjH",
        "polarity_confidence": 0.8848863840103149,
        "subjectivity_confidence": 0.9999999984432126
      },
      "entities": {
        "text": "Trump Might Want To Build A Hyperloop. What The Heck Is A Hyperloop? https://t.co/deL0hlbYjH",
        "language": "en",
        "entities": {
          "keyword": [
            "Hyperloop",
            "Heck",
            "https://t.co/deL0hlbYjH",
            "Trump"
          ],
          "url": [
            "https://t.co/deL0hlbYjH"
          ]
        }
      }
    },
    {
      "id": 840115502160605200,
      "created": "Fri Mar 10 08:21:58 +0000 2017",
      "text": "RT @navedsylhet: @realdonaldtrump @vp @KellyannePolls \nWon't Allow H-1B Visa Holders To Replace US Workers: Donald Trump - NDTV https://t.c…",
      "user": {
        "name": "Naved",
        "screen_name": "navedsylhet",
        "statuses_count": 142,
        "profile_image": "http://pbs.twimg.com/profile_images/823631895078391808/_nLtw9LZ_normal.jpg",
        "profile_image_https": "https://pbs.twimg.com/profile_images/823631895078391808/_nLtw9LZ_normal.jpg"
      },
      "favorites": 0,
      "retweets": 1,
      "sentiment": {
        "polarity": "negative",
        "subjectivity": "objective",
        "text": "RT @navedsylhet: @realdonaldtrump @vp @KellyannePolls \nWon't Allow H-1B Visa Holders To Replace US Workers: Donald Trump - NDTV https://t.c…",
        "polarity_confidence": 0.7075761556625366,
        "subjectivity_confidence": 0.9999999940614477
      },
      "entities": {
        "text": "RT @navedsylhet: @realdonaldtrump @vp @KellyannePolls \nWon't Allow H-1B Visa Holders To Replace US Workers: Donald Trump - NDTV https://t.c…",
        "language": "en",
        "entities": {
          "keyword": [
            "Visa",
            "Holders",
            "Donald",
            "H-1B",
            "Trump",
            "@KellyannePolls",
            "NDTV",
            "@realdonaldtrump",
            "@navedsylhet",
            "https://t.c…"
          ],
          "url": [
            "https://t.c…"
          ],
          "organization": [
            "Visa Holders",
            "US Workers"
          ],
          "person": [
            "Donald Trump"
          ]
        }
      }
    },
    {
      "id": 840115503104311300,
      "created": "Fri Mar 10 08:21:59 +0000 2017",
      "text": "RT @PlagueOfFrogs: THE FLAG HAS BEEN CAPTURED AND REPLACED WITH TRUMP SHIRT AND HAT. FROGTWITTER WINS AGAIN. SHIA BTFO #HWNDU #HeWillNotDiv…",
      "user": {
        "name": "Nemo",
        "screen_name": "Kimdracula76",
        "statuses_count": 533,
        "profile_image": "http://pbs.twimg.com/profile_images/826905934647562240/avnH6ucR_normal.jpg",
        "profile_image_https": "https://pbs.twimg.com/profile_images/826905934647562240/avnH6ucR_normal.jpg"
      },
      "favorites": 0,
      "retweets": 182,
      "sentiment": {
        "polarity": "negative",
        "subjectivity": "subjective",
        "text": "RT @PlagueOfFrogs: THE FLAG HAS BEEN CAPTURED AND REPLACED WITH TRUMP SHIRT AND HAT. FROGTWITTER WINS AGAIN. SHIA BTFO #HWNDU #HeWillNotDiv…",
        "polarity_confidence": 0.40990954637527466,
        "subjectivity_confidence": 1
      },
      "entities": {
        "text": "RT @PlagueOfFrogs: THE FLAG HAS BEEN CAPTURED AND REPLACED WITH TRUMP SHIRT AND HAT. FROGTWITTER WINS AGAIN. SHIA BTFO #HWNDU #HeWillNotDiv…",
        "language": "en",
        "entities": {
          "keyword": [
            "FROGTWITTER",
            "SHIA",
            "SHIRT",
            "TRUMP",
            "BTFO",
            "FLAG",
            "#HWNDU",
            "#HeWillNotDiv",
            "@PlagueOfFrogs"
          ]
        }
      }
    },
    {
      "id": 840115501858664400,
      "created": "Fri Mar 10 08:21:58 +0000 2017",
      "text": "RT @owillis: there's no political downside to trump continued denial of media coverage. the press doesnt ever retaliate, and hires his cron…",
      "user": {
        "name": "Leonie Kline-Marante",
        "screen_name": "KlineMarante",
        "statuses_count": 913,
        "profile_image": "http://abs.twimg.com/sticky/default_profile_images/default_profile_5_normal.png",
        "profile_image_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_5_normal.png"
      },
      "favorites": 0,
      "retweets": 40,
      "sentiment": {
        "polarity": "negative",
        "subjectivity": "objective",
        "text": "RT @owillis: there's no political downside to trump continued denial of media coverage. the press doesnt ever retaliate, and hires his cron…",
        "polarity_confidence": 0.8411341309547424,
        "subjectivity_confidence": 0.999999999468892
      },
      "entities": {
        "text": "RT @owillis: there's no political downside to trump continued denial of media coverage. the press doesnt ever retaliate, and hires his cron…",
        "language": "en",
        "entities": {
          "keyword": [
            "media",
            "coverage",
            "denial",
            "continued",
            "press",
            "doesnt",
            "downside",
            "cron",
            "political"
          ]
        }
      }
    },
    {
      "id": 840115504220057600,
      "created": "Fri Mar 10 08:21:59 +0000 2017",
      "text": "RT @SallyDeal4: #DemForce #resist #TheResistance #TrumpRussia #Russiagate WikiLeaks has joined the Trump admin. 45 remains silent  https://…",
      "user": {
        "name": "Loren K Laney",
        "screen_name": "a2mech2000_k",
        "statuses_count": 28210,
        "profile_image": "http://pbs.twimg.com/profile_images/808476075881730048/WF5bHCJO_normal.jpg",
        "profile_image_https": "https://pbs.twimg.com/profile_images/808476075881730048/WF5bHCJO_normal.jpg"
      },
      "favorites": 0,
      "retweets": 7,
      "sentiment": {
        "polarity": "negative",
        "subjectivity": "objective",
        "text": "RT @SallyDeal4: #DemForce #resist #TheResistance #TrumpRussia #Russiagate WikiLeaks has joined the Trump admin. 45 remains silent  https://…",
        "polarity_confidence": 0.4827258586883545,
        "subjectivity_confidence": 1
      },
      "entities": {
        "text": "RT @SallyDeal4: #DemForce #resist #TheResistance #TrumpRussia #Russiagate WikiLeaks has joined the Trump admin. 45 remains silent  https://…",
        "language": "en",
        "entities": {
          "keyword": [
            "#Russiagate",
            "WikiLeaks",
            "#TrumpRussia",
            "Trump",
            "#TheResistance",
            "#resist",
            "admin",
            "#DemForce",
            "silent",
            "@SallyDeal4",
            "https"
          ],
          "organization": [
            "Trump"
          ]
        }
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
						try{
							analyseSentiment(item.text).then(function(result){
								if(result.status == 200){
									tweet.sentiment = JSON.parse(result.data);
								} else{
									tweet.sentiment = "N/A";
								}

								extractEntities(item.text).then(function(result){
									if(result.status == 200){
										tweet.entities = JSON.parse(result.data);
									} else{
										tweet.entities = "N/A";
									}
									self.relevantShit.tweetList.push(tweet);
									resolve();
								});
							});
						} catch(ex){
							resolve();
						}
						/*	UNCOMMENT HERE WHEN NOT ANALYSING! */
						//self.relevantShit.tweetList.push(tweet);
						//resolve();
					});
				});
				
				//	return when done with the stuff above. nice comment bruh
				Promise.all(parse).then(function(){
					//self.relevantShit = dummy;
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
};

/*	Calls aylien/entities to extract keywords from a string
 *	Returns promise
 */
function extractEntities(data){
	const params = {
		text: data
	};
	return new Promise(function(fulfill, reject){
		try{
			request.get({url: "http://localhost:4000/aylien/entities", qs: params}, function(error, response, data){
				if(error){
					reject({status:"400", data: error});
				} else {
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