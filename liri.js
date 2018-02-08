require('dotenv').config();

let
	keys = require('./key'),
	Spotify = require('node-spotify-api'),
	Twitter = require('twitter'),
	arguments = process.argv,
	{
		exec
	} = require('child_process'),
	omdb = require('omdb'),
	fs = require('fs'),
	params = {
		screen_name: '@AmanuelMehrete1',
		count: 20
	};

const
	spotify = new Spotify(keys.spotify),
	client = new Twitter(keys.twitter);

if(arguments[2] === 'spotify-this-song') {
	if(arguments[3] === undefined) {
		spotify
			.search({
				type: 'track',
				query: 'The Sign'
			})
			.then(function(response) {
				console.log(`Artists: ${response.tracks.items[5].album.artists[0]
            .name} \nTrack: ${response.tracks.items[5]
              .name} \nPreview link of the song from Spotify: ${response
                .tracks.items[5].external_urls.spotify} \nAlbum: ${response
                  .tracks.items[5].album.name}`);
			})
			.catch(function(err) {
				console.log('b', err);
			});
	} else {
		spotify
			.search({
				type: 'track',
				query: arguments[3]
			})
			.then(function(response) {
				console.log(`========\nArtists: ${response.tracks.items[0].album.artists[0]
          .name} \nTrack: ${response.tracks.items[0]
            .name} \nPreview link of the song from Spotify: ${response
              .tracks.items[0].external_urls.spotify} \nAlbum: ${response
                .tracks.items[0].album.name} \n========`);
			})
			.catch(function(err) {
				console.log('b', err);
			});
	}
} else if(arguments[2] === 'my-tweets') {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		for(var i = 0; i < tweets.length; i++) {
			tweets[i],
				console.log(`========\n${i+1}: ${tweets[i].text}, \nTime: ${tweets[i]
       .created_at} \n========`);
		}
	});
} else if(arguments[2] === 'movie-this') {
	if(arguments[3] === undefined) {
		omdb.get(`Dope`, true, function(err, movie) {
			if(err) {
				return console.error(err);
			}

			if(!movie) {
				return console.log('Movie not found!');
			}

			console.log(`Title: ${movie.title}
=
Year Released: ${movie.year}
=
IMDB Rating: ${movie.imdb.rating}
=
Tomatoes Rating: ${movie.tomato}
=
Country where Movie was produced: ${movie.countries}
=
Languages that movie is availbe in: ${movie.lang.toString()}
=
Plot: ${movie.plot}
=
Actors in the movie: ${movie.actors.join(', ')}`);
		});
	} else {
		omdb.get(arguments[3], true, function(err, movie) {
			if(err) {
				return console.error(err);
			}

			if(!movie) {
				return console.log('Movie not found!');
			}

			console.log(`Title: ${movie.title}
=
Year Released: ${movie.year}
=
IMDB Rating: ${movie.imdb.rating}
=
Tomatoes Rating: ${movie.tomato}
=
Country where Movie was produced: ${movie.countries}
=
Languages that movie is availbe in: ${movie.lang.toString()}
=
Plot: ${movie.plot}
=
Actors in the movie: ${movie.actors.join(', ')}`);
		});
	}
} else if(arguments[2] === 'do-what-it-says') {
	fs.readFile('./random.txt', 'utf8', (err, data) => {
		var removed_elements = arguments.splice(2, 1, data.split(',')[0], data.split(',')[1].slice(0, -1));
		const cp = exec(`node liri.js ${arguments[2]} ${arguments[3]}`);
		cp.stdout.on('data', (data) => {
			console.log(`${data}`);
		});

		cp.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
		});
	});
} else {
	console.log('fuck off');
}
