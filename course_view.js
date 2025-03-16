function acceptCourse(button) {
    let courseTile = button.parentNode.parentNode;
    moveToEnrolled(courseTile);
}

function declineCourse(button) {
    let courseTile = button.parentNode.parentNode;
    courseTile.parentNode.removeChild(courseTile);
}

function moveToEnrolled(courseTile) {
    let enrolledCoursesTable = document.getElementsByClassName("courseViewTables")[0].getElementsByTagName("table")[0];

    let img = courseTile.getElementsByTagName("img")[0];
    img.src = "course1.jpg";

    removeButtons(courseTile);

    let attemptQuiz = document.createElement("a");
    attemptQuiz.href = "attempt_quiz.html";
    attemptQuiz.textContent = "Attempt Quiz";
    courseTile.getElementsByTagName("div")[0].appendChild(attemptQuiz);

    let rows = enrolledCoursesTable.getElementsByTagName("tr");
    let lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

    let newCell = courseTile;
    newCell.id = 'e';

    if (lastRow && lastRow.children.length === 3) {
        lastRow = enrolledCoursesTable.insertRow();
    }

    lastRow.appendChild(newCell);
    applyHoverEffects();
}

function removeButtons(courseTile) {
    let buttons = courseTile.getElementsByTagName("button");
    while (buttons.length > 0) {
        buttons[0].parentNode.removeChild(buttons[0]);
    }
}

function applyHoverEffects() {
    let tiles = document.getElementsByClassName("tile");

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].onmouseenter = function () {
            tiles[i].style.backgroundColor = "#ffffff";
        };
        tiles[i].onmouseleave = function () {
            tiles[i].style.backgroundColor = "";
        };
    }
}

applyHoverEffects();