const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/Article.js');
const Note = require('../models/Note.js');
const Saved = require('../models/Saved.js');
const app = express();


// Scraping tools
const request = require('request');
const cheerio = require('cheerio');

// Set mongoose to use built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// GET request to display initial page
router.get('/', function(req, res) {
    res.render('index');
});

// GET request to scrape website
router.get('/scrape', function(req, res) {
    console.log("Scrape functionality: Being Built");
})
router.get('/saved', function(req, res) {
    var data = {
        articles : [ 
        {
            _id: "1092098ieiskjai303984",
            img: "https://i.ytimg.com/vi/QKydKJKTixo/hqdefault.jpg",
            title: "/pol/ finds Antifa bike-lock attacker",
            description: "4chan, /pol/ finds Antifa bike-lock attacker, Antifa BTFO!"
        },
        {
            _id: "1092098ieiskjai303988",
            img: "https://i.ytimg.com/vi/QKydKJKTixo/hqdefault.jpg",
            title: "/pol/ finds Antifa bike-lock attacker",
            description: "4chan, /pol/ finds Antifa bike-lock attacker, Antifa BTFO!"

        },
        {
            _id: "1092098ieiskjai303984",
            img: "https://i.ytimg.com/vi/QKydKJKTixo/hqdefault.jpg",
            title: "/pol/ finds Antifa bike-lock attacker",
            description: "4chan, /pol/ finds Antifa bike-lock attacker, Antifa BTFO!"
        }]
    };
    res.render('saved', data);
});
router.delete('/:id', function(req, res) {
    console.log(req.params.id);
    res.render('saved');
})

module.exports = router;