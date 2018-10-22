//file defining the schema for a song
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const SongSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    artwork: {
        type: String,
        required: true
    },
    duration_ms: {
        type: String,
        required: true
    },
    apple: {
        type: Boolean,
        required: true
    },
    uri: {
        type: String,
    }
});
module.exports = Song = mongoose.model('song', SongSchema);
