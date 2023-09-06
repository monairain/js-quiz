// quiz variables
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerID; 

// linking HTML elements
let questionElement = document.getElementById("questions");
let timerElement = document.getElementById("time");
let choicesElement = document.getElementById("choices");
let submitButton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialElement = document.getElementById("initials")
let feedbackElement = document.getElementById("feedback");

// audio for correct-incorrect answers
let sfxRight = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");

function getQuestion() {
    // Get the current question from the 'questions' array based on the current index
    let currentQuestion = questions[currentQuestionIndex];

    // Get a reference to the HTML element where the question title will be displayed
    let titleElement = document.getElementById("question-title");

    // Set the text content of the title element to the current question's title
    titleElement.textContent = currentQuestion.title;

    // Clear the HTML element where answer choices will be displayed
    choicesElement.innerHTML = "";

    // Loop through each choice in the current question's choices array
    currentQuestion.choices.forEach(function(choice, index) {
        // Create a new button element for the choice
        let choiceButton = document.createElement("button");

        // Set the class attribute of the button to "choice" for styling
        choiceButton.setAttribute("class", "choice");

        // Set the value attribute of the button to the choice's text
        choiceButton.setAttribute("value", choice);

        // Set the button's text content to display the choice number and text
        choiceButton.textContent = `${index + 1}. ${choice}`;

        // Add a click event listener to the choice button to handle user clicks
        choiceButton.addEventListener("click", questionClick);

        // Append the choice button to the HTML element where choices are displayed
        choicesElement.append(choiceButton);
    });
}

function questionClick() {
    // Check if the clicked choice is not equal to the correct answer
    if (this.value !== questions[currentQuestionIndex].answer) {
        // Deduct 15 seconds from the timer
        time -= 15;

        // Ensure that time doesn't go negative
        if (time < 0) {
            time = 0;
        }

        // Update the timer display
        timerElement.textContent = time;

        // Display "INCORRECT" feedback
        feedbackElement.textContent = "INCORRECT";
    } else {
        // Play the correct sound effect
        sfxRight.play();

        // Display "CORRECT!" feedback
        feedbackElement.textContent = "CORRECT!";
    }

    // Apply the "feedback" class to style the feedback element
    feedbackElement.setAttribute("class", "feedback");

    // Hide the feedback after 1 second
    setTimeout(function () {
        feedbackElement.setAttribute("class", "feedback hide");
    }, 1000);

    // Move to the next question
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        // If all questions are answered, end the quiz
        quizEnd();
    } else {
        // Otherwise, get the next question
        getQuestion();
    }
}

function clockTick() {
    // Decrease the time by 1 second
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
        // If time runs out, end the quiz
        quizEnd();
    }
}

function startQuiz(){
// Starts the quiz by hiding the start screen + displaying the first question 
let startScreenElement = document.getElementById("start-screen");
// sets the CSS class of the "start-screen" element to "hide."
startScreenElement.setAttribute("class", "hide");

// sets up an interval timer that calls the clockTick function every 1000 milliseconds (1 second)
questionElement.removeAttribute("class")
timerID = setInterval(clockTick, 1000)

timerElement.textContent = time;

getQuestion();

}

function quizEnd(){
    // clear the timer
    clearInterval(timerID);

    let endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");

    let finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;

    questionElement.setAttribute("class", "hide")

}


function saveHighscore(){
// save user's highscores
    let initials = initialElement.value.trim();

    if(initials !== ""){
        let saveHighscores = JSON.parse(localStorage.getItem("highscores")) || [];
        let newScore = {
            score: time,
            initials: initials
        }
    saveHighscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(saveHighscores));
    
    // Redirect to the highscores page
    window.location.href = "highscores.html";
}
}

function checkForEnter(event){
// check for the "Enter" key press and saving highscore at the same time
    if(event.key === "Enter") {
        saveHighscore();
    }

}

// event listeners:

startButton.addEventListener("click", startQuiz);
// starts quiz upon click

submitButton.addEventListener("click", saveHighscore);
// saves highscore upon click

initialsElement.addEventListener("keyup", checkForEnter);
// saves highscore to scoreboard when user presses enter