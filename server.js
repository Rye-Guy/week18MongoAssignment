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

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Movie';


//connection to our movie database

mongoose.Promise = Promise; 

mongoose.connect(MONGODB_URI, function(){
    mongoose.connection.db.dropDatabase();
    console.log("DB dropped");
});

var db = require("./models");
var Note = require("./models/Notes");


db.Movies.once("error", function(error){
    console.log("Mongoose Error:", error);
});

db.Movies.once("open", function(){
    console.log("Mongoose connection successful");
});


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
    mongoose.connection.db.dropDatabase();
    request("https://www.imdb.com/chart/top", function(err, response, html){
        var $ = cheerio.load(html);


        $("tbody.lister-list > tr").each(function(i, element){
            
            var result = {};

            result.moviePoster = $(this).children("td.posterColumn").children("a").children("img").attr("src");
            result.movieTitle = $(this).children("td.titleColumn").children("a").text();
            result.movieRelease = $(this).children("td.titleColumn").children("span.secondaryInfo").text();
            result.movieRating = $(this).children("td.ratingColumn").children("strong").attr("title");
            db.Movies.create(result).then(function(dbMovies){
                console.log("Scrape completed");
            }).catch(function(err){
                return res.json(err);
            });
        
        });
        
  });
  res.render("scraped");
});

app.get('/notes', function(req, res){
    db.Notes.find({}).then(function(dbNotes){
        res.json(dbNotes)
    }).catch(function(err){
        res.json(err);
    });
});

app.delete('/notes/:id', function(req, res){
    db.Notes.deleteOne({"_id": req.params.id}).exec(function(err, doc){
        if(err){
            console.log(err);
        }else{
            console.log(res.json(doc));
            console.log(doc);
        }
    });
});

app.get('/quotes', function(req, res){
    res.render('notes');
})


app.get('/movies', function(req, res){
    db.Movies.find({}).then(function(dbMovies){
        res.json(dbMovies)
    }).catch(function(err){
        res.json(err);
    });
});

app.get('/dropdb', function(req, res){
    mongoose.connection.db.dropDatabase();
    res.render("index");
});



app.get("/movies/:id", function(req, res){
    db.Movies.findOne({"_id": req.params.id}).populate("note").exec(function(err, doc){
        if(err){
            console.log(err);
        }else{
            res.json(doc);
        }
    });
});


app.post("/movies/:id", function(req, res){
    var newNote = new Note(req.body);

    newNote.save(function(err, doc){
        if(err){
            console.log(err);
        }else{
            db.Movies.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id}).exec(function(err, doc){
                if(err){
                    console.log(err);
                }
                else{
                    res.send(doc);
                }
            });
        }
    });
});



var port = 8890;

app.listen(process.env.PORT || port, function(){
    console.log('server running on port' + port);
});
