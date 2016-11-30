var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var stormpath = require('express-stormpath');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre =require('./models/category');
Book =require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://calico:lilith69@ds113608.mlab.com:13608/calico_cat');
var db = mongoose.connection;

app.use(stormpath.init(app,{
	website: true
}));

app.get('/', function(req, res){
	res.send('Please use /api/books or /api/category');
});

app.get('/api/category', function(req, res){
	Category.getCategory(function(err, category){
		if(err){
			throw err;
		}
		res.json(category);
	});
});

app.post('/api/category', function(req, res){
	var category = req.body;
	Category.addCategory(category, function(err, category){
		if(err){
			throw err;
		}
		res.json(category);
	});
});

app.put('/api/category/:_id', function(req, res){
	var id = req.params._id;
	var category = req.body;
	Category.updateCategory(id, category, {}, function(err, category){
		if(err){
			throw err;
		}
		res.json(category);
	});
});

app.delete('/api/category/:_id', function(req, res){
	var id = req.params._id;
	Category.removeCategory(id, function(err, category){
		if(err){
			throw err;
		}

		res.json(category);
	});
});

app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});


app.on('stormpath.ready', function () {
  console.log('Stormpath Ready!');
});

app.listen(process.env.PORT || 3000);
console.log('Running on port' + (process.env.PORT || 3000));