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
    // Grab all docs
    Article.find({}, function(error, doc) {
        // Log errors
        if (error) {
            console.log(error);
        }
        // Render doc to browser
        var data = {data:doc};
        console.log(data);
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
        // Loc doc
        else {
            console.log(doc);
        }
    })
})

// GET request to scrape website
router.get('/scrape', function(req, res) {
    console.log("Scrape functionality: Being Built");
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
                    console.log(err);
                }
                // Log doc
                else {
                    console.log(doc);
                }
            });
        });
    });
    // Tell browser we finished scraping
    res.sendStatus(200);
})
router.get('/saved', function(req, res) {
    // Grab all saved docs
    Article.find({saved: true}, function(error, doc) {
        // Log errors
        if (error) {
            console.log(error);
        }
        // Render doc to browser
        var data = {data:doc};
        console.log(data);
        res.render("saved", data);
    });
});
router.delete('/:id', function(req, res) {
    console.log(req.params.id);
    res.render('saved');
})

module.exports = router;