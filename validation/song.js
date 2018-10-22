const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateSong(data){
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name: '';
    data.artist = !isEmpty(data.artist) ? data.artist: '';
    data.album = !isEmpty(data.album) ? data.album: '';
    data.id = !isEmpty(data.id) ? data.id: '';
    data.artwork = !isEmpty(data.artwork) ? data.artwork: '';
    data.duration_ms = !isEmpty(data.duration_ms) ? data.duration_ms: '';
    data.uri = !isEmpty(data.uri) ? data.uri: '';


    if(!Validator.isURL(data.artwork)){
        errors.artwork = "Artwork url is not valid";
    }
    if(Validator.isEmpty(data.name)){
        errors.name = "Name is required";
    }
    if(Validator.isEmpty(data.artist)){
        errors.artist = "Artist is required";
    }
    if(Validator.isEmpty(data.album)){
        errors.album = "Album is required";
    }
    if(Validator.isEmpty(data.id)){
        errors.id = "Id is required";
    }
    if(Validator.isEmpty(data.artwork)){
        errors.artwork = "Artwork is required";
    }
    if(Validator.isEmpty(data.duration_ms)){
        errors.duration_ms = "Duration is required";
    }
    if(Validator.isEmpty(data.uri)){
        errors.uri = "URI is required";
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};