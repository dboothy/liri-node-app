require("dotenv").config();

// npm for authentication management

var keys 	= require("./keys.js");

//pAth to file containing keys


var Twitter = require('twitter');

//initializes twitter npm package 

var Spotify = require('node-spotify-api');

// '' ' '  ' ' '' '' '' spotify

var request = require("request");

//............. request

var fs 		= require('fs');

//.................fs

var input   = process.argv;

// method for gathering input from user

var song    = ""; 

//song query passed to spotify as string


// evaluate if the input at the second index is:

/*condition specifies command before inputting a twitter handle */

if (input[2] === "my-tweets"){
	getTweet() 
	//console.log("tweet")	// do all twitter related stuff her
}
/*specifies command before inputting a song to search for on spotify, placed on the third argument*/
else if (input[2] === "spotify-this-song"){
	getMusic()
	// do all spotify related stuff here
}
else if (input[2] === "movie-this"){
	getMovieInfo();
	// do all omdb related stuff here	
}else if (input[2] === "do-what-liri-says"){
	/*command reads a file using fs*/
	console.log("woohoo I get to do what I want")
	doSomething();
	// do file stuff here
}else{ /*specifies otherwise if none of the above commands are passed along the third argument, and then output will produce below's string*/
	console.log("I don't know that =/")
}

function getMusic(){ 
	if(input.length > 4 && input[3] != "" || input[3] != undefined){
	/*if the length of the input is passed the normal argument for the input and when comman is not empty and command is not undefined, all of the inputs will be placed into an array*/
		var array = [] 
		for (i = 3; i < input.length; i++){
			array.push(input[i].trim());
			array.push(" ")
	/*for loop takes all of the indices of array into a string separated by spaces */
		}
	// the indices become strings separated by spaces and passed through the 4th argument 
		song = array.join('')
	}//if the inputs are empty or undefined, liri will search the song YMCA
	else if(input[3] === "" || input[3] === undefined) {
		song = "Y.M.C.A"
	// if the song is an empty array, empty string, undefined, same work
	}
	else if(song === [] || song === "" || input[3] === undefined){
		song = "Y.M.C.A"
	}
	//otherwise the query will be the 4th argument assigned to song variable
	else {
		song = input[3];
	}
}

function callSpotify(){
//function gathers response from spotify api
	var spotify = new Spotify(keys.spotify);
	spotify.search({ type: 'track', query: song })
	  .then(function(response) {
		//Artist(s)
		//console.log("array",response.tracks)
		for(var i = 0;  i< response.tracks.items.length; i++){
			console.log("\n")
		//formating and for loop iterates through the reponse object for specified information "artist name, song, preview, and album"
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
//this function is used to for calling twitter for input tweets
 	var client = new Twitter(keys.twitter);
//holds keys
	var handle = "";
// handle holds the input value
//conditions controls for the input at 4th argument and greater, input is pushed in an array up to the 
	if (input.length - 3 >1){ 
		var array = [] 
		for (i = 3; i < input.length; i++){
			array.push(input[i]);
			array.push(" ")
//the input string is joined together for the query,
		}
		handle = array.join('')
	} else if (input[3] === undefined || input[3] === ""){
		console.log("tweet better")
		handle = 'deadmau5'
	}
	else{
		handle = input[3];
//if the input is only done at 4th argument above work won't be done
	}
//call to twitter for tweets from specified input handle
	var params = {screen_name: handle};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	     
	    // loop 20 times
	    if(tweets.length > 20){
	    	for (var i = 0; i < 20; i++){
	    	console.log("\n");
		    console.log(tweets[i].created_at)
		    console.log(tweets[i].text)
	    	 // created_at
	    	// text
	    	}
	    }else if(tweets.length === 0){
	    	console.log("sorry no tweets for this acount!")
	    }
	    else{
	    	for (var i = 0; i < tweets.length; i++){
		    	console.log("\n");
			    console.log(tweets[i].created_at)
			    console.log(tweets[i].text)
		    	// created_at
		    	// text
	    	}
	    }
	    
	   
	  } else {
	  	console.log("\n");
	  	console.log("try another twitter user")
	  	console.log("\n");
	  }
	});
}


function getMovieInfo(){
//edge cases for when a user inputs, so if passed argument 4 and if command is preent and if command is not undefined, push all input into array and then separate indices with "+" to format request on api and then .join will put them into a string to pass into 4th argument else if argument 4 is empty st
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
		query = "the matrix";
	//else if argument 4 is empty string, default the query to the Matrix
	}
	//and finally otherwise if those conditions met, just trim the input to edge the spaces
	else {
		query = input[3].trim();
	}
	

	request(`http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`, 
		function(error, response, body) {
			var data = JSON.parse(body)
			if (!error && response.statusCode === 200 && data.Response != 'False') {
				// console.log("The movie's rating is: " + JSON.parse(body));
				
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
			}else{
				console.log("whooops check your movie title and try again")
			}
		});	
}
/*function do something command will read another file and 
located elsewhere*/ 
function doSomething(){
	fs.readFile('./random.txt', 'utf8', function(err, contents) {
		if(err){
			console.log("error",err);
		}else{
			var contentArr = contents.split(",")
			song = contentArr[1].trim();
			callSpotify();
		}
	});
}



