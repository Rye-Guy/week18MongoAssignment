var express = require('express');
var bodyParser = require('body-parser');

var Movie = require("./models/Movies.js");
var mongoose = require('mongoose');

var logger = require('morgan');

var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect('mongodb://localhost/Movie');

var db = require("./models");


var port = 8888;

app.listen(process.env.PORT || port, function(){
    console.log('server running on port 4545');
});

app.get("/", function(req, res){
    res.send("You are on the index");
});



app.get("/scrape", function(req, res){
    request("https://www.imdb.com/chart/top", function(err, response, html){
        var $ = cheerio.load(html);


        $("tbody.lister-list > tr").each(function(i, element){
            
            var result = {};


            result.moviePoster = $(this).children("td.posterColumn").children("a").children("img").attr("src");
            result.movieTitle = $(this).children("td.titleColumn").children("a").text();
            result.movieRelease = $(this).children("td.titleColumn").children("span.secondaryInfo").text();
            result.movieRating = $(this).children("td.ratingColumn").children("strong").attr("title");
            
            db.Movie.create(result).then(function(dbMovies){
                console.log(dbMovies);
                console.log(result);
            }).catch(function(err){
                return res.json(err);
            });

        });

  });
       
  res.send("Movies Scraped");
});