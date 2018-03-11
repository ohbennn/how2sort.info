"use strict";
var db = require('../model/data.js');
var path = require('path');
var async = require('async');
var viewPath = path.join(__dirname, '..', 'views');

var config = require('../config.js');

module.exports = {
	index: function(req, res) {
		res.sendFile(path.join(viewPath, 'index.html'));
	}, 

	/*
		{ language: "", location: "" }
	*/
	getCategories: function(req, res) {
		if (!req.body.language || !req.body.location) {
			console.log("no language or location posted");
			return res.send("fail");
		}

		var language = req.body.language;
		var location = req.body.location;

		db.Language.findOne({
			abbreviation: language
		}, function(err, theLan) {
			if (err) {
				return res.send(err.toString());
			}
			var languageID = "";
			if (theLan) {
				languageID = theLan.languageID;
			} else {
				return res.send("language doesn't exist");
			}

			db.Location.findOne({
				name: location
			}, function(err, theLoc) {
				if (err) {
					return res.send(err.toString());
				}
				var locationID = "";
				if (theLoc) {
					locationID = theLoc.locationID;
				} else {
					return res.send("location doesn't exist");
				}

				db.Category.find({
					locationID: locationID, 
					languageID: languageID
				}, function(err, categories) {
					if (err) {
						return res.send(err.toString());
					}

					var names = [];
					categories.forEach(function(theCat) {
						names.push(theCat.name);
					});

					return res.send(names);
				});
			});
		});
	}, 

	/*
		{ item: "", location: "", language: "" }
	*/
	getItemCategory: function(req, res) {
		if (!req.body.item || !req.body.location || !req.body.language) {
			console.log("no item or no location or no language posted");
			return res.send("fail");
		}

		var item = req.body.item; 
		var location = req.body.location; 
		var language = req.body.language; 

		db.Language.findOne({
			abbreviation: language
		}, function(err, theLan) {
			if (err) {
				return res.send(err.toString());
			}
			var languageID = "";
			if (theLan) {
				languageID = theLan.languageID;
			} else {
				return res.send("language doesn't exist");
			}

			db.Location.findOne({
				name: location
			}, function(err, theLoc) {
				if (err) {
					return res.send(err.toString());
				}
				var locationID = "";
				if (theLoc) {
					locationID = theLoc.locationID;
				} else {
					return res.send("location doesn't exist");
				}

				db.Item.find({
					name: new RegExp(item, "i")
				}, function(err, items) {
					if (err) {
						return res.send(err.toString());
					}

					var bucket = [];

					async.each(items, function(theItem, callback) {
						var categoryID = theItem.categoryID;

						db.Category.findOne({
							categoryID: categoryID, 
							languageID: languageID
						}, function(err, theCategory) {
							if (err) {
								return res.send(err.toString());
							}
							if (theCategory) {
								var oneObj = {};
								oneObj.item = theItem.name; 
								oneObj.description = theItem.description;
								oneObj.category = theCategory.name;
								bucket.push(oneObj);
							}
							callback(null);
						});
					}, function(err) {
						if (err) {
							return res.send(err.toString());
						}

						return res.send(bucket);
					});
				});
			});
		});
	}
}