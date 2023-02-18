let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
var userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text(`Level ${level}`);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function (e) {
    var UserChosenColor = $(this).attr("id");
    userClickedPattern.push(UserChosenColor);

    playSound(UserChosenColor);

    animatePress(UserChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence(){
    userClickedPattern = [];

    level ++;
    $("#level-title").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}


function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}


function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);

          }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
