var mongoose = require('mongoose');

// Book Schema
var bookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	category:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	artist:{
		type: String,
		required: true
	},
	img_url:{
		type: String
	},
	buy_bn_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = function(id, callback){
	Book.findById(id, callback);
}

// Add Book
module.exports.addBook = function(book, callback){
	Book.create(book, callback);
}

// Update Book
module.exports.updateBook = function(id, book, options, callback){
	var query = {_id: id};
	var update = {
		title: book.title,
		category: book.category,
		description: book.description,
		artist: book.artist,
		img_url: book.img_url,
		buy_bn_url: book.buy_bn_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeBook = function(id, callback){
	var query = {_id: id};
	Book.remove(query, callback);
}