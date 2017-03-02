var express = require("express");

var twitter = express.Router();


const Twitter = require('twitter');


const keys = {
	consumer : "KaAdZOT3aeqe0MObfa5S9OtaO",
	secret : "XzelgSC7dEgQebXKYWvyYea7vW4S2GWCnlUGpn0xuVXW2mMqkN",
	access_token : "806807637463445509-8pOFWnsQc9wofxe5FBxgmFqRl8AULP0",
	access_token_secret : "b7iz7EogQgFaJsbRiRYTuHzDvr999ItqPdi8Y09m1DYOR",
}

const client = new Twitter({
	consumer_key: keys.consumer,
  consumer_secret: keys.secret,
  access_token_key: keys.access_token,
  access_token_secret: keys.access_token_secret
});

twitter.get("/search", function(req, res){
	//console.log(req.query);
	const toSearchFor = req.query.search;
	var result_type = "popular";
	var geocode;
	var hashtag;
	
	//	Does the user request geo statuses
	if(req.query.latitude != undefined && req.param('longitude') != undefined){
		geocode = req.param('latitude') + "," + req.param('longitude') + ",100mi";
	}
	
	if(req.param('result_type') != undefined){
		result_type = req.param('result_type')
	}
	
	//	Query for data
	if(toSearchFor != undefined){
		var params = {
			q : toSearchFor,
			result_type: result_type,
		}
		
		if(req.query.hashtag != undefined){
			params.q += " #" + req.query.hashtag;
		}
		
		if (geocode != undefined){
			params.geocode = geocode;
		}
		console.log(encodeURIComponent(params));
		client.get("search/tweets", params, function(error, data, response){
			if(response.statusCode == 200){
				res.send(data);	
			} else{
				res.status(500).send("error connecting to twitter")
			}
			
			
		});
		
		
		
	} else{
		res.status(400).send("No search term passed");
	}
	
	
	
});




twitter.get("/test", function(req, res){
	client.get("account/verify_credentials", function(error, tweets, resp){
		//res.send(JSON.stringify("Error: ", error));
		res.send(JSON.stringify(resp));
		//res.send(JSON.stringify("Resp: ", resp));
		//console.log("Tweets: ", tweets);
		//console.log("Resp: ", resp);
	});
});


module.exports = twitter;