var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
// var request = require("request");
var app = express();
var axios = require("axios");
var logger = require("morgan");
var db = require("./models");
var port = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});
app.use(logger("dev"));
// Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json())
// Use express.static to serve the public folder
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoosescraper"),{
    useMongoClient: true
}

var routes = require("./scripts/scrape.js")
app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);
app.listen(port, function() {
    console.log("App running on port " + port);
  });