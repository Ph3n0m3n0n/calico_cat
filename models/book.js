var mongoose = require('mongoose');

// Genre Schema
var bookSchema = mongoose.Schema({
	title: {
		type: 'String',
		required: 'true'
	},
	genre: {
		type: 'String',
		required: true
	},
	description: {
		type: 'String'
	},
	author: {
		type: 'String',
		required: true
	},
	publisher: {
		type: 'String'
	},
	pages: {
		type: 'String'
	},
	img_url: {
		type: 'String'
	},
	buy_bn_url: {
		type: 'String'
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Function to GET books
module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
}

// Function to GET one book by its ID
module.exports.getBookById = function(id, callback){
	Book.findById(id, callback);
}

// ADD a book function
module.exports.addBook = function(book, callback){
	Book.create(book, callback);
}

// Update a genre function
module.exports.updateBook = function(id, book, options, callback){
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		img_url: book.img_url,
		buy_bn_url: book.buy_bn_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeBooks = function(id, callback){
	var query = {_id: id};
	Book.remove(query, callback);
}