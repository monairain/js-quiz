function printHighscores(){
    // get high scores from local storage
    let highScores = JSON.parse(localStorage.getItem("highscores")) || []
    
    // sort high scores in descending order
    highScores.sort(function(a, b) {
        return b.score - a.score;

    })

    highScores.forEach(function(score) {
        let li = document.createElement("li");
        li.textContent = `${score.initials} - ${score.score}`

        let ol = document.getElementById("highscores");
        ol.appendChild(li);

    })
}

// clear high scores from local storage and reload the page
function clearHighscores(){
    localStorage.removeItem("highscores");
    window.location.reload();

}

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearHighscores);

printHighscores();