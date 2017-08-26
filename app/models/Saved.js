// Require mongoose
var mongoose = require('mongoose');
// Create Schema class
var Schema = mongoose.Schema;

// Create Saved schema
var SavedSchema = new Schema({
    // img is a required string
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    img: {
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
    }
});

// Create Saved model with SavedSchema
var Saved = mongoose.model("Saved", SavedSchema);

// Export model
module.exports = Saved;