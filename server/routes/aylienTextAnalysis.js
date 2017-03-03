var express = require("express");

var aylien = express.Router();

var AYLIENTextAPI = require('aylien_textapi');


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
			console.log(response);
			res.send(response);
		}	else{
			console.log(error);
			res.status(400).send("Error: ", error);
		}
	});
});

aylien.get("/sentiment", function(req, res){
	var text = req.query.text;
	
	res.send(JSON.stringify(
		{
			status: "200", 
			data:"gg"
		}
	));
});

aylien.get("/", function(req, res){
	console.log(testObj);
	res.end(JSON.stringify(testObj));
});


module.exports = aylien;