var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var logger = require('morgan');

var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended: false}));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"));

mongoose.connect('mongodb://localhost/Movie');

var db = require("./models");

// db.once("error", function(error){
//     console.log("Mongoose Error:", error);
// });

// db.once("open", function(){
//     console.log("Mongoose connection successful");
// });


app.get("/", function(req, res){
    Movies.find({}, function(err, doc){
        if(err){
            throw err;
        }else{
            res.render("index", {movies: doc});
        }
    });
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
            
            db.Movies.create(result).then(function(dbMovies){
                console.log(dbMovies);
                console.log("Scrape completed");
            }).catch(function(err){
                return res.json(err);
            });

        });

  });
  res.send("Movies Scraped");
});

app.get('/movies', function(req, res){
    db.Movies.find({}).then(function(dbMovies){
        res.json(dbMovies)
    }).catch(function(err){
        res.json(err);
    });
});


var port = 8890;

app.listen(process.env.PORT || port, function(){
    console.log('server running on port' + port);
});
