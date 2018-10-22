const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load song and user model
const Song = require('../../models/Song');
const User = require('../../models/User');

const validateSongInput = require('../../validation/song');

// @route   GET api/songs/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
    return res.json({msg: "Songs works"})
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
            user.library.unshift(newSong);
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
