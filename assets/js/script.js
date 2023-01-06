var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");

var quizTimer = document.getElementById("timer");

var startQuizButton = document.getElementById("startbtn");

var startQuizDiv = document.getElementById("top");

var highscoreContainer = document.getElementById("highscoreContainer");

var highscoreDiv = document.getElementById("high-scorePage");

var highscoreInputName = document.getElementById("initials");

var highscoreDisplayName = document.getElementById("highscore-initials");

var endGameBtns = document.getElementById("endGameBtns");

var submitScoreBtn = document.getElementById("submitScore");

var highscoreDisplayScore = document.getElementById("highscore-score");

var buttonA = document.getElementById("a");

var buttonB = document.getElementById("b");

var buttonC = document.getElementById("c");

var buttonD = document.getElementById("d");


var quizQuestions = [{
    question: "What do we use to get an  ordered list?",
    choiceA: "h1 with open and ending carrots",
    choiceB: "ul with open and ending carrots",
    choiceC: "ol with open and ending carrots",
    choiceD: "ul",
    correctAnswer: "c"},

  {
    question: "What does html stand for?",
    choiceA: "Hypertext Markup Language",
    choiceB: "Hypercontent Makeup Lango",
    choiceC: "Highperformance Mode Leafhopper",
    choiceD: "Hypertext Markup Langauge",
    correctAnswer: "a"},

   {
    question: "How can a datatype be declared to be a constant type?",
    choiceA: "const",
    choiceB: "var",
    choiceC: "let",
    choiceD: "con",
    correctAnswer: "a"},

    {
    question: "Which one of the following tags is used to insert graphics in the webpage?",
    choiceA: "image with open and ending carrots",
    choiceB: "images with open and ending carrots",
    choiceC: "img with open and ending carrots",
    choiceD: "graphics with open and ending carrots",
    correctAnswer: "c"},

    {
    question: "Which of the following CSS selectors are used to specify a group of elements?",
    choiceA: "tag",
    choiceB: "id",
    choiceC: "class",
    choiceD: "both class and tag",
    correctAnswer: "c"},  

    {
    question: "Which of the following CSS selectors is used to specify a rule to bind a particular unique element?",
    choiceA: "tag",
    choiceB: "id",
    choiceC: "class",
    choiceD: "both class and tag",
    correctAnswer: "b"},

    {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    choiceA: "var",
    choiceB: "let",
    choiceC: "Both A and B",
    choiceD: "None of the above",
    correctAnswer: "c"},
    ];

 var finalQuestionIndex = quizQuestions.length;

var currentQuestionIndex = 0;

var timeLeft = 30;

var timerInterval;

var score = 0;

var correct;

function generateQuizQuestion(){

    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }

    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

function generateHighscores(){

    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";
    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }

}

startQuizButton.addEventListener("click",startQuiz);
