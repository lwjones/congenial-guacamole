const Quiz = {
  frontMatter: {
    title: "Coding Quiz Challenge",
    description:
      "Try to answer the following code-related questions within the time \
        limit. Keep in mind that incorrect answers will penalize your \
        score/time by ten seconds.",
    cta: "Start Quiz"
  },
  questions: [
    {
      question: "Commonly used data types DO NOT include:",
      choices: [
        {
          text: "strings",
          correct: false
        },
        {
          text: "booleans",
          correct: false
        },
        {
          text: "alerts",
          correct: true
        },
        {
          text: "numbers",
          correct: false
        }
      ]
    },
    {
      question: "The condition in an if/else statement is enclosed with ______.",
      choices: [
        {
          text: "quotes",
          correct: false
        },
        {
          text: "curly brackets",
          correct: false
        },
        {
          text: "parenthesis",
          correct: true
        },
        {
          text: "square brackets",
          correct: false
        }
      ]
    },
    {
      question: "Arrays in JavaScript can be used to store ______.",
      choices: [
        {
          text: "numbers and strings",
          correct: false
        },
        {
          text: "other arrays",
          correct: false
        },
        {
          text: "booleans",
          correct: false
        },
        {
          text: "all of the above",
          correct: true
        }
      ],
    },
    {
      question:
        "String values must be enclosed within ______ when \
          being assigned to variables.",
      choices: [
        {
          text: "commas",
          correct: false
        },
        {
          text: "curly brackets",
          correct: false
        },
        {
          text: "quotes",
          correct: true
        },
        {
          text: "parenthesis",
          correct: false
        }
      ],
    },
    {
      question:
        "A very useful tool used during development and debugging for \
          printing content to the debugger is:",
      choices: [
        {
          text: "JavaScript",
          correct: false
        },
        {
          text: "terminal/bash",
          correct: false
        },
        {
          text: "for loops",
          correct: false
        },
        {
          text: "console.log",
          correct: true
        }
      ]
    }
  ]
};

let quizTimer, timeLeft;
let timerEl = document.getElementById("remaining");
let localStorage = window.localStorage;
let quizStorage;

/**
 * Clears placeholder contents.
 */
let clearContents = function() {
  document.getElementById("title").textContent = "";
  document.getElementById("description").textContent = "";
  document.getElementById("choices").textContent = "";
  document.getElementById("scores-list").innerHTML = "";
  document.getElementById("scores-action").innerHTML = "";
  document.getElementById("cta").innerHTML = "";

  let entryForm = document.getElementById("entry");
  if (entryForm) {
    document.getElementById("entry").innerHTML = "";
  }
}


/**
 * Loads scoreboard from local storage. Populates if data does not exist, and
 * can be cleared when `flush` is true.
 * @param {bool} flush Optional. Clears contents of storage. Default: false.
 */
let loadStorage = function(flush=false) {
  let currentData = localStorage.getItem('quiz-scores');
  if (!currentData || !currentData.length || flush === true) {
    quizStorage = [];
    localStorage.setItem('quiz-scores', JSON.stringify([]));
  } else {
    quizStorage = JSON.parse(localStorage.getItem('quiz-scores'));
    quizStorage.sort((a, b) => a.score - b.score).reverse();
  }
};


/**
 * Sorts the scores in order of highest to lowest.
 */
let updateStorage = function() {
  quizStorage.sort((a, b) => a.score - b.score).reverse();
  localStorage.setItem('quiz-scores', JSON.stringify(quizStorage));
}


/**
 * Clears contents of the scoreboard.
 */
let clearStorage = function() {
  loadStorage(flush=true);
}


/**
 * Populates the quiz main page.
 */
let loadQuiz = function() {
  clearContents();

  let header = document.getElementById("header");
  header.style.display = "flex";

  let title = document.getElementById("title");
  title.textContent = Quiz.frontMatter.title;

  let description = document.getElementById("description");
  description.textContent = Quiz.frontMatter.description;

  let showHighScoresBtn = document.getElementById("view-scores-btn");
  showHighScoresBtn.addEventListener("click", showHighScores);

  document.getElementById("isChoiceCorrect")
    .setAttribute("style", "visibility:hidden");

  let cta = document.getElementById("cta");
  let startBtn = document.createElement("button");
  startBtn.appendChild(document.createTextNode(Quiz.frontMatter.cta));
  cta.appendChild(startBtn);

  let mainContent = document.getElementById("main");
  mainContent.classList.add("center");

  startBtn.addEventListener("click", startQuiz);
};


/**
 * Starts the quiz, loading the first question.
 */
let startQuiz = function() {
  timeLeft = 40;
  timerEl.textContent = timeLeft;
  quizTimer = setInterval(function() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(quizTimer);
      endQuiz();
    }
  }, 1000);

  // Clear start quiz button
  document.getElementById("cta").innerHTML = "";

  let mainContent = document.getElementById("main");
  mainContent.classList.add("left");
  mainContent.classList.remove("center");

  let questionIdx = 0;

  getQuestion(questionIdx);
};


/**
 * Loads a question to the screen.
 * @param {int} questionIdx Current question to display.
 */
