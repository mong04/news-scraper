const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('../models/Article.js');
const Note = require('../models/Note.js');
const app = express();


// Scraping tools
const request = require('request');
const cheerio = require('cheerio');

// Set mongoose to use built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// GET request to display initial page
router.get('/', function(req, res) {
    console.log("hello")
    // Grab all docs
    Article.find({}).sort({date: -1}).exec(function(error, doc) {
        // Log errors
        if (error) {
            console.log(error);
        }
        // Render doc to browser
        var data = {data: doc};
        res.render("index", data);
    });
});

// PUT request to update saved status on db
router.put('/save/:id', function(req, res) {
    Article.update({_id: req.params.id}, {$set: {saved: true}}, function(err, doc) {
        // Log errors
        if (err) {
            console.log(err)
        }
        // Log doc
        else {
            res.sendStatus(200);
        }
    });
});

// GET request to scrape website
router.get('/scrape', function(req, res) {
    // Request to grab body of the html
    request("https://techcrunch.com/", function(error, response, html) {
        // Load html into cheerio save it to $ for shorthand
        var $ = cheerio.load(html);

        // Grab each article
        $(".river-block").each(function(i, element) {
            
            // Save an empty result object
            var result = {};

            // Add text, link, description for each article
            result.title = $(this).attr("data-sharetitle");
            result.link = $(this).attr("data-permalink");
            result.description = $(this).children('div .block-thumb').children('div .block-content').children('p').text();

            // Create entry using Article model
            var entry = new Article(result);

            // Save entry to db
            entry.save(function(err, doc) {
                // Log errors
                if (err) {
                    // console.log(err);
                }
                // Log doc
                else {
                    // console.log(doc);
                }
            });
        });
    });
    // Tell browser we finished scraping
    res.sendStatus(200);
});

// GET request to retrieve articles with a saved status
router.get('/saved', function(req, res) {
    // Grab all saved docs
    Article.find({saved: true}, function(error, doc) {
        // Log errors
        if (error) {
            console.log(error);
        }
        // Render doc to browser
        var data = {data: doc};
        res.render("saved", data);
    });
});

// POST request to create a new and add it to article
router.post("/articles/:id", function(req, res) {
    var newNote = new Note(req.body);
    console.log(req.body);

    newNote.save({"body": req.body}, function(error, doc) {
        if (error) {
            console.log(error);
        }
        else {
            Article.findOneAndUpdate({"_id": req.params.id}, {"notes": doc._id})
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(doc);
                }
            })
        }
    })
})

// PUT request to remove article from saved articles
router.put('/:id', function(req, res) {
    Article.update({_id: req.params.id}, {$set: {saved: false}}, function(err, doc) {
        // Log errors
        if (err) {
            console.log(err)
        }
        // Loc doc
        else {
            res.redirect('/saved');
        }
    });
})

module.exports = router;