// show one question when page loads, until user answer, or time runs out
// If correct answer === show congratulations screen
//after few seconds, display next question without user input
//If timer runs out:
//allert: Times up!
//Display correct answer
//wait few seconds
//Display next question 
//If wrong answer: alert player, they selected the wrong option
//Display correct answer
//wait a few secs, show next question 
//Final screen: show number of correct answers, incorrect answers, and option to restart the game without hitting refresh

$(document).ready(function () {
    //set up object-array for questions
    var trivia = [
        {
            question: "On Drake & Josh, what's Megan favorite phrase?'",
            choices: ["Boobz", "Idiots", "Oh, really?", "Damn! Where are my apples?"],
            rightChoice: 0,
            image: "assets/images/boobs.gif",
            background: "<img src='assets/images/90back.jpg'>"
        },
        {
            question: "What color lipstick does Spongebob use when he kisses Mr. Krabs fake Millionth dollar?",
            choices: ["Magenta", "Stardust", "Coral Blue #Oof", "Blorange"],
            rightChoice: 2,
            image: "assets/images/spongebob-coral-blue.gif",
            background: "<img src='assets/images/90cart.jpg'>"
        },
        {
            question: "What thottie accessory was popular in the 90's, that is currently popular today?",
            choices: ["chokers", "bandaids", "airpods", "tidepods"],
            rightChoice: 0,
            image: "assets/images/chokers.gif",
            background: "<img src='assets/images/90back.jpg'>"
        },
        {
            question: "During sleepovers, Mystery Date allowed girls to date which sexy actor?",
            choices: ["Port", "James Franco", "Paul Rudd", "Chris Evans, Mr. America"],
            rightChoice: 3,
            image: "assets/images/chris-evans.gif",
            background: "<img src='assets/images/90cart.jpg'>"
        },
        {
            question: "What was the SPICIEST band in the 90's?",
            choices: ["Madonna", "Hillary Clinton", "BackStreet Boyz", "The Spice Girls"],
            rightChoice: 3,
            image: "assets/images/zig-a-zig-ha.gif",
            background: "<img src='assets/images/90back.jpg'>"
        }
    ];
    var rightAnswer = 0;
    var wrongAnswer = 0;
    var unansweredCount = 0;
    var time = 30;
    var intervalId;
    var userSelection = "";
    var selected = false;
    var running = false;
    var totalCount = trivia.length;
    var chosenOne;
    var triviaRand;
    var newArray = [];
    var placeHolder = [];

    //hide resetBtn until called
    $("#resetBtn").hide();
    //click startBtn button to start game
    $("#startBtn").on("click", function () {
        $(this).hide();
        //$(".container").preppend("<img src=" + chosenOne.background + ">");
        displayTrivia();
        runTime();
        for (var i = 0; i < trivia.length; i++) {
            placeHolder.push(trivia[i]);
        };

    })
    //time: run
    function runTime() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //time--
    function decrement() {
        $("#timeLeft").html("<h4>👻 Madonna, we're running out of time 👻 " + time + " 👀</h4>");
        time--;

        //stop time if reach 0
        if (time === 0) {
            unansweredCount++;
            stop();
            //clearbck();
            $("#choicesDiv").html("<p>Oh no! You ran out of time 😂. The correct choice is: " + chosenOne.choices[chosenOne.rightChoice] + "</p>");
            hideimage();
        }
    }

    //time stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //function newBackground() {
    // $(".container").preppend("<img src=" + chosenOne.background + ">");
    //  newArray.push(chosenOne);
    // trivia.splice(triviaRand, 1);
    // }
    //display question and loop though and display possible answers
    function displayTrivia() {
        //generate random triviaRand in array
        triviaRand = Math.floor(Math.random() * trivia.length);
        //console.log(triviaRand);
        chosenOne = trivia[triviaRand];
        console.log(chosenOne);
        //$(".container").prepend("<div class='newBackground'>" + chosenOne.background + "</div>");

        $("#questionDiv").html("<h2>" + chosenOne.question + "</h2>");
        for (var i = 0; i < chosenOne.choices.length; i++) {
            var newUserChoice = $("<div>");
            newUserChoice.addClass("answerChoices");
            newUserChoice.html(chosenOne.choices[i]);
            //assign array position to it so can check rightChoice
            newUserChoice.attr("userChoices", i);
            $("#choicesDiv").append(newUserChoice);
            //try prepend to add a div containing background img tag
            //and add background property into object array for each question
            //use css & z-index to position behind actual container	
            //$(".container").prepend(chosenOne.background);
            //console.log(chosenOne.background);

            //click function to select rightChoice
            $(".answerChoices").click(function () {
                //parseInt() function parses a string argument and returns an integer of the specified radix
                //locate array based on userChoice
                userSelection = parseInt($(this).attr("userChoices"));
                console.log(userSelection);
                //userSelection = right/wrong
                //(userSelection === chosenOne.choices[chosenOne.rightChoice]) <--try this
                //(userSelection === chosenOne.rightChoice)
                if (userSelection === chosenOne.rightChoice) {
                    console.log(chosenOne.choices[chosenOne.rightChoice]);
                    stop();
                    //clearbck();
                    selected = true;
                    rightAnswer++;
                    userSelection = "";
                    $(".newBackground").empty();
                    $("#choicesDiv").html("<p>Damn, boi 🐱‍🐉👌</p>");
                    hideimage();
                    console.log(rightAnswer);
                } else {
                    stop();
                    //clearbck();
                    selected = true;
                    $(".newBackground").empty();
                    wrongAnswer++;
                    userSelection = "";
                    $("#choicesDiv").html("<p>🤔That is incorrect! The correct choice is: " + chosenOne.choices[chosenOne.rightChoice] + "</p>");
                    hideimage();
                    console.log(wrongAnswer);
                }
            })
        }
        //function clearbck() {
        //     $(".newBackground").empty();
        // }
        function hideimage() {
            $("#choicesDiv").append("<img src=" + chosenOne.image + ">");
            newArray.push(chosenOne);
            trivia.splice(triviaRand, 1);

            var hideimg = setTimeout(function () {
                $("#choicesDiv").empty();
                time = 30;

                //run the score screen if all questions answered
                if ((wrongAnswer + rightAnswer + unansweredCount) === totalCount) {
                    //clearbck();
                    $("#questionDiv").empty();
                    $("#questionDiv").html("<h3>🧐 Game Over!  Let's see your score 😱: </h3>");
                    $("#choicesDiv").append("<h4> 🤪 Correct: " + rightAnswer + "</h4>");
                    $("#choicesDiv").append("<h4> 🤬 Incorrect: " + wrongAnswer + "</h4>");
                    $("#choicesDiv").append("<h4> 🤯 Unanswered: " + unansweredCount + "</h4>");
                    $("#resetBtn").show();
                    rightAnswer = 0;
                    wrongAnswer = 0;
                    unansweredCount = 0;

                } else {
                    runTime();
                    displayTrivia();

                }
            }, 2000);


        }

        $("#resetBtn").on("click", function () {
            $(this).hide();
            //clearbck();
            $("#choicesDiv").empty();
            $("#questionDiv").empty();
            for (var i = 0; i < placeHolder.length; i++) {
                trivia.push(placeHolder[i]);
            }
            runTime();
            displayTrivia();

        })

    }
})

