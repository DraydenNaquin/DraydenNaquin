/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
  // Game Item Objects
  var walker = {
    "positionX": 0,
     "speedX": 0,
     "positionY": 0,
     "speedY": 0,
   }

   var walker2 = {
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
   "W": 87,
   "A": 65,
   "S": 83,
   "D": 68,
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
    repositionGameItem(walker); // update's the walker position based on its speed
    wallCollision(walker, "#walker"); // prevent the walker from crossing the board 
    redrawGameItem(walker, "#walker", "left", "top");
    repositionGameItem(walker2); // update's the walker position based on its speed
    wallCollision(walker2, "#walker2"); // prevent the walker from crossing the board 
    redrawGameItem(walker2, "#walker2", "right", "bottom"); // redraw the walker at a new position
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
function repositionGameItem(walker0) {
  walker0.positionX += walker0.speedX;
  walker0.positionY += walker0.speedY;
}

// Redraws the walker to the new location depending on the position
function redrawGameItem(walker0, walkerID, pos1, pos2) {
  $(walkerID).css(pos1, walker0.positionX);
  $(walkerID).css(pos2, walker0.positionY);
}
// CORE LOGIC...

// Changes the speed depending on the arrow key that is pressed
function handleKeyDown(event) {
  if (event.which === KEY.ENTER) {
    console.log("enter pressed");
  } else if (event.which === KEY.LEFT) {
      walker.speedX = -5;
  } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
  } else if (event.which === KEY.UP) {
      walker.speedY = -5;
  } else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
  } else if (event.which === KEY.A) {
      walker2.speedX = -5;
  } else if (event.which === KEY.D) {
      walker2.speedX = 5;
  } else if (event.which === KEY.W) {
      walker2.speedY = -5;
  } else if (event.which === KEY.S) {
      walker2.speedY = 5;
  }
}

function handleKeyUp(event) {
  if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
    walker.speedX = 0;
  } else if (event.which === KEY.UP || event.which === KEY.DOWN) {
    walker.speedY = 0;
  } else if (event.which === KEY.A || event.which === KEY.D) {
    walker2.speedX = 0;
  } else if (event.which === KEY.W || event.which === KEY.S) {
    walker2.speedY = 0;
  }
}

// used paramiters for reuse
function wallCollision(walker0, walkerID) {
  // Get the dimensions of the board
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();

  // Calculate the boundaries of the board
  var leftWall = 0;
  var topWall = 0;
  var rightWall = boardWidth - $(walkerID).outerWidth(); // Subtract walker's width
  var bottomWall = boardHeight - $(walkerID).outerHeight();

  // Check if the walker is about to move beyond the boundaries
  // Adjust walker's position if necessary
  if (walker0.positionX < leftWall) {
    walker0.positionX = leftWall;
  }
  if (walker0.positionX > rightWall) {
    walker0.positionX = rightWall;
  }
  if (walker0.positionY < topWall) {
    walker0.positionY = topWall;
  }
  if (walker0.positionY > bottomWall) {
    walker0.positionY = bottomWall;
  }
}
