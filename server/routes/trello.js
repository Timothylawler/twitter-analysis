var express = require("express");
var trelloApi = require("node-trello");
var bodyParser = require('body-parser');
//https://github.com/caolan/async/blob/v1.5.2/README.md
var async = require("async");


var trello = express.Router();


/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
trello.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
trello.use(bodyParser.json());


var key = {
	"key" : "4d9514f504a2b84e7c1bf883a57e4572"
}

//var trello = new Trello(key.key, "MY USER TOKEN");

trello.get("/", function(req, res){
	
});

//	Using post here since the keys are not to be sent in url
trello.post("/boards", function(req, res){
	
	var t = new trelloApi(key.key, req.body.access_token);
	t.get("/1/members/me", function(error, data){
		if(!error){
			//	Put information in database, data.id, data.fullName and req.body.access_token
			var user = {};
			user.id = data.id;
			//	Analyse fullName for gender?
			user.fullName = data.fullName;
			user.access_token = req.body.access_token;
			
			//	TODO: CALL TO GET ANALYSIS ON USER OBJECT
			
			//	Get the users boards
			this.boards = [];
			var self = this;

			let requests = data.idBoards.map(function(item){
				return new Promise(function(resolve){
					t.get("/1/boards/" + item, function(error, data){
						if(!error){
							//	Could analyse the names of each board here, data.name

							//	Going to need, id:string, name:string, closed:boolean, desc:string, 
							//		prefs.permissionLevel:string/enum, prefs.background:string/color, prefs.backgroundColor:string/hex
							var board = {};
							board.id = data.id;
							board.name = data.name;
							board.closed = data.closed;
							board.desc = data.desc;
							board.permissionLevel = data.prefs.permissionLevel;
							board.background = data.prefs.background;
							board.backgroundColor = data.prefs.backgroundColor;
							self.boards.push(board);
						}
						resolve();
					});
				});
			});

			Promise.all(requests).then(function(){
				res.end(JSON.stringify(self.boards));
			});
			
			
		} else {
			//	Should refuse the user here since we cannot get anything here
			res.status(500).send("cant connect to trello");
		}
	});
});

/*	POST FOR AUTHENTICATED USER
 *	Expects to receive a access_token for trello in body
 *	
 */
trello.post("/key", function(req, res){
	//var self = this;
	console.log("New user registered");
	
	var t = new trelloApi(key.key, req.body.access_token);
	t.get("/1/members/me", function(error, data){
		if(!error){
			//	Put information in database, data.id, data.fullName and req.body.access_token
			var user = {};
			user.id = data.id;
			//	Analyse fullName for gender?
			user.fullName = data.fullName;
			user.access_token = req.body.access_token;
			
			// TODO: PUT IN DATABASE
		}
	});
	
});

/**
 *	Function getBoards takes an array of boardId's and a trello object.
 *		calls trello for each board id to get the name of each board
 *	boadIds: array of board id's
 *	t: trelloapi object
 */
var getBoards = function(boardIds, t){
	this.boards = [];
	var self = this;
	
	
	let requests = boardIds.map(function(item){
		return new Promise(function(resolve){
			t.get("/1/boards/" + item, function(error, data){
				self.boards.push(data);	
				return;
			});
		});
	});
	
	Promise.all(requests).then(function(){
		console.log(boards);
		return boards;
	});
	/*for(var i = 0; i < boardIds.length; i++){
			var data = getBoard(boardIds[i], t);
			//	Could analyse the names of each board here, data.name

			//	Going to need, id:string, name:string, closed:boolean, desc:string, 
			//		prefs.permissionLevel:string/enum, prefs.background:string/color, prefs.backgroundColor:string/hex
			var board = {};
			board.id = data.id;
			board.name = data.name;
			board.closed = data.closed;
			board.desc = data.desc;
			board.permissionLevel = data.prefs.permissionLevel;
			board.background = data.prefs.background;
			board.backgroundColor = data.prefs.backgroundColor;
			self.boards.push(board);
	}*/
	console.log("ASD");
	//console.log(result);
	//console.log(self.boards);
	//return boards;
	
}


module.exports = trello;