var express = require('express');
var path = require('path');
var http = require('http');
var mapperController = require('./mapperController');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

app.use(bodyParser());
app.use(express.static(path.join(__dirname, './../')));

app.get('/getsavedurls', mapperController.findAllArticles);
app.post('/', mapperController.createArticle);

app.listen(3000);
