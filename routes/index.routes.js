const router = require("express").Router();
const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));


/* GET home page */
router.get("/", (req, res, next) => {
  // res.send("soy el home")
  // res.render("index");
  res.render("search-form")
});

router.get("/artist-search-results", (req, res, next) => {
  const { artist } = req.query

  spotifyApi
    .searchArtists(artist)
    .then(data => {
      console.log('The received data from the API: ', data.body.artists.items);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      let info = data.body.artists.items
      console.log('----------', info[0].images)
      res.render('artist-search-results', { info })
      // console.log(artist.items)
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));


})

router.get('/albums/:artistId', (req, res, next) => {

  const { artistId } = req.params

  spotifyApi
    .getArtistAlbums(artistId)
    .then(data => {
      console.log("soy el id", artistId)
      res.render(artistId)
    })


});

module.exports = router;


