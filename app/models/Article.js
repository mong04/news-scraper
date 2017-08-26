// Require mongoose
var mongoose = require('mongoose');
// Create Schema class
var Schema = mongoose.Schema;

// Create Article schema
var ArticleSchema = new Schema({
    // img is a required string
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    }
});

// Create Article model with ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export model
module.exports = Article;