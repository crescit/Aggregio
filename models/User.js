//file defining the schema for the user
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    library: [{
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
    }],
    albums: [{
        artistName: {
            type: String,
            required: true
        },
        albumName: {
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
        apple: {
            type: Boolean,
            required: true
        },
        uri: {
            type: String,
        }
    }],
    playlist: [{
       playlistName: {
           type: String,
           required: true
       }, songs: [{
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
        }]
    }],
    date: {
        type: Date,
        default: Date.now()
    },
});
module.exports = User = mongoose.model('users', UserSchema);
