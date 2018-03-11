"use strict"; 

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var db = require('./model/data.js');
var manager = require('./routes/manager.js');
var updateDB = require('./routes/updateDB.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, "views")));

app.listen(process.env.PORT || 3000, function() {
	console.log('listen on port 3000...');
});



/********* update database  ************/
app.post('/newLanguage', updateDB.addNewLanguage);
app.post('/newLocation', updateDB.addNewLocation);
app.post('/updateCategories', updateDB.updateCategories);
app.post('/newItem', updateDB.addNewItem);


app.get('/', manager.index);
app.post('/categories', manager.getCategories);
app.post('/getItemCategory', manager.getItemCategory);