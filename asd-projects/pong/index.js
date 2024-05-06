/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  
  // Game Item Objects

  
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
  
 

  function createItem(id, speedX, speedY) {
    var game = {};
    game.id = id;
    game.x = parseFloat($(id).css("left"));;
    game.y = parseFloat($(id).css("top"));;
    game.speedX = speedX;
    game.speedY = speedY;
    game.width = $(id).width();;
    game.height = $(id).height();; 
    return game; 
  }

  

var paddle1 = createItem("#leftPaddle", 0, 0);
var paddle2 = createItem("#rightPaddle", 0, 0);
var ball = createItem("#gameItem", 0, 0);
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    gameMovement(paddle1); 
    gameMovement(paddle2);
    gameMovement(ball);
    wallCollision(paddle1, "#leftPaddle");
    wallCollision(paddle2, "#rightPaddle");
    moveBall(ball);
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function startBall() {
    ball.x = 260;
    ball.y = 260;
    ball.speedX = 2;
    ball.speedY = 2;
  }

  function moveBall(bop) {
    

    const boardWidth = $("#board").width();
    const boardHeight = $("#board").height();

    $("#gameItem").css('left', bop.x);
    $("#gameItem").css('top', bop.y);

    bop.x = bop.x + bop.speedX;
    bop.y = bop.y + bop.speedY;
    
    if (bop.x > boardWidth || bop.x < 0) {
        bop.speedX = -bop.speedX;
    } 
    
    if (bop.y > boardHeight || bop.y < 0) {
        bop.speedY = -bop.speedY;
    }
}


  function gameMovement(toy) {
    toy.x += toy.speedX;
    toy.y += toy.speedY;
  $(toy.id).css("left", toy.x);
  $(toy.id).css("top", toy.y);
}

  function handleKeyDown(event) {
      if (event.which === KEY.UP) {
        paddle2.speedY = -5;
    } else if (event.which === KEY.DOWN) {
        paddle2.speedY = 5;
    } else if (event.which === KEY.W) {
        paddle1.speedY = -5;
    } else if (event.which === KEY.S) {
        paddle1.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      paddle2.speedY = 0;
    } else if (event.which === KEY.W || event.which === KEY.S) {
      paddle1.speedY = 0;
    }
  }

  // used paramiters for reuse
function wallCollision(gameItem, gameId) {
  // Get the dimensions of the board
  const boardWidth = $("#board").width();
  const boardHeight = $("#board").height();

  // Calculate the boundaries of the board
  var leftWall = 0;
  var topWall = 0;
  var rightWall = boardWidth - $(gameId).outerWidth(); 
  var bottomWall = boardHeight - $(gameId).outerHeight();

  // Check if the walker is about to move beyond the boundaries
  if (gameItem.x < leftWall) {
    gameItem.x = leftWall;
  }
  if (gameItem.x > rightWall) {
    gameItem.x = rightWall;
  }
  if (gameItem.y < topWall) {
    gameItem.y = topWall;
  }
  if (gameItem.y > bottomWall) {
    gameItem.y = bottomWall;
  }
}
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
