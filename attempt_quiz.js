var timeLeft = 600;
var timerDisplay = document.createElement("h2");
timerDisplay.id = "quizTimer";

var mainContent = document.getElementsByTagName("main")[0];
mainContent.insertBefore(timerDisplay, mainContent.getElementsByClassName("quizInfo")[0]);

function startTimer() {
    var timerInterval = setInterval(function () {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        timerDisplay.textContent = "Time Left: " + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert("Time's up! Submitting your quiz.");
            window.location.href = "leaderboard.html";
        }

        timeLeft--;
    }, 1000);
}

startTimer();

function validateAndSubmit(event) {
    event.preventDefault();

    var score = 0;
    var message = "Quiz Submitted! ";

    var q1Options = document.getElementsByName("q1");
    var q1Selected = false;

    for (var i = 0; i < q1Options.length; i++) {
        if (q1Options[i].checked) {
            q1Selected = true;
            if (q1Options[i].value === "Hyper Text Markup Language") {
                score += 50;
            }
            break;
        }
    }

    if (!q1Selected) {
        alert("Please select an answer for Question 1.");
        return;
    }

    var q2Options = document.getElementsByName("q2");
    var q2Selected = false;

    for (var i = 0; i < q2Options.length; i++) {
        if (q2Options[i].checked) {
            q2Selected = true;
            if (q2Options[i].value === "<div>" || q2Options[i].value === "<span>") {
                score += 25;
            }
        }
    }

    if (!q2Selected) {
        alert("Please select at least one option for Question 2.");
        return;
    }

    message += "Your final score: " + score + "/100";
    alert(message);

    var resultDisplay = document.createElement("h2");
    resultDisplay.textContent = message;
    mainContent.appendChild(resultDisplay);
}

document.getElementById("finish").onclick = validateAndSubmit;