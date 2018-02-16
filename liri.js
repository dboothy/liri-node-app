require("dotenv").config();

var keys 	= require("./keys.js");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require("request");

var fs 		= require('fs');

var input   = process.argv;




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
else if (input[2] === "movie-this"){
	getMovieInfo();
	// do all omdb related stuff here	
}else if (input[2] === "do-what-it-says"){
	doSomething();
	// do file stuff here
}else{
	console.log("I don't know that =/")
}


function getMusic(){ 
	var spotify = new Spotify(keys.spotify);
	var song = "" 
	if (input.length > 4 && input[3] != "" || input[3] != undefined){ 
		var array = [] 
		for (i = 3; i < input.length; i++){
			array.push(input[i].trim());
			array.push(" ")
		}
		song = array.join('')
	} 
	else if(input[3] === "" || input[3] === undefined) {
		song = "Y.M.C.A"
	}
	else {
		song = input[3]
	}
	
	spotify.search({ type: 'track', query: song })
	  .then(function(response) {
		//Artist(s)
		//console.log("array",response.tracks)
		for(var i = 0;  i< response.tracks.items.length; i++){
			console.log("\n")
			console.log("Artist: " + response.tracks.items[i].album.artists[0].name);
		 	// console.log(response)
			// The song's name
			console.log("Song: " + response.tracks.items[i].name)
			// A preview link of the song from Spotify
			console.log("Preview link of the song: " + response.tracks.items[i].preview_url)

			console.log("Album:  " + response.tracks.items[i].album.name)
			console.log("\n")
			// The album that the song is from
		}

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
			array.push(" ")
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


function getMovieInfo(){
	var query = "";
	if (input.length > 4 && input[3] != "" || input[3] != undefined){ 
		var array = [] 
		for (i = 3; i < input.length; i++){
			if(input[i] != input.length){
				array.push(input[i].trim() + "+");
			}
			else {
				array.push(input[i].trim());
			}	
		}
		query = array.join('')
	} 
	else if(input[3] === "" || input[3] === undefined) {
		query = "the matrix"
	}
	else {
		query = input[3]
	}
	

	request(`http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`, 
		function(error, response, body) {
	
	
			// console.log("The movie's rating is: " + JSON.parse(body));
			var data = JSON.parse(body)
			// console.log(data.Actors)
			var movie = {Title : data.Title,
						Year: data.Year,
						IMDB: data.Ratings[0].Value,
						RT: data.Ratings[1].Value,
						Country: data.Country,
						Language: data.Language,
						Plot: data.Plot,
						Actors: data.Actors}
			console.log(
			` Movie: ${movie.Title} \n Year: ${movie.Year} \n IMDB Rating: ${movie.IMDB} \n Rotten Tomatoes: ${movie.RT} \n Country: ${movie.Country} \n Language: ${movie.Language} \n Plot: ${movie.Plot} \n Actors: ${movie.Actors} \n  `
			)
		});	
}

function doSomething(){
	fs.readFile('./random.txt', 'utf8', function(err, contents) {
		if(err){
			console.log("error",err);
		}else{
			console.log(contents);
		}
	});
}



