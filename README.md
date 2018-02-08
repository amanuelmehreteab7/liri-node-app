# liri-node-app

1.) use the omdb js file, from this project rather than the one downloaded with npm will not work due to needing api key. It would be easier just to copy and paste this index.js file into the omdb directory. But, changing line 208 to `    needle.request('get', HOST, `apiKey=trilogy&plot=full&t=${query.t}`, function (err, res, movie) {
`
and replacing all the tomato logic around line 280 to `tomato: movie.Ratings[1].Value,`


2.) add `>> log.txt` to the end of your commands if you want to save your standard outputs

    ex. node liri.js spotify-this-song "Hey Ya" >>log.txt
