# week18MongoAssignment
This application scrapes IMDB top 250 movies page and displays the results to the user on the index of the site. Results are dumped into a a Mongo database with an ORM bulit using Mongoose. You can leave comments (notes) on each movie post. The comments that are left are stored in another database and you can view them on the Quotes route. Users can also delete posts, and scraping the database drops it as well, this prevents duplicate data from being added. 

## Heroku Link:  <a href='https://mighty-scrubland-96199.herokuapp.com/'><h>https://mighty-scrubland-96199.herokuapp.com/</h2></a>

## If your running locally...

#### Required Node Packages
* express
* express-handlebars
* mongoose
* body-parser
* cheerio
* request

#### Defualt DB Name : mongodb://localhost/Movie
