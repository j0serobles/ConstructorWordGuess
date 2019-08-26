# ConstructorWordGuess
 * [Overview](#overview)

 * [How To Run](#howToRun)
 
 * [File Structure](#FileStructure)
 
 * [Demo movie](#Demo)
 
 * [Technologies Used](#techsUsed)
 
 * [How To Install](#howToInstall)
 
 * [Support](#support)
 
 
### Overview <a name="overview"></a>

ConstructorWordGuess is an advanced javascript application to showcase the implementation of object constructors in the language.
The application uses a command line interface to prompt the user for letters that must match those in a randomly selected word.
The program selects the word from an API and creates the internal objects needed for playing the game.
The user has a fixed amount of failed guesses (3) before the game ends and a new word is selected. The game also ends (and a new word selected) when all the letters are guessed correctly.

### How To Run <a name="howToRun"></a>

ConstructorWordGuess is very simple to use, just login to your system's command line interpreter (with the node.js environment already setup), and run:
```
node index.js
```
The command above will connect to the Random Words API to select a random word .  It will also connect to the Merriam-Webster's dictionary API to get a list of definitions for the word selected randomly (These will be provided as hints to the user). The user can then enter a letter and the program will match the entered character with any of the letters that compose the random word. The user can press the question mark ("?") character to see a hint for the selected word.  


### File Structure <a name="FileStructure"></a>

```
+-+.gitignore -- Files to be ignored by git (node packages and such).
  |
  + README.md -- (This file)
  |
  + letter.js -- Module for the Letter object. 
  |
  + word.js -- Module for the Word object 
  |
  + index.js  -- Contains the program's logic
  |
  + package-lock.json	-- Created by npm -init
  |
  + package.json  -- Created by npm -init
  |
  + assets + -- Application assets, currently empty
  |
  + design + -- Design Documentation
           |
           + Game_Play_Diagram.drawio -- Flowchart for the Game Play function.
           |
           + Main_Logic_Flowchart_Diagram.drawio -- Flowchar for the main application logic. 
```

### Demo <a name="Demo"></a>

A movie showing a sample session for ConstructorWordGuess can be accessed <a href="https://engjoserobles-gmail.tinytake.com/tt/MzcyNjQwNV8xMTM0MDg1NQ" target="_blank">here</a>

**NOTE**: For better viewing, set the movie player to "Full Size". 

Following the movie link will replace your current page and take you to the video player's website. 

### Technologies Used <a name="techsUsed"></a>

ConstructoWordGuess is built using javascript and runs in the node.js engine.  It has various dependencies:

* npm package 'axiom' for http GET calls to the API's.
* npm package 'inquirer' for prompting and processing the user's input. 

### How To Install <a name="howToInstall"></a>

To install the application on your local machine:
1. Clone the GitHub Repository for [ConstructorWordGuess](https://github.com/j0serobles/ConstructorWordGuess) on your local machine.
2. Run ```npm install``` to install all dependencies (node packages needed by by the application)
  
  ``` 
  npm install 
  (install messages displayed)
  ```
  
  4. Test your installation, for example:
  ```
  node index.js
  ```
  
  ### Support <a name="support"></a>
  If you have any issues installing or using the app, send me a notification at [engjoserobles@gmail.com](mailto:engjoserobles@gmail.com)
  

