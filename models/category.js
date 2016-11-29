var mongoose = require('mongoose');

// Genre Schema
var categorySchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Category = module.exports = mongoose.model('Category', categorySchema);

// Get Category
module.exports.getCategory = function(callback, limit){
	Category.find(callback).limit(limit);
}

// Add Category
module.exports.addCategory = function(category, callback){
	Category.create(category, callback);
}

// Update Genre
module.exports.updateCategory = function(id, category, options, callback){
	var query = {_id: id};
	var update = {
		name: category.name
	}
	Category.findOneAndUpdate(query, update, options, callback);
}


// Delete Genre
module.exports.removeCategory = function(id, callback){
	var query = {_id: id};
	Category.remove(query, callback);
}