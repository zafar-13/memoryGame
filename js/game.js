var level = -1;
var gamePattern = [];
var userPattern = [];
var started = false;

const correct = new Audio("sounds/correct.mp3");
const wrong = new Audio("sounds/wrong.mp3");

$(document).keydown(function(event){
    var keyPressed = event.key;
    if(!started && keyPressed === "a"){
        $("#level-title").text("Level "+ level);
        sequence();
        started = true;
    }
});

var randomButton;
//User buttonClick
$(".btn").click(function(event){
    var buttonClicked = $(this).attr("id"); 
    userPattern.push(buttonClicked);
    correct.play();
    animatePress(buttonClicked);
    checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log("success");
        if (userPattern.length === gamePattern.length){
            setTimeout(function () {sequence();}, 1000); 
        }
    } else {
        console.log("wrong"); 
        wrong.play();
        $("body").addClass("game-over");            
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function sequence() {
    userPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    //RandomButton Generator
    randomButton = "button" + Math.floor(Math.random() * 9);
    
    //Storing the Pattern
    gamePattern.push(randomButton);

    console.log(randomButton)
        
    // For showing the last recent button effect
    setTimeout(function () {
        $("#" + randomButton).animate({backgroundColor: '#006d00'}, 300);
        setTimeout(() => {
            $("#" + randomButton).animate({backgroundColor: '#6b6b6b'}, 400);
        }, 500);
    }, 1000);

    // For showing the entire pattern effect
    // for (let i = 0; i < gamePattern.length; i++) {
    //     setTimeout(function () {
    //         $("#" + gamePattern[i]).animate({backgroundColor: '#006d00'}, 300);
    //         setTimeout(() => {
    //             $("#" + gamePattern[i]).animate({backgroundColor: '#6b6b6b'}, 400);
    //         }, 500);
    //     }, i*1000);
    // }
}

function startOver() {
    userPattern = [];
    gamePattern = [];
    started = false;
    level = -1;
    $(document).keydown(function(event){
        var keyPressed = event.key;
        if(!started){
            $("#level-title").text("Level "+ level);
            sequence();
            started = true;
        }
    });
    
}

function animatePress(currentButton) {
    $("#"+ currentButton).addClass("pressed");
    setTimeout(() => {
        $('#'+ currentButton).removeClass("pressed");        
    }, 100);
}


// Press A to start  -Done
// Give a random button -Done
// make the button turn green -Done
// Give another random button
// make the button turn green 
// wait for the user to click in order
// if not in order game over.
