/* .NAME
 *   index.js
 * .WHAT
 *   Contains a constructor, Letter. This constructor should be able to either display an 
 *   underlying character or a blank placeholder (such as an underscore), depending on whether 
 *   or not the user has guessed the letter.
 * .AUTHOR
 *   engjoserobles@gmail.com
 * .DATE
 *   21-AUG-2019
 */
 
  var Letter = function ( aCharacter ) { 
     this.theCharacter = aCharacter; 
     this.hasBeenGuessed = false;

 }

 Letter.prototype.toString = function() { 
     if ( this.hasBeenGuessed ) {
       return ( this.theCharacter ) ; 
     }
     else {
         return ( "_" ); 
     }
 }

 Letter.prototype.matchLetter  = function( aCharacter ) {
     if ( this.theCharacter.toLowerCase() === aCharacter.toLowerCase() ) {
         this.hasBeenGuessed = true;
     }
 }

 module.exports = Letter;