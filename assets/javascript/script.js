let testQuestions = [{
    question: "What is the capital of Iceland?",
    answerA: "Berlin",
    answerB: "Ankara",
    answerC: "Reykjavik",
    answerD: "Mexico",
    correctpick: "answerC"
},

{
    question: "In coding, what does CSS stands for?",
    answerA: "Cascade Style Sheet",
    answerB: "Cannot Say Something",
    answerC: "Carry Some Sand",
    answerD: "Canon Style Soft",
    correctpick: "answerA"
},

{
    question: "Which of the following empires had no written language?",
    answerA: "Egyptian",
    answerB: "Inca",
    answerC: "Mayan",
    answerD: "Roman",
    correctpick: "answerB"
},

{
    question: "Where was the first modern Olympic Games held?",
    answerA: "Athens",
    answerB: "Oslo",
    answerC: "Volgograd",
    answerD: "Kingston",
    correctpick: "answerA"
},

{
    question: "Which is the longest river in the world?",
    answerA: "Volga",
    answerB: "Euphrates",
    answerC: "Tigris",
    answerD: "Nile",
    correctpick: "answerD"
},

{
    question: "Disney’s first film?",
    answerA: "Dumbo",
    answerB: "Snow White",
    answerC: "Mulan",
    answerD: "Aladdin",
    correctpick: "answerB"
},

{
    question: "Name of the Actress featuring on film: Baby Driver?",
    answerA: "Victoria Beckham",
    answerB: "Anne Hathaway",
    answerC: "Eiza Gonzalez",
    answerD: "Sofia Vergara",
    correctpick: "answerC"
},

{
    question: "Which Honda civic has a double dash?",
    answerA: "2017 Ex",
    answerB: "2001 EX-L",
    answerC: "2012 LX",
    answerD: "2021 LX",
    correctpick: "answerC"
},
]

//Beginning score 0 // 

let score = 0;
let timerEl = document.getElementById('timer');
let beginBtn = document.getElementById('begin');
let holderEl = document.getElementById('holder');
let quizzerEl = document.getElementById('quizzer');
let timeLeft = 120;
let lastQuestion = false;


//Timer //
function countdown() {

    let timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = 'Time Left: ' + timeLeft;
            if (lastQuestion) return clearInterval(timeInterval);
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            quizzerOver();
        }
    }, 1000);
    quizzerDisplay(currentIndex);
};

//Quizzer answers//
let answers = document.getElementById("answers");
let answerA = document.getElementById("answerA");
let answerB = document.getElementById("answerB");
let answerC = document.getElementById("answerC");
let answerD = document.getElementById("answerD");
let currentIndex = 0;


function quizzerDisplay(index) {
    quizzerEl.innerHTML = testQuestions[index].question;
    beginBtn.remove();
    answers.style.display = "inline-block";
    answerA.innerHTML = testQuestions[index].answerA;
    answerB.innerHTML = testQuestions[index].answerB;
    answerC.innerHTML = testQuestions[index].answerC;
    answerD.innerHTML = testQuestions[index].answerD;
};

//Button click//
answerA.addEventListener("click", checkAnswer);
answerB.addEventListener("click", checkAnswer);
answerC.addEventListener("click", checkAnswer);
answerD.addEventListener("click", checkAnswer);
let result = document.getElementById("result");

function checkAnswer(e) {
    //User id//

    let userInput = e.target.id;

    // Confirming correct answer//

    if (userInput === testQuestions[currentIndex].correctpick) {
        result.innerHTML = "AWESOME!!!";
        console.log("correct!");

    } else {
        result.innerHTML = "KEEP TRYING!";
        timeLeft -= 15;
        console.log("wrong");

    }
  
     //To next question//
     currentIndex++;

     //End of everything//
     if (currentIndex === testQuestions.length || timeLeft === 0) {
         quizzerOver();
 
     } else {
 
         //Show new question//
         setTimeout(function () {
             quizzerDisplay(currentIndex);
             result.innerHTML = "";
         }, 500);
     }
 };
 
 
 let lastScreen = document.getElementById("last-screen");
 let totalScore = document.getElementById("total-score");
 let userInput = document.getElementById("initials");
 let scoreDivider = document.getElementById("score-divider");
 let scoreFile = document.getElementById('results');
 
 function quizzerOver() {

//Delete last question//

      quizzerEl.remove();
      answers.remove();
      result.remove();

 //Stop timer//

 lastQuestion = true;

 //Show final screen//

lastScreen.classList.remove('leave');
totalScore.innerHTML = timeLeft;

//Player initials//

    let enter = document.getElementById("enter")
    enter.addEventListener("click", function highscore() {
        let userInitials = userInput.value;
        if (userInitials === null) {
            alert("Initials here")
            return;
        } else {
            let totalScore = {
                initials: userInitials,
                score: timeLeft
            };
            console.log(totalScore);
            let userScore = localStorage.getItem('userScore');
            if (userScore === null) {
                userScore = [];
            } else {
                userScore = JSON.parse(userScore);
            }
            userScore.push(totalScore);
            let newScore = JSON.stringify(userScore);
            localStorage.setItem("userScore", newScore);
            scoreDisplay();
        }
    })

};

//Show Score //

function scoreDisplay() {
    lastScreen.classList.add('leave');
    scoreDivider.classList.remove('leave');

 // Show storaged data//

 let userScore = localStorage.getItem("userScore");
 userScore = JSON.parse(userScore);
 console.log(userScore);

    //Show score from storaged data//

    if (userScore !== null) {
        for (let i = 0; i < userScore.length; i++) {
            let createLi = document.createElement("li");
            createLi.innerText = userScore[i].initials + " " + userScore[i].score;
            scoreFile.appendChild(createLi);
        }
    }
};

let clear = document.getElementById("clear");
let replay = document.getElementById("replay");



