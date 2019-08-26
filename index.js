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

var attemptsRemaining = 3; 
var guessSuccessful   = false;
var userGuess         = '';
var randomWordsAPIKey = '';
var attemptedLetters  = [];
var queryURL          = '';

function playGame () {

  attemptedLetters.length = 0;
  userGuess               = ''; 
  guessSuccessful         = false; 
  attemptsRemaining       = 3;

 
  console.log("\n\n-----------------------------------------------------\nI'm thinking of a random word... please wait."); 
  //Get a random word from the random words API
  var queryURL = "https://random-word-api.herokuapp.com/word?key=" + randomWordsAPIKey + "&number=1"; 
  axios.get(queryURL).then(
    //After word is returned, Call the dictionary API to get the word's meaning. 
    function(response) {
      var randomWord  = response.data[0];
      if (randomWord) { 
        queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + randomWord + "?key=dad0f8c2-a1fd-43bf-8d5c-961c9715161e";
        axios.get(queryURL).then (             
          function(response) {
            var secretWord = new Word( randomWord, response.data[0].shortdef );
            secretWord.showHint( false ); 
            console.log(secretWord.getWord() + "\n");
            //Kick off the chain of recursive calls to promptForLetter()
            promptForLetter( secretWord );
          })
          .catch ( function (error) { 
            logError ( error )
          });
      }  // End if(randomWord)
    }) //End then()
    .catch( function( error ) { 
      logError( error ) 
    });
  }

  function logError (error) { 
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
    };



//Uses 'inquirer' package to accept and process the next guess from the user.
//Possible results are:
// 1) User enters "?" character : The hint is shown.  The user is prompted again.
// 2) User enters a letter not previously entered : The letter is matched to those in the secret Word.
//    The user gets prompted again if there are still chances left and not all of the word is guessed.
//    If all chances are used or the word is fully guessed, the game ends.
// 3) User enters a letter already entered : Letter is pushed into an array an gets prompted again.

function promptForLetter ( secretWord ) {

  // User Prompt:
  var questions = [
    {
      type: 'input',
      name: 'userGuess',
      message: "Guess a letter! (? for hint)",
      filter: function(val) {
        return val.charAt(0);
      }
    }
  ];


  //Process guess entered by the user:
  inquirer.prompt(questions).then(answer => {

    //If user has asked for a hint, show it and prompt again.
    if (answer.userGuess == "?") { 

      secretWord.showHint( false ) ;
      promptForLetter( secretWord ); 
    }
    else if ( attemptedLetters.indexOf( answer.userGuess ) < 0 ) {
      // User has entered a letter not already tried.      
      // Save it so we don't process it again.
      attemptedLetters.push ( answer.userGuess ); 
      //Update Letter objects in Word object with correct "guessed" status.
      secretWord.matchLetter( answer.userGuess );

      // A failed guess
      if ( secretWord.hasLetter( answer.userGuess ) === false ) {
        attemptsRemaining--; 
        console.log ("\Wrong!");
        console.log (`\n${attemptsRemaining} attempts remaining.\n`);
        //This was the last attempt
        if ( attemptsRemaining === 0) {
          console.log ("\nSorry.  You Lost.\n"); 
          secretWord.setAllGuessed();
          secretWord.showHint( true ) ; 
          playGame();
        }
        else {
          //Guess was incorrect, but there are still chances left.
          console.log("\n" + secretWord.getWord() + "\n" );
          promptForLetter (secretWord);
        }
      }
      else if ( secretWord.hasLetter( answer.userGuess ) === true ) {
        //Guess was correct, check if all letter is guessed and end game.
        guessSuccessful = secretWord.isAllGuessed();
        if ( guessSuccessful ) {
          secretWord.showHint( true );
          console.log ("\nCorrect! You won.\n"); 
          playGame();
        }
        else  {
          //Word still not all guessed, prompt for letter again.
          console.log ("\nCorrect!\n");
          console.log("\n" + secretWord.getWord() + "\n" );
          promptForLetter ( secretWord );
        }
      }
      } else {
      //A letter was attempted more than once, do nothing and prompt again
       promptForLetter ( secretWord ); 
      }
 });
}

// Get a Key from the random words API and kick off the game

var queryURL = "http://random-word-api.herokuapp.com/key?";
axios.get(queryURL).then( function (response) {
    randomWordsAPIKey = response.data;
    playGame();
}).catch( function( error ) { 
  logError( error ) 
});