var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json(), cors());

var server = app.listen(4000, function(){
	
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Listening at http://%s:%s", host, port);
});

var test = require("./routes/testRoutes.js");
var twitter = require("./routes/twitter.js");
var textAnalysis = require("./routes/textAnalysis.js");
var aylien = require("./routes/aylienTextAnalysis.js");

app.use("/test", test);
app.use("/twitter", twitter);
app.use("/analysis", textAnalysis);
app.use("/aylien", aylien);