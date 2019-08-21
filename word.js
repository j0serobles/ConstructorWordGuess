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

var Word = function ( aString ) { 
    this.letters = []; // Stores the letters in the word as array of "letterObect" objects.

    for ( var i = 0; i < aString.length; i++ ) {
        var aLetter = new letterObject (aString.charAt(i)) ; 
        this.letters.push( aLetter ); 
    }
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
Word.prototype.contains  = function( aCharacter ) {

    this.letters.forEach ( function(letterObj, index) {
      letterObj.matchLetter( aCharacter ) ; 
    });

};

module.exports = Word;