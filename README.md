# Aggregio
Music Service Aggregator Built on the Mern Stack

I originally built Aggregio so that I could have one place to play all my music. It makes use of both MusicKit js and spotify's web api and webplayback sdk. These apis are desktop only, and surprisingly MusicKit js doesn't support safari so the only browsers it has been tested to work on are Chrome and Firefox. According to official documentation from the APIs, Edge browser isn't fully supported to bugs may be experienced. With that being said here's the documentation: 
          
                                    Table of Contents
1. Schema and Validation
2. API Routes
3. Configuration files needed 
4. Redux Stores, Actions, and Reducers
5. Components Directory Map
6. Utils 

                                1. Schema and Validation 

  The database schema is designed for MongoDB and is used by using mongoose to connect to the database which is hosted on mlab.
It consists of 7 fields: name, email, password, library, albums, playlist, and date. The library field is used to track the tracks in a user's library. The library is an array of an object which consists of these fields: name, artist, album, id, artwork, duration_ms, apple (to distinguish if the track is an apple music trac or not), and uri. The album field is used to track the albums a user has saved and it is also an array of objects, consisting of: artistName, albumName, id, artwork, apple, and uri. The playlist field is used to track any user playlists; the playlist object consists of an array of tracks, and a playlist name. 

  There are five validation files for sanitation before the request to the database is made by the apis. Register.js makes sure that the fields are present and that the emails field is actually an email. Login.js does the same thing. Song.js and Album.js also make sure the fields are present, and check if the artwork url is actually a url. All four of those files use is-empty.js which checks if the passed value is either undefined, null, an empty object, or an empty string. 
  
                               2. API Routes 
                               
GET api/spotify/login - passes a redirect to spotify's portal with the scopes: "user-read-private streaming user-modify-playback-state user-read-birthdate user-read-playback-state user-read-email". That redirect than calls api/spotify/callback.

GET api/spotify/callback - checks if the state is mismatched and returns an error otherwise, if there are no errors the api redirects back to the main page with the refresh token and access token added to the parameters of the url. 

GET api/spotify/callback - Is passed a refresh token in the query of the call, at which point it returns a new access Token

GET, PRIVATE, api/songs/library - returns the current user's library 

GET, PRIVATE, api/songs/albums - returns the current user's albums 

GET, PRIVATE api/songs/playlist - returns the current user's playlists 

POST, PRIVATE api/songs/addToPlaylist/:id - adds a song to a specific playlist which is specified by the id given to the url, returns success or various errors

DELETE, PRIVATE api/songs/removeFromPlaylist/:id/:songId - removes a specific song from a specific playlist, :id is the playlist id, and :songId is the id for the song, returns success or various errors 

POST, PRIVATE api/songs/playlist - adds a playlist to the user, returns the user object or various errors 

DELETE, PRIVATE api/songs/playlist/:id - removes a playlist from the user, returns success or various errors

POST, PRIVATE api/songs/library - adds a song to the users library, either returns an object representing the user or various errors

DELETE, PRIVATE api/songs/library/:id - deletes a song with the specified id from the user's library, either returns sucess or various errors

POST, PRIVATE api/songs/albums - posts an album to the user's album section, either returns an object representing the user or various errors 

DELETE, PRIVATE api/songs/album/:id - deletes an album with a specified id from the user's album section, either returns success or various errors

POST, PUBLIC api/users/register - registers a user, creates a hash from their password using bcrypt and stores that hash in the database, either returns an object representing the new user or various errors 

POST, PUBLIC api/users/login - logins a user, uses bcrypt.compare to compare the two hashes on success a token is signed with jwt and an object is return with success as true and an authorization token with 'Bearer ' + the token. Else returns various errors

GET, PRIVATE api/users/current - returns the current user 

                               3. Config Files Needed
                               
These will be under a config directory in the root directory 

keys.js - should contain two exports 'mongoURI' which is the uri to your mongodb and 'secretOrKey' which is either secret or key 
passport.js - a configuration file for passport-jwt 
spotifykeys.js - should contain two eports "spotifyClientId" and "spotifyClientSecret" 

Directory: musickit-token: contains musickit-token-encoder.js which takes a file called AuthKey.p8 also in the root of musickit-token, a teamId, and a keyId which then exports appleToken which is signed with ES256. 

                              4. Redux Stores and Actions
Stores: 
  Auth - contains the user object and whether or not the user isAuthenticated (token has expired)
  Errors - contains an object which will get dispatched errors recieved across the application
  Search - contains objects for apple and spotify track, apple and spotify albums, and apple and spotify artists, contains booleans to see if those objects are loading 
  Spotify - contains isAuthenticated to represent if Spotify has been authenticated, also contains the current accessToken and the refreshToken needed make the request to refresh the accessToken
  Library - contains an array of albums, songs, playlists, and loadingAlbums, loadingSongs, and loadingPlaylist which indicate            if library resources are loading
  Queue - contains an array of track or albums items, from which the first item is dispatched to the players
  
Actions (if any actions experience errors they dispatch GET_ERRORS): 
  authActions: registerUser, loginUser, setCurrentUser, logoutUser 
  errorActions: clearErrors
  libraryActions: getSongs, getAlbums, getPlaylists, addSong, addAlbum, removeAlbum, removeTrack, addToPlaylist, createPlaylist, deletePlaylist, removeTrackFromPlaylist, setTracksLoading, setAlbumsLoading, setPlaylistsLoading
  queueActions: addSongToQueue, clearQueue
  searchActions: searchArtist, searchTrack, searchAlbum, nextTracks, nextAlbums, setAppleArtistLoading, setAppleAlbumLoading, setAppleTrackLoading, setSpotifyArtistLoading, setSpotifyAlbumLoading, setSpotifyTrackLoading
  spotifyActions: loginSpotify, refreshSpotify, and setCurrentTokens 
  
  Types that are dispatched from the actions can be found in /src/actions/types.js 
  
                                5. Components 
                                
Component Directory: authorization: components: AuthorizeMusicServices (contains the buttons to authorize apple music), Login (contains the login form), Register (contains the form to register a user) 

Component Directory: common: components: PrivateRoute (returns a component its wrapping if the user is authenticated or redirects to login if the user is not) 

Component Directory: layoutcomponents: Footer (footer of the app), LandingPage (landing page for the application), NavigationBar (NavBar which displays songs, albums, playlists, settings, and logout if authenticated or sign up and login if the user is not)

Component Directory: mainpage: Main (Gets the access and refresh tokens once the user logins to spotify, also renders the searchbar), SearchBar (takes in user input and searches for the input) 

Component Directory: mediaplayers: AppleMusicPlayer (contains the players for apple music), GeneralMusicPlayer (parent component that either redirects to the apple player or spotify player depending on the queue), SpotifyPlayer (contains the player for spotify)

Component Directory: search: AlbumItem (displays album contents of an object), TrackItem (displays track contents of an object), SearchResults (Maps the search results from the search actions to either album or track items)

Component Directory: settings: Settings (user can authorize apple music and spotify from here) 

Component Directory: usercomponents: Albums (maps user albums to AlbumItem), Songs (maps user library to TrackItems), Playlists (for each playlist maps playlist track to PlaylistTrackItem)

Component Directory: Logout: Button which triggers the logoutUser action 

Index - renders App

App - parent component sets localstorage for login items, contains application routes

                              6.Utils 
                              
setAuthToken.js - if the authorization token exists it either deletes the authorization header or sets it                             
                            
                
  
  
