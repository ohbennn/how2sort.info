"use strict";
var db = require('../model/data.js');
var path = require('path');
var async = require('async');
var viewPath = path.join(__dirname, '..', 'views');

var config = require('../config.js');


module.exports = {

	/*
		{ abbr: "", language: "" }
	*/
	addNewLanguage: function(req, res) {
		if (!req.body.abbr || !req.body.language) {
			console.log("no language post!");
			return res.send("fail");
		}
		var abbr = req.body.abbr;
		var name = req.body.language;
		db.Language.findOne({
			name: name, 
			abbreviation: abbr
		}, function(err, data) {
			if (err) {
				return res.send(err.toString());
			}
			if (data) {
				return res.send("the language has existed");
			}

			var language = db.Language({
				name: name, 
				abbreviation: abbr
			});
			language.languageID = language._id;
			language.save(function(err, data) {
				if (err) {
					return res.send(err.toString());
				}
				return res.send("success");
			});
		});
	}, 

	/*
		{ loc: "" }
	*/
	addNewLocation: function(req, res) {
		if (!req.body.loc) {
			console.log("no location post!");
			return res.send("fail");
		}
		var loc = req.body.loc;
		db.Location.findOne({
			name: loc
		}, function(err, data) {
			if (err) {
				return res.send(err.toString());
			}
			if (data) {
				return res.send("the location has existed");
			}
			var location = db.Location({
				name: loc
			});
			location.locationID = location._id;
			location.save(function(err, data) {
				if (err) {
					return res.send(err.toString());
				}
				return res.send("success");
			});
		});
	}, 

	/* 
		{ language: "", location: "" }
	*/
	updateCategories: function(req, res) {
		if (!req.body.language || !req.body.location) {
			console.log("no language given");
			return res.send("fail");
		}
		var abbr = req.body.language;
		var location = req.body.location;
		db.Location.findOne({
			name: location
		}, function(err, theLocation) {
			if (err) {
				return res.send(err.toString());
			}

			var locationID = ""
			if (theLocation) {
				locationID = theLocation.locationID;
			} else {
				return res.send("location doesn't exist");
			}

			db.Language.findOne({
				abbreviation: abbr
			}, function(err, lan) {
				if (err) {
					return res.send(err.toString());
				}

				var languageID = "";
				if (lan) {
					languageID = lan.languageID;
				} else {
					return res.send("language doesn't exist");
				}
				var categories = config.categories;

				async.each(categories, function(theCategory, callback) {
					db.Category.remove({
						name: theCategory, 
						languageID: languageID, 
						locationID: locationID, 
						iconID: ""
					}, function(err, data) {
						if (err) {
							return res.send(err.toString());
						}

						var category = db.Category({
							name: theCategory, 
							languageID: languageID, 
							locationID: locationID, 
							iconID: ""
						});
						category.categoryID = category._id;
						category.save(function(err, data) {
							if (err) {
								return res.send(err.toString());
							}

							callback(null);
						});
					});
				}, function(err) {
					if (err) {
						return res.send(err.toString());
					}
					return res.send("success");
				});
			});
		});
	},  

	/*
		{ itemName: "", language: "", categoryName: "", categoryLocation: "" }
	*/
	addNewItem: function(req, res) {
		if (!req.body.itemName || !req.body.language || !req.body.categoryName || !req.body.categoryLocation) {
			console.log("item or language or category or location not posted!");
			return res.send("fail");
		}

		var itemName = req.body.itemName;
		var language = req.body.language;
		var categoryName = req.body.categoryName;
		var categoryLocation = req.body.categoryLocation;
		var description = (req.body.description == undefined || req.body.description == null) ? "" : req.body.description;

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
				name: categoryLocation
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

				db.Category.findOne({
					locationID: locationID, 
					languageID: languageID, 
					name: categoryName
				}, function(err, theCat) {
					if (err) {
						return res.send(err.toString());
					}

					var categoryID = ""; 
					if (theCat) {
						categoryID = theCat.categoryID; 
					} else {
						return res.send("category doesn't exist");
					}

					var item = db.Item({
						name: itemName, 
						languageID: languageID, 
						categoryID: categoryID, 
						description: description, 
						imageID: ""
					});
					item.itemID = item._id; 

					item.save(function(err, data) {
						if (err) {
							return res.send(err.toString());
						}

						return res.send("success");
					});
				});
			});

		});
	}
}