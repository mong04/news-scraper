// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const logger = require('morgan');
var methodOverride = require("method-override");


// Initialize Express
const app = express();

// Set up Express-Handlebars
app.set('views', path.join(__dirname, './app/views'));
console.log(path.join(__dirname, './app/views'));
app.engine('handlebars', exphbs(
    {
        extname      : 'handlebars',
        layoutsDir   : './app/views/layouts',
        defaultLayout: 'main',
        helpers      : './app/views/helpers',
        partialsDir  : './app/views/partials'
        
    }
));
app.set('view engine', 'handlebars');

// Set app dependencies
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(methodOverride("_method"));

// Make public a static dir
app.use(express.static('public'));

// Database config for mongoose
mongoose.connect('mongodb://localhost/newsScraper', 'mongodb://heroku_wws73gs9:u4iiclh3bvhh3nr58k3at525hq@ds161443.mlab.com:61443/heroku_wws73gs9', {
    useMongoClient: true
});
var db = mongoose.connection;

// Show mongoose errors
db.on('error', function(error) {
    console.log('Mongoose Error: ', error);
});

// Show success message if logged in
db.once('open', function() {
    console.log('Mongoose connection successful.');
});

var routes = require('./app/controllers/news-controller');
app.use('/', routes);

// Set port
const port = process.env.port || 3000;

app.listen(port, function() {
    console.log(`App running on port ${port}`);
});