var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var logger = require('morgan');

var request = require('request');
var cheerio = require('cheerio');

var app = express();

var port = 4545;

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

        
        console.log($);


    });
});