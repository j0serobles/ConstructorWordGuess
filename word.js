/* .NAME
 *   word.js
 * .WHAT
 *   Contains a constructor, Word that depends on the Letter constructor. This is used to create 
 *   an object representing the current word the user is attempting to guess. 
 * .AUTHOR
 *   engjoserobles@gmail.com
 * .DATE
 *   21-AUG-2019
 */
 
//Import the Letter module
var letterObject = require ('./letter.js'); 

var Word = function ( aString, definitions ) { 
    this.letters = []; // Stores the letters in the word as array of "letterObect" objects.

    for ( var i = 0; i < aString.length; i++ ) {
        var aLetter = new letterObject (aString.charAt(i)) ; 
        this.letters.push( aLetter ); 
    }

    this.definitions = definitions; // An array of strings with definitions for the word

};


Word.prototype.getWord = function() {

    letterArray = []; // Stores each character from the letterObject in an array.

    this.letters.forEach(  function (element, index) {
        letterArray[index] = element + ' '; //Cast each letterObject to a string to call toString on the object. 
    } );

    return ( letterArray.join('') ); 
};

//Calls Letter.matchLetter to update the 'guessed' status on the letter.
//Return true if a hit, false otherwise.
Word.prototype.matchLetter  = function( aCharacter ) {

    this.letters.forEach ( function(letterObj, index) {
      letterObj.matchLetter( aCharacter ); 
    });

};

Word.prototype.isAllGuessed = function () {
    
    var returnValue =  true; 
    this.letters.forEach ( function ( letterObject, index ) { 
      if (letterObject.hasBeenGuessed === false){
          returnValue = false; 
      }
    });
    return returnValue;  
};


Word.prototype.setAllGuessed = function () {   
    this.letters.forEach ( function ( letterObject, index ) { 
      letterObject.hasBeenGuessed = true;
    });
};

Word.prototype.hasLetter  = function ( aCharacter ) { 
    var returnValue = false;
    this.letters.forEach( function ( letterObject, index ) {
       if (letterObject.theCharacter === aCharacter ) { 
           returnValue = true;
       }
    });
    return returnValue; 
};

Word.prototype.showHint = function ( all ) { 

    //console.log (JSON.stringify(this.definitions, '', 2)); 
    if (!this.definitions) { 
        console.log ("\n" + "Sorry.  No hints available.\n"); 
    }

    if (!all) { 
        console.log ("\nHint :" + this.definitions[0] +"\n");
    } else {
        console.log ( "\n" + this.getWord() + ":"); 
        this.definitions.forEach ( function (meaning, index) {
          console.log (`\n* ${meaning}`);
        }); 
      }
}

module.exports = Word;