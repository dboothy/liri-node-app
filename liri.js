
require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

// var client = new Twitter(keys.twitter);

var input = process.argv;

// evaluate if the input at the second index is:
if (input[2] === "my-tweets"){
	getTweet() 
	//console.log("tweet")	// do all twitter related stuff her

}
else if (input[2] === "spotify-this-song"){
	getMusic()
	console.log("")
	// do all spotify related stuff here





}
// else if (input[2] === "movie-this"){
// 	console.log("film")
// 	 // do all omdb related stuff here
// }else if (input[2] === "do-what-it-says"){
// // 	console.log("say")
// // 	// read the file
// // 	// do file stuff here
// }else{

// console.log("I don't know that =/")
// }
	/*


	* `my-tweets`

	* `spotify-this-song`

	* `movie-this`

	* `do-what-it-says`


	*/







// var spotify = new Spotify(keys.spotify)


// // console.log(process.argv[2])



// request("omdb.com", function (error, response, body) {
// console.log("error:", error)
// console.log('statusCode:', response && response.statusCode);

// }

	function getMusic(){ 
		var spotify = new Spotify(keys.spotify);
		spotify
		  .search({ type: 'track', query: 'River' })
		  .then(function(response) {
		  	console.log("\n")
// 		  	Artist(s)
				console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
				 // console.log(response)
// The song's name
				console.log("Song: " + response.tracks.items[0].name)
// A preview link of the song from Spotify
				console.log("Preview link of the song: " + response.tracks.items[0].preview_url)

				console.log("Album:  " +)
// The album that the song is from
		  })
		  .catch(function(err) {
		    console.log(err);
		  });
	}




 function getTweet(){
 	var client = new Twitter(keys.twitter);
	var handle = "";

	if (input.length - 3 >1){ 
		var array = [] 
		for (i = 3; i < input.length; i++){
			array.push(input[i]);
		}
		handle = array.join('')
	} else if (input[3] === undefined || input[3] === ""){
		console.log("tweet better")
		handle = 'deadmau5'
	}
	else{
		handle = input[3];
	}

	var params = {screen_name: handle};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	     
	    // loop 20 times
	    for (var i = 0; i <20; i++){
	    	console.log("\n");
		    console.log(tweets[i].created_at)
		    console.log(tweets[i].text)
	    	 // created_at
	    	// text
	    }
	   
	  } else {
	  	console.log("\n");
	  	console.log("try another twitter user")
	  	console.log("\n");
	  }
	});
}



