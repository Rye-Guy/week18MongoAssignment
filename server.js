var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var request = require('request');
var cheerio = require('cheerio');

var app = express();

var port = 4545;

app.listen(process.env.PORT || port, function(){
    console.log('server running on port 4545');
});