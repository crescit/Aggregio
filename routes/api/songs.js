const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Validator = require('validator');

//load song and user model
const User = require('../../models/User');

const validateSongInput = require('../../validation/song');

// @route   GET api/songs/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
    return res.json({msg: "Songs works"})
});

// @route POST api/songs/addToPlaylist/:id
// @desc  Add song to a playlist
// @access Private
router.post('/addToPlaylist/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    let errors = {};
    User.findOne({_id: req.user.id}).then(user => {
        const playlistIndex = user.playlist.map(item => item._id.toString()).indexOf(req.params.id);
        if(playlistIndex === -1){
            errors.notfound= "Playlist not found with that id";
            return res.status(400).json(errors.notfound);

        }else{
            const {errors, isValid} = validateSongInput(req.body);

            //check if the song is valid
            if(!isValid){
                return res.status(400).json(errors);
            }
            const newSong = {
                name: req.body.name,
                artist: req.body.artist,
                album: req.body.album,
                artwork: req.body.artwork,
                id: req.body.id,
                duration_ms: req.body.duration_ms,
                uri: req.body.uri,
                apple: req.body.apple
            };
            user.playlist[playlistIndex].songs.push(newSong);
            user.save().then(user => res.json(user)).catch(err => res.json({error: err}));
        }


    }).catch(err => res.status(404).json({error: 'user not found'}))
});

// @route DELETE api/songs/removeFromPlaylist/:id(playlsit id)/:songId
// @desc  Remove a specific song from a specific playlist
// @access Private
router.delete('/removeFromPlaylist/:id/:songId', passport.authenticate('jwt', {session: false}), (req, res) => {
    let errors = {};
    User.findOne({_id: req.user.id}).then(user => {
        const playlistIndex = user.playlist.map(item => item._id.toString()).indexOf(req.params.id);
        if(playlistIndex === -1){
            errors.playlistnotfound= "Playlist not found with that id";
            return res.status(400).json(errors.playlistnotfound);
        }
        const songIndex = user.playlist[playlistIndex].songs.map(item => item._id.toString()).indexOf(req.params.songId);
        if(songIndex === -1){
            errors.songnotfound = "Song not found in that playlist";
            return res.status(400).json(errors.songnotfound);
        }
        user.playlist[playlistIndex].songs.splice(songIndex, 1);
        user.save();
        return res.json({success: 'success'});

    }).catch(err => res.status(404).json({errors: 'user not found'}))
});

// @route POST api/songs/playlist
// @desc  Add Playlist
// @access Private
router.post('/playlist', passport.authenticate('jwt', {session : false}), (req, res) => {
    let errors = {};
    if(req.body.name === undefined || Validator.isEmpty(req.body.name)){
        errors.noname = "No playlist name given";
        return res.status(400).json(errors);
    }
    User.findOne({_id: req.user.id}).then(user => {
        const playlistIndex = user.playlist.map(item => item.playlistName.toString()).indexOf(req.body.name);
        if(playlistIndex !== -1){
            return res.status(400).json({alreadyexists: 'playlist already exists'});
        }else{
            const newPlaylist = {
                playlistName: req.body.name,
                songs: []
            };
            user.playlist.push(newPlaylist);
            user.save().then(user => res.json(user)).catch(err => res.json({error: err}));
        }

    }).catch(err => res.status(404).json({error: 'nouserfound'}));
});

// @route DELETE api/songs/playlist
// @desc  delete a Playlist
// @access Private
router.delete('/playlist/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
    errors = {};

    User.findOne({_id: req.user.id}).then(user => {
        const playlistIndex = user.playlist.map(item => item._id.toString()).indexOf(req.params.id);
        if(playlistIndex === -1){
            return res.status(400).json({doesnotexist: 'playlist does not exist'});
        }else{
            user.playlist.splice(playlistIndex, 1);
            user.save();
            return res.json({success: 'success'});
        }

    }).catch(err => res.status(404).json({error: 'nouserfound'}));
});


// @route POST api/songs/library
// @desc  Adds song to user's library
// @access Private
router.post('/library',  passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateSongInput(req.body);

    //check if the song is valid
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({_id: req.user.id})
        .then(user => {
            const newSong = {
                name: req.body.name,
                artist: req.body.artist,
                album: req.body.album,
                artwork: req.body.artwork,
                id: req.body.id,
                duration_ms: req.body.duration_ms,
                uri: req.body.uri,
                apple: req.body.apple
            };
            user.library.push(newSong);
            user.save().then(user => res.json(user)).catch(err => res.json({error: err}));
        })
        .catch(err => res.status(404).json(err));

});
// @route DELETE api/songs/library/:id (song id)
// @desc  Remove song from user's library
// @access Private
router.delete('/library/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    User.findOne({_id: req.user.id}).then(user => {
        if(user.library.filter(song => song._id.toString()).length === 0){
            return res.status(404).json({libraryempty: 'library is empty'});
        }
        const removeIndex = user.library.map(item => item._id.toString()).indexOf(req.params.id);
        if(removeIndex === -1){
            return res.status(404).json({songnotfound: 'song not found'});
        }else {
            user.library.splice(removeIndex, 1);
            user.save();
            return res.json({success: 'success'});
        }
    }).catch(err => res.status(404).json({nouserfound: 'No user found with that id'}));

});

module.exports = router;
