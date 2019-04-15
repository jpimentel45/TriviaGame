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
            choices: ["Portabella Mushroom", "James Franco", "Paul Rudd", "Chris Evans, Mr. America"],
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
        },
        {
            question: "Which child sang Survivor to bring Jesus into our hearts?",
            choices: ["Striperella👩‍🎤", "Dusty Diamondz💎", "Destiny's Child 😜", "Jeniffer Lopez🧟‍"],
            rightChoice: 2,
            image: "assets/images/Destiny.GIF",
            background: "<img src='assets/images/90cart.jpg'>"
        },
        {
            question: "Which device allowed us to end a call dramatically after an argument?",
            choices: ["Razr💅", "La Chancla🙌", "Low Battery📵", "The telephone👵"],
            rightChoice: 0,
            image: "assets/images/Razr.gif",
            background: "<img src='assets/images/90back.jpg'>"
        },
        {
            question: "Jessica Simpson released what type of edible product?",
            choices: ["Lubricant", "Lingerie", "Lipstick", "Perfume"],
            rightChoice: 3,
            image: "assets/images/Jessica-Simpson.gif",
            background: "<img src='assets/images/90cart.jpg'>"
        },
        {
            question: "Which popular device was most confiscated during the late 2000's?",
            choices: ["iPod Classic", "Hot Cheetos", "iPhone X", "Lanterns"],
            rightChoice: 0,
            image: "assets/images/iPod-Classic.GIF",
            background: "<img src='assets/images/90back.jpg'>"
        },
        {
            question: "What is the strongest material on Earth?",
            choices: ["Diamonds", "Aubrey Plaza", "Unobtainium", "Nokia Phone"],
            rightChoice: 3,
            image: "assets/images/Nokia.gif",
            background: "<img src='assets/images/90cart.jpg'>"
        }
    ];

    var rightAnswer = 0;
    var wrongAnswer = 0;
    var unAnswered = 0;
    var time = 15;
    var intervalId;
    var userSelection = "";
    var running = false;
    var totalCount = trivia.length;
    var newArray = [];
    var placeHolder = [];


    //hide resetBtn until called
    $("#resetBtn").hide();
    //click startBtn button to startame & hide btn
    $("#startBtn").click(function () {
        $(this).hide();
        displayTrivia();
        runTime();
        for (var i = 0; i < trivia.length; i++) {
            placeHolder.push(trivia[i]);
        }
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

        //stop time===0
        if (time === 0) {
            unAnswered++;
            stop();
            $("#choicesDiv").html("<p>You ran out of time 😂. The correct choice is: " + chosenOne.choices[chosenOne.rightChoice] + "</p>");
            hideImage();
        }
    }

    //time stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //display trivia question, loop,  and display choices
    function displayTrivia() {
        //generate random question in array
        triviaRand = Math.floor(Math.random() * trivia.length);
        chosenOne = trivia[triviaRand];
        //console.log(chosenOne);

        $("#questionDiv").html("<h2>" + chosenOne.question + "</h2>");
        for (var i = 0; i < chosenOne.choices.length; i++) {
            var newUserChoice = $("<div>");
            newUserChoice.addClass("answerChoices");
            newUserChoice.html(chosenOne.choices[i]);
            //assign array position to it so can check rightChoice
            newUserChoice.attr("userChoices", i);
            $("#choicesDiv").append(newUserChoice);

        }
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
            //console.log(userSelection);
            //userSelection = right/wrong
            //(userSelection === chosenOne.choices[chosenOne.rightChoice]) <--try this
            //(userSelection === chosenOne.rightChoice)
            if (userSelection === chosenOne.rightChoice) {
                stop();
                rightAnswer++;
                userSelection = "";
                $("#choicesDiv").html("<p>Damn, boi 🐱‍🐉👌</p>");
                hideImage();
                //console.log(rightAnswer);

            } else {
                stop();
                wrongAnswer++;
                userSelection = "";
                $("#choicesDiv").html("<p>🤔That is incorrect! The correct choice is: " + chosenOne.choices[chosenOne.rightChoice] + "</p>");
                hideImage();
                //console.log(wrongAnswer);
            }
        })
    }


    function hideImage() {
        $("#choicesDiv").append("<img src=" + chosenOne.image + ">");
        newArray.push(chosenOne);
        trivia.splice(triviaRand, 1);

        var hideImg = setTimeout(function () {
            $("#choicesDiv").empty();
            time = 15;

            //run the score screen if all questions looped through & answered
            if ((wrongAnswer + rightAnswer + unAnswered) === totalCount) {
                $("#questionDiv").empty();
                $("#questionDiv").html("<h3>🧐 Game Over!  Let's see your score 😱: </h3>");
                $("#choicesDiv").append("<h4> 🤪 Correct: " + rightAnswer + "</h4>");
                $("#choicesDiv").append("<h4> 🤬 Incorrect: " + wrongAnswer + "</h4>");
                $("#choicesDiv").append("<h4> 🤯 Unanswered: " + unAnswered + "</h4>");
                $("#resetBtn").show();
                rightAnswer = 0;
                wrongAnswer = 0;
                unAnswered = 0;

            } else {
                runTime();
                displayTrivia();

            }
        }, 5000);


    }

    $("#resetBtn").click(function () {
        $(this).hide();
        $("#choicesDiv").empty();
        $("#questionDiv").empty();
        for (var i = 0; i < placeHolder.length; i++) {
            trivia.push(placeHolder[i]);
        }
        runTime();
        displayTrivia();

    })

})