let getQuestion = function(questionIdx) {
  clearContents();

  let title = document.getElementById("title");
  title.textContent = Quiz.questions[questionIdx].question;
  title.setAttribute("data-question-id", questionIdx);

  let choicePool = document.getElementById("choices");

  // create choices for given question
  for (let idx in Quiz.questions[questionIdx].choices) {
    let choiceBtn = document.createElement("button");
    choiceBtn.classList.add("left");
    choiceBtn.appendChild(document.createTextNode(Quiz.questions[questionIdx].choices[idx].text));
    choiceBtn.setAttribute("data-choice-id", idx);
    choicePool.appendChild(choiceBtn);
  }

  // determine if choice is correct or not, then either populate next question
  // or end quiz
  choicePool.addEventListener("click", function questionHandler(event) {
    checkAnswer(event);
    questionIdx++;
    if (questionIdx < Quiz.questions.length) {
      getQuestion(questionIdx);
    } else {
      clearInterval(quizTimer);
      endQuiz();
      // Move on to score display and submission
    }
    this.removeEventListener("click", questionHandler);
  });
}




/**
 * Writes to screen to show if the user's response is correct.
 * @param {*} event
 */
let checkAnswer = function(event) {
  let choiceIdx = event.target.getAttribute("data-choice-id");
  let questionIdx = document.getElementById("title").getAttribute("data-question-id");
  let isCorrect = Quiz.questions[questionIdx].choices[choiceIdx].correct;
  let isChoiceCorrectEl = document.getElementById("isChoiceCorrect");


  if (isCorrect) {
    isChoiceCorrectEl.innerHTML = "<p>Correct!</p>";
  } else {
    isChoiceCorrectEl.innerHTML = "<p>Wrong!</p>";
    // penalty if wrong: remove 10 points/seconds
    timeLeft -= 10;
  }

  setInterval(function() {
    isChoiceCorrectEl.setAttribute("style", "visibility:hidden");
  }, 2000);

  clearInterval();
  isChoiceCorrectEl.setAttribute("style", "visibility: visible");

}


/**
 * Tell user time is out to complete quiz.
 */
let noTimeRemains = function() {
  let title = document.getElementById("title");
  title.textContent = "Time's up.";
  let description = document.getElementById("description");
  description.textContent = "Quiz was not complete in time";
}


/**
 * Show user their score.
 */
let endQuiz = function() {
  // If there is questions remaining, assume they are wrong
  let questionIdx = document.getElementById("title").getAttribute("data-question-id");

  clearContents();

  if (questionIdx < (Quiz.questions.length - 1)) {
    noTimeRemains();
    setTimeout(showHighScores, 3000);
  } else {
    // if time negative set to zero
    timerEl.textContent = '0';

    // replace title
    let title = document.getElementById("title");
    title.textContent = "All Done!";

    let description = document.getElementById("description");
    description.textContent = `Your final score is ${timeLeft}`;

    submitScore();
  }

}


/**
 * Enters score to add to the scoreboard.
 */
let submitScore = function() {

  let submitScoreForm = document.getElementById("entry");
  submitScoreForm.innerHTML = `
    <form>
    <label for="name">Enter Name:</label>
    <input type="text" id="user_name" placeholder="Your Name" name="name">
    <input type="submit" id="submit_score" value="Submit">
    </form>
  `;

  document.getElementById("user_name").required = true;

  let submitBtn = document.getElementById("submit_score");

  submitBtn.onclick = function(event) {
    event.preventDefault();

    let name = document.getElementById("user_name").value;
    quizStorage.push({ name: name, score: timeLeft });
    updateStorage();
    showHighScores();
  };
}


/**
 * Shows the list of high scores listed highest to lowest.
 */
let showHighScores = function() {
  clearContents();
  let title = document.getElementById("title");
  title.textContent = "High Scores";

  let submitScoreForm = document.getElementById("entry");
  if (submitScoreForm) {
    submitScoreForm.remove();
  }

  let header = document.getElementById("header");
  header.style.display = "none";

  let scores = document.getElementById("scores-list");
  for (let i = 0; i < quizStorage.length; i++) {
    let scoreEl = document.createElement("li");
    scoreEl.classList.add('scoreboard');
    scoreEl.textContent = `${i + 1}. ${quizStorage[i].name} - ${quizStorage[i].score}`;
    scores.appendChild(scoreEl);
  }


  let scoreboard = document.getElementById("scores-action");
  let goBackBtn = document.createElement("button");
  goBackBtn.classList.add("secondary-button");
  goBackBtn.id = "back-button";
  goBackBtn.textContent = "Go Back";
  goBackBtn.style.display = "block";
  goBackBtn.addEventListener("click", function() {
    scoreboard.innerHTML = "";
    clearContents();
    loadQuiz();
  });
  scoreboard.appendChild(goBackBtn);

  let clearScoresBtn = document.createElement("button");
  clearScoresBtn.classList.add("secondary-button");
  clearScoresBtn.id = "clear-button";
  clearScoresBtn.textContent = "Clear Scores";
  clearScoresBtn.style.display = "block";
  clearScoresBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to clear the scoreboard? This action cannot be undone.")) {
      scoreboard.innerHTML = "";
      clearStorage();
      clearContents();
      showHighScores();
    }
  });
  scoreboard.appendChild(clearScoresBtn);
}


loadStorage();
loadQuiz();
