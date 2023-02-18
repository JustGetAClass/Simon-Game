let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
var userClickedPattern = [];
let level = 0;
let started = false;

if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
}

$(".btn").click(function (e) {
    var UserChosenColor = $(this).attr("id");
    userClickedPattern.push(UserChosenColor);

    playSound(UserChosenColor);

    animatePress(UserChosenColor);
});


function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    level ++;
    $("#level-title").text(`Level ${level}`);
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


// $("body").keypress(function (e) {
//     if (e.key === "a") {
//         nextSequence();
//     }
// });
