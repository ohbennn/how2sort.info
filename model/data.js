"use strict";

var mongoose = require('mongoose');
var config = require('../config.js'); 

if (config.environment == "localhost") {
	mongoose.connect(config.dev_db);
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));
var Schema = mongoose.Schema;


var itemSchema = new Schema({
	itemID: {
		type: String, unique: true
	}, 
	name: {
		type: String, default: ""
	}, 
	languageID: {
		type: String
	}, 
	description: {
		type: String
	}, 
	categoryID: {
		type: String
	}, 
	imageID: {
		type: String
	}
}, {
	collection: "items"
});


var languageSchema = new Schema({
	languageID: {
		type: String, unique: true
	}, 
	name: {
		type: String, default: ""
	}, 
	abbreviation: {
		type: String, default: ""
	}
}, {
	collection: "languages"
});


var categorySchema = new Schema({
	categoryID: {
		type: String, unique: true
	}, 
	name: {
		type: String, default: ""
	}, 
	languageID: {
		type: String
	}, 
	iconID: {
		type: String
	}, 
	locationID: {
		type: String
	}
}, {
	collection: "categories"
});


var iconSchema = new Schema({
	iconID: {
		type: String, unique: true
	}, 
	url: {
		type: String
	}
}, {
	collection: "icons"
});


var locationSchema = new Schema({
	locationID: {
		type: String, unique: true
	}, 
	name: {
		type: String
	}
}, {
	collection: "locations"
});


var imageSchema = new Schema({
	imageID: {
		type: String, unique: true
	}, 
	url: {
		type: String
	}
}, {
	collection: "images"
});


var searchLogSchema = new Schema({
	words: {
		type: String
	}, 
	timeStamp: {
		type: Date
	}
}, {
	collection: "searchLogs"
});


var schema = {
	'Item': mongoose.model('Item', itemSchema), 
	'Language': mongoose.model('Language', languageSchema), 
	'Category': mongoose.model('Category', categorySchema), 
	'Icon': mongoose.model('Icon', iconSchema), 
	'Location': mongoose.model('Location', locationSchema), 
	'Image': mongoose.model('Image', imageSchema), 
	'SearchLog': mongoose.model('SearchLog', searchLogSchema)
}

module.exports = schema;
