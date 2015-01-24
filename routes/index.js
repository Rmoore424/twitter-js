var express = require('express');
var tweetBank = require('../tweetBank');
var bodyParser = require("body-parser");
var router = express.Router();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false});

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, name: "", showForm: true} );
});

router.get("/users/:name", function(req, res) {
	var name = req.params.name;
	var tweets = tweetBank.find({name: name});
	res.render("index", {title: "Twitter.js - Posts by " +name, tweets: tweets, name: name, showForm: true});
});

router.get("/users/:name/tweets/:id", function(req, res) {
	var name = req.params.name;
	var id = req.params.id;
	var tweets = tweetBank.find({id: id});
	var tweet = tweetBank.find({name: name});
	res.render("index", {title: "Twitter.js - Posts #" +id, tweets: tweets, name: name, id: id, showForm: false});
});

router.post("/submit", urlencodedParser, function(req, res) {
	var name = req.body.name;
	var text = req.body.text;
	tweetBank.add(name, text);
	res.redirect("/");
});


module.exports = router;