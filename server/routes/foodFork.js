var express = require("express");
var foodFork = express.Router();

const request = require('request');

const searchBase = "http://food2fork.com/api/search";
const recipeBase = "http://food2fork.com/api/get";
const key = "84d63b636122d20e71e7c1db43599cb3";

foodFork.get("/", function(req, res){
	
});

foodFork.get("/toprating", function(req, res){
	var url = searchBase;
	url += "?sort=r";
	url += ("&key=" + key);
	
	request.get({url: url}, function(err, result, data){
		console.log(data);
		res.end(data);
	});
	
});


module.exports = foodFork;