var express = require("express");
var request = require("request");
var bodyParse = require("body-parser");

var app = express();
savedMovies = [];

//home page
app.get('/', function(req, res){
  res.render('index.ejs');
});

//index
app.get('/search', function(req, res){

  var searchTerm = req.query.movieTitle;
  var url = "http://www.omdbapi.com/?s=" + searchTerm;

 request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      res.render("results.ejs", {movieList: obj.Search});
    }
  });

// show
app.get ("/movie_info/:movie", function (req, res) {


 var searchID = req.params.movie;
 var url = "http://www.omdbapi.com/?i=" + searchID;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      console.log(obj);
      res.render("movie_info.ejs", {movie: obj});
    }
    });
  });

app.get ("/my_movies", function (req, res) {
	res.render("/my_movies.ejs");
});
// save
app.post ("/save", function (res, req) {
	savedMovies.push(res.body.movie.title);
	console.log(savedMovies);
	res.redirect("/my_movies");
});
});

app.listen(3000);
