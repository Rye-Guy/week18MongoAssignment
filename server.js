var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var logger = require('morgan');

var request = require('request');
var cheerio = require('cheerio');

var app = express();

var port = 8888;

app.listen(process.env.PORT || port, function(){
    console.log('server running on port 4545');
});

var databaseUrl = 'scraper';
var collections = ["scrapedData"];

app.get("/", function(req, res){
    res.send("You are on the index");
});



app.get("/scrape", function(req, res){
    request("https://www.imdb.com/chart/top", function(err, response, html){
        var $ = cheerio.load(html);

        var results = [];


        var movieRows = $("tbody.lister-list > tr").each(function(i, element){
            
            moviePoster = $(this).children("td.posterColumn").children("a").children("img").attr("src");
            movieTitle = $(this).children("td.titleColumn").children("a").text();
            movieRelease = $(this).children("td.titleColumn").children("span.secondaryInfo").text();
            movieRating = $(this).children("td.ratingColumn").children("strong").attr("title");

            results.push({
                poster: moviePoster,
                title: movieTitle,
                release: movieRelease,
                rating: movieRating
            });

        });


        console.log(results);

  });
       

    });