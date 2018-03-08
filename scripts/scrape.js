// var server = require("../server.js")
var express = require("express");
var router = express();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models")
// scrape route
router.get("/scrape", function(req, res){
    axios.get("http://www.echojs.com/").then
    (function(response){
        var $ = cheerio.load(response.data);
        $("article h2").each(function(i, element){
            var result = {};

            result.title = $(this)
            .children("a").text();
            result.link = $(this)
            .children("a").attr("href");

            db.Headline.create(result)
            .then(function(data){
                console.log(data);
            }).catch(function(err){
                return res.json(err);
            });
        });
        res.send("Scrape Complete")
    });
});
router.get("/articles", function(req, res){
    db.Headline.find({}).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json(err);
    });
});

router.get("/articles/:id", function(req, res){
    db.Headline.findOne({_id: req.params.id})
    .populate("note").then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json(err);
    });
});

router.post("/articles/:id", function(req, res){
    console.log(req.body);
    db.Note.create(req.body).then(function(dbNote){
        return db.Headline.findOneAndUpdate({
            _id: req.params.id
        },{note: dbNote._id}, {new: true});
    }).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json(err);
    });
});
module.exports = router;
