const express = require('express');
const router = express.Router();
const spotifykeys = require('../../config/spotifykeys');
var querystring = require('querystring');
const axios = require('axios');
const client_id = spotifykeys.spotifyClientId;
const client_secret = spotifykeys.spotifyClientSecret;
const redirect_uri = "http://localhost:5000/api/spotify/callback";

/*
The GET request is sent to the /authorize endpoint of the Accounts service:

GET https://accounts.spotify.com/authorize

QUERY PARAMETER	VALUE
client_id	Required.
When you register your application, Spotify provides you a Client ID.
response_type	Required.
Set to code.
redirect_uri	Required.
The URI to redirect to after the user grants or denies permission.
This URI needs to have been entered in the Redirect URI whitelist
that you specified when you registered your
application. The value of redirect_uri here must exactly match
one of the values you entered when you registered your application,
including upper or lowercase, terminating slashes, and such.
scope	Optional.
A space-separated list of scopes.If no scopes are specified, authorization
will be granted only to access publicly available information: that is,
only information normally visible in the Spotify desktop, web, and mobile players.
 */

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
var stateKey = 'spotify_auth_state';

// @route GET api/spotify/login
// @desc  redirects user to login to get auth code and state
// @access Private
router.get('/login', (req, res) => {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    var scope = 'user-read-private streaming user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});
// @route GET api/spotify/callback
// @desc  gets callback
// @access Private
router.get('/callback', (req, res) => {

    const url = 'https://accounts.spotify.com/api/token';
    const reqBody = {
        url: url,
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret
    };
    return res.json(reqBody);
});


module.exports = router;
