/* .NAME
 *   word.js
 * .WHAT
 *   The file containing the logic for the course of the game, which depends on Word.js.
 * .AUTHOR
 *   engjoserobles@gmail.com
 * .DATE
 *   21-AUG-2019
 */


var axios    = require( 'axios' ); 
var inquirer = require( 'inquirer' );
var Word     = require( './word.js' ); 

function playGame () {

   var attemptsRemaining = 3; 
   var guessSuccessfull  = false;
   var userGuess         = '';

   //Get a random word from the random workds API
   var queryURL = "https://random-word-api.herokuapp.com/word?key=BA1JFNVV&number=1"; 
   
   axios.get(queryURL).then(
       //Then call the dictionary API to get the word's meaning. 
       function(response){
           
           //console.log (response); 

           var randomWord = response.data[0];
           //console.log(randomWord);

           if (randomWord) { 

             queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + randomWord + "?key=dad0f8c2-a1fd-43bf-8d5c-961c9715161e";
           
             axios.get(queryURL).then ( 
            
               function(response) {
                   response.data[0].shortdef.forEach ( function (meaning, index) {
                   console.log (`\n* ${meaning}`);
                   }); 
                   var secretWord = new Word( randomWord );
                   while ( attemptsRemaining > 0 || !guessSuccessful ) {
                       userGuess = promptForLetter(); 
                       secretWord.contains( userGuess );
                       console.log(secretWord.getWord());
                   }
               }
           
           );
        }
       })
       .catch(function(error) {
           if (error.response) {
             // The request was made and the server responded with a status code
             // that falls out of the range of 2xx
             console.log("---------------Data---------------");
             console.log(error.response.data);
             console.log("---------------Status---------------");
             console.log(error.response.status);
             console.log("---------------Status---------------");
             console.log(error.response.headers);
           } else if (error.request) {
             // The request was made but no response was received
             // `error.request` is an object that comes back with details pertaining to the error that occurred.
             console.log(error.request);
           } else {
             // Something happened in setting up the request that triggered an Error
             console.log("Error", error.message);
           }
           console.log(error.config);
         });
}

//Uses 'inquirer' package to accept and return the next guess from the user.
function promptForLetter () {
  
}

playGame();