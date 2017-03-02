var express = require("express");

var test = express.Router();


var testObj = [
	{asd : "1"},
	{"asd" : "2"},
	{"asd" : "3"},
];

test.get("/", function(req, res){
	console.log(testObj);
	res.end(JSON.stringify(testObj));
});


module.exports = test;