const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateAlbum(data){
    let errors = {};
    data.albumName = !isEmpty(data.albumName) ? data.albumName: '';
    data.artistName = !isEmpty(data.artistName) ? data.artistName: '';
    data.id = !isEmpty(data.id) ? data.id: '';
    data.artwork = !isEmpty(data.artwork) ? data.artwork: '';
    data.uri = !isEmpty(data.uri) ? data.uri: '';

    if(!Validator.isURL(data.artwork)){
        errors.artwork = "Artwork url is not valid";
    }
    if(Validator.isEmpty(data.albumName)){
        errors.albumName = "Album Name is required";
    }
    if(Validator.isEmpty(data.artistName)){
        errors.artistName = "ArtistName is required";
    }
    if(Validator.isEmpty(data.id)){
        errors.id = "Id is required";
    }
    if(Validator.isEmpty(data.artwork)){
        errors.artwork = "Artwork is required";
    }
    if(Validator.isEmpty(data.uri)){
        errors.uri = "URI is required";
    }
    if(data.apple === undefined){
        errors.apple = "Apple field is required"
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};