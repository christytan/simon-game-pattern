const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

/* start game  */
$(document).keydown(function () {
  if (!start) {
    nextSequence();
  }
  start = true;
});

/* next random color pattern */
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

/* user click pattern */
$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

/* helper function */

/* animation */
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

/* sound animation */
function playSound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

/* customer pattern w game pattern */
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GAME OVER. Press any key to restart");
    startOver();
  }
}

/* reset game */
function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
