var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/client'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

// Connect to mongoose
mongoose.connect('mongodb://localhost/calico_cat');
var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Hello World from Calico Cat!');
});

app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if (err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if (err){
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/genres/:id', function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if (err){
			throw err;
		}
		res.json(genre);
	});
});

app.delete('/api/genres/:id', function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.removeGenres(id, genre, {}, function(err, genre){
		if (err){
			throw err;
		}
		res.json(genre);
	});
});

app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if (err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if (err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, books){
		if (err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if (err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/book/:id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.removeBooks(id, book, {}, function(err, book){
		if (err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log('Server started on port 3000');