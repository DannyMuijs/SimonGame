// basic naming

var colorTiles = ["green", "red", "yellow", "blue"];
var gamePatternAi = [];
var gamePatternUser = [];
var level = 0;
var start = false;


// change the name
$(document).keypress(function() {
  if (!start) {
    $("h1").text("level " + level);
    aiSelecting();
    start = true;
  }
});


// random tiles selected
function aiSelecting() {
  level++;
  gamePatternUser = [];
  var aiTurn = Math.floor(Math.random() * colorTiles.length);
  var aiInput = colorTiles[aiTurn];
  gamePatternAi.push(aiInput);



  $("." + aiInput).addClass(".pressed");
  $("#" + aiInput).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $("." + aiInput).removeClass(".pressed");

  var audio = new Audio("sounds/" + aiInput + ".mp3");
  audio.play()
}


// user is selecting tiles

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  gamePatternUser.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  answers(gamePatternUser.length - 1);
});

// check if the answers are correct
function answers(currentLevel) {

  if (gamePatternAi[currentLevel] === gamePatternUser[currentLevel]) {
    if (gamePatternUser.length === gamePatternAi.length)
      setTimeout(function() {
        aiSelecting();
      }, 1000);

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startNewGame();
  }
}
// restart game
function startNewGame() {
  level = 0
  gamePatternAi = [];
  gamePatternUser = [];
  start = false;
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
