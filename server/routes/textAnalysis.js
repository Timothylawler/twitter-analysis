var express = require("express");
var bodyParser = require('body-parser');
var request = require('request');
var textAnalysis = express.Router();


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
textAnalysis.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
textAnalysis.use(bodyParser.json());

//	These keys should not be here, will be included in git commmit. leave it for now
//	Key used for reading from the api
var readKey = "vql1GzMXNYBp";
//	Key used to write, train a classification
var writeKey = "XilE7KqL146k";

var baseUrl = "https://api.uclassify.com/v1/uClassify/";


textAnalysis.post("/sentiment", function(req, res){
	
	var extension = "Sentiment/Classify/?readKey="+readKey;
	var text = req.body.text;
	//console.log(req.body);
	if(text != undefined){
		var url = baseUrl + extension + "&text=" + text;
		request(url, function(error, data){
			if(!error && data.statusCode == 200){
				res.end(data.body);
			} else {
				console.log("error: ", error);
			}
		});
	} else{
		//	Git text ples
	}
	
});



module.exports = textAnalysis;