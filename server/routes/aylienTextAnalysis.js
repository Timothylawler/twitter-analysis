var express = require("express");
var aylien = express.Router();
var bodyParser = require('body-parser');

var AYLIENTextAPI = require('aylien_textapi');

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
aylien.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
aylien.use(bodyParser.json());

var keys = {
	aylien_key : "074f27884641fb9fa0f53feff62d04bd",
	aylien_appID : "9111ceb8",
}

var textapi = new AYLIENTextAPI({
  application_id: keys.aylien_appID,
  application_key: keys.aylien_key
});

aylien.get("/test", function(req, res){
	textapi.sentiment({
		'text' : 'John is a very good football player!'
	}, function(error, response){
		if(!error){
			//console.log(response);
			res.send(response);
		}	else{
			console.log(error);
			res.status(400).send("Error: ", error);
		}
	});
});

aylien.get("/sentiment", function(req, res){
	var text = req.query.text;
	if(text != undefined){
		//	Return sentiment on passed text
		textapi.sentiment({
			'text' : text
		}, function(error, response){
			if(!error){
				res.status(200).send(response);
			} else{
				res.status(400).send(error);
			}
		});
	} else{
		res.status(400).send("No text passed to sentiment analysis");
	}
});

aylien.get("/", function(req, res){
	console.log(testObj);
	res.end(JSON.stringify(testObj));
});

aylien.get("/entities", function(req, res){
	var text = req.query.text;
	if(text != undefined){
		textapi.entities({
			text: text
		}, function(error, response) {
			if (error === null) {
				res.send(response);
			} else{
				res.status(500).send("No entities received.");
			}
		});
	} else {
		res.status(400).send("No text passed");
	}
});

module.exports = aylien;