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

function playGame () {

  // Get a new key from the random words API
  var queryURL = "http://random-word-api.herokuapp.com/key?";
  axios.get(queryURL).then( function (response) {
    randomWordsAPIKey = response.data;
    console.log("random Words API KEY = " + randomWordsAPIKey); 
    //Get a random word from the random words API
    var queryURL = "https://random-word-api.herokuapp.com/word?key=" + randomWordsAPIKey + "&number=1"; 
    console.log (queryURL); 
    axios.get(queryURL).then(
      //After word is returned, Call the dictionary API to get the word's meaning. 
      function(response){
            //console.log (response); 
            var randomWord  = response.data[0];
            //console.log(randomWord);
            if (randomWord) { 
              queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + randomWord + "?key=dad0f8c2-a1fd-43bf-8d5c-961c9715161e";
              axios.get(queryURL).then (             
                function(response) {
                  var secretWord = new Word( randomWord, response.data[0].shortdef );
                  secretWord.showHint( false ); 
                  console.log(secretWord.getWord());
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



//Uses 'inquirer' package to accept and return the next guess from the user.
function promptForLetter ( secretWord ) {

  var questions = [
    {
      type: 'input',
      name: 'userGuess',
      message: "Guess a letter! (? for hint)",
      validate : function (value) {

        console.log(JSON.stringify(value, '', 2)); 

        if (value == "?") {
          secretWord.showHint ( false ); 
        }
        return true; 
      }
    }
  ];


  
  inquirer.prompt(questions).then(answer => {

    //console.log ("answer = " + answer.userGuess); 
   
    //indexOf returns -1 if the letter is not in the array.
    //Only test answers that have not been attempted before. 

    if ( (answer.userGuess != "?") && (attemptedLetters.indexOf( answer.userGuess ) < 0 )) {
          
      // Save it so we don't test it again.
      attemptedLetters.push ( answer.userGuess ); 

        
        secretWord.matchLetter( answer.userGuess );
        
        //console.log (JSON.stringify( secretWord, null , 2)); 
        
        if ( secretWord.hasLetter( answer.userGuess ) === false ) {
          attemptsRemaining--; 
          console.log (`\n${attemptsRemaining} attempts remaining.\n`);
          if ( attemptsRemaining === 0) {
            console.log ("\nSorry.  You Lost.\n"); 
            secretWord.setAllGuessed();
            secretWord.showHint( true ) ; 
          }
          else {
            //guess was incorrect, but there are still chances left.
            console.log ("\Wrong!");
            console.log("\n" + secretWord.getWord() + "\n" );
            promptForLetter (secretWord);
          }
        }
        else if ( secretWord.hasLetter( answer.userGuess ) === true ) {
          guessSuccessful = secretWord.isAllGuessed();
          if ( guessSuccessful ) {
            secretWord.showHint( true );
            console.log ("\nCorrect! You won.\n"); 
          }
          else  {
            //Letter still not all guessed, prompt for letter again.
            console.log ("\nCorrect!\n");
            console.log("\n" + secretWord.getWord() + "\n" );
            promptForLetter ( secretWord );
          }
        }
      } 
      else {
        //Letter already attempted, prompt for another letter
        promptForLetter( secretWord ); 
      }
 });
  
}

playGame();