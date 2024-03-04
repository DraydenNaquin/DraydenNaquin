/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
  // Game Item Objects
  var walker = {
    "positionX": 0,
     "speedX": 0,
     "positionY": 0,
     "speedY": 0,
   }
   
   //Key Code
  var KEY = {
   "ENTER": 13,
   "LEFT": 37,
   "UP": 38,
   "RIGHT": 39,
   "DOWN": 40,
   };

function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(); // update's the walker position based on its speed
    wallCollision(); // prevent the walker from crossing the board 
    redrawGameItem(); // redraw the walker at a new position
  }
  
  /* 
  Called in response to events.
  */
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
// SETUP...

// This positions the walker depending on speed and position
function repositionGameItem() {
  walker.positionX += walker.speedX;
  walker.positionY += walker.speedY;
}

// Redraws the walker to the new location depending on the position
function redrawGameItem() {
  $("#walker").css("left", walker.positionX);
  $("#walker").css("top", walker.positionY);
}
// CORE LOGIC...

// Changes the speed depending on the arrow key that is pressed
function handleKeyDown(event) {
  if (event.which === KEY.ENTER) {
    console.log("enter pressed");
  } else if (event.which === KEY.LEFT) {
      walker.speedX = -5;
      walker.speedY = 0; // Reset speedY to prevent diagonal movement
  } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
      walker.speedY = 0; // Reset speedY
  } else if (event.which === KEY.UP) {
      walker.speedY = -5;
      walker.speedX = 0; // Reset speedX
  } else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
      walker.speedX = 0; // Reset speedX
  }
}

function handleKeyUp(event) {
  if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
    walker.speedX = 0;
  } else if (event.which === KEY.UP || event.which === KEY.DOWN) {
    walker.speedY = 0;
  }
}

function wallCollision() {
  // Get the dimensions of the board
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();

  // Calculate the boundaries of the board
  var leftWall = 0;
  var topWall = 0;
  var rightWall = boardWidth - $("#walker").outerWidth(); // Subtract walker's width
  var bottomWall = boardHeight - $("#walker").outerHeight();

  // Check if the walker is about to move beyond the boundaries
  // Adjust walker's position if necessary
  if (walker.positionX < leftWall) {
    walker.positionX = leftWall;
  }
  if (walker.positionX > rightWall) {
    walker.positionX = rightWall;
  }
  if (walker.positionY < topWall) {
    walker.positionY = topWall;
  }
  if (walker.positionY > bottomWall) {
    walker.positionY = bottomWall;
  }
}
