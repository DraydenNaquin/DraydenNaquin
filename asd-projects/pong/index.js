/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  
  // Game Item Objects

  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();
  
  

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
var player1Score = 0;
var player2Score = 0;

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
    endBall(ball, "#gameItem");
    paddleCollision(ball, paddle1);
    paddleCollision(ball, paddle2);
    endplayer();
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

function endplayer() {
  if (player1Score === 10){
    alert("Player 1 wins!");
    endgame();
  }
  if (player2Score === 10){
    alert("Player 2 wins!");
    endgame();
  }
}

  function startBall() {
    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.x = 300;
    ball.y = 200;
    ball.speedX = randomNum;
    ball.speedY = randomNum;
  }

  function moveBall(bop) {
    $("#gameItem").css('top', bop.y);
    bop.y = bop.y + bop.speedY;
    if (bop.y > boardHeight || bop.y < 0) {
        bop.speedY = -bop.speedY;
    }
}

function paddleCollision(ball, paddle) {
  if (
    ball.x + ball.width > paddle.x && 
    ball.x < paddle.x + paddle.width && 
    ball.y + ball.height > paddle.y && 
    ball.y < paddle.y + paddle.height 
  ) {
    // Collision detected
    ball.speedX = -ball.speedX; 
    
    ball.speedY += paddle.speedY / 2; 
  }
}


//makes things move
  function gameMovement(toy) {
    toy.x += toy.speedX;
    toy.y += toy.speedY;
  $(toy.id).css("left", toy.x);
  $(toy.id).css("top", toy.y);
}

    //acts on keydown
  function handleKeyDown(event) {
     if (event.which === KEY.UP) {
        paddle2.speedY = -6;
    } 
     if (event.which === KEY.DOWN) {
        paddle2.speedY = 6;
    } 
     if (event.which === KEY.W) {
        paddle1.speedY = -6;
    }
     if (event.which === KEY.S) {
        paddle1.speedY = 6;
    }
  }

  //acts on keyup
  function handleKeyUp(event) {
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      paddle2.speedY = 0;
    }
    if (event.which === KEY.W || event.which === KEY.S) {
      paddle1.speedY = 0;
    }
  }

  // used paramiters for reuse
function wallCollision(gameItem, gameId) {
// Calculate the boundaries of the board
var topWall = 0;
var bottomWall = boardHeight - $(gameId).outerHeight();
  // Check if the game item is about to move beyond the boundaries
  if (gameItem.y < topWall) {
    gameItem.y = topWall;
  }
  if (gameItem.y > bottomWall) {
    gameItem.y = bottomWall;
  }
}

function endBall(gameItem, gameId) {
  var leftWall = 0;
  var rightWall = boardWidth - $(gameId).outerWidth(); 

  if (gameItem.x <= leftWall) {
    player2Score += 1; 
    $("#scoreP2").text(player2Score);
    startBall();
  }
  if (gameItem.x > rightWall) {
    player1Score += 1; 
    $("#scoreP1").text(player1Score);
    startBall(); 
  }
}
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
