const Quiz = {
  frontMatter: {
    title: "Coding Quiz Challenge",
    description:
      "Try to answer the following code-related questions within the time \
        limit. Keep in mind that incorrect answers will penalize your \
        score/time by ten seconds!",
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
      question: "The condition in an if/else statement is enclosed with ________.",
      choices: [
        {
          text: "quotes",
          correct: false
        },
        {
          text: "curly brackets",
          correct: true
        },
        {
          text: "parenthesis",
          correct: false
        },
        {
          text: "square brackets",
          correct: false
        }
      ]
    }
  ]
};


let loadQuiz = function() {
  let title = document.getElementById("title");
  title.textContent = Quiz.frontMatter.title;

  let description = document.getElementById("description");
  description.textContent = Quiz.frontMatter.description;

  let cta = document.getElementById("cta");
  let startBtn = document.createElement("button");
  startBtn.appendChild(document.createTextNode(Quiz.frontMatter.cta));
  cta.appendChild(startBtn);

  let mainContent = document.getElementById("main");
  mainContent.classList.add("center");

  startBtn.addEventListener("click", startQuiz);
};

let startQuiz = function() {
  timeLeft = 5; // FIXME: Set default to 40
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

let getQuestion = function(questionIdx) {
  let title = document.getElementById("title");
  title.textContent = Quiz.questions[questionIdx].question;

  let description = document.getElementById("description");
  description.textContent = "";

  let choicePool = document.getElementById("choices");
  choicePool.innerHTML = "";

  title.setAttribute("data-question-id", questionIdx);
  // create choices for given question
  for (let idx in Quiz.questions[questionIdx].choices) {
    let choiceBtn = document.createElement("button");
    choiceBtn.classList.add("left");
    choiceBtn.appendChild(document.createTextNode(Quiz.questions[questionIdx].choices[idx].text));
    choiceBtn.setAttribute("data-choice-id", idx);
    choicePool.appendChild(choiceBtn);
  }

  // determine if choice is correct or not
  choicePool.addEventListener("click", function(event) {
    checkAnswer(event);
    questionIdx++;
    if (questionIdx < Quiz.questions.length) {
      getQuestion(questionIdx);
    } else {
      clearInterval(quizTimer);
      endQuiz();
      // Move on to score display and submission
    }
  });
}

let checkAnswer = function(event) {
  let choiceIdx = event.target.getAttribute("data-choice-id");
  let questionIdx = document.getElementById("title").getAttribute("data-question-id");
  let isCorrect = Quiz.questions[questionIdx].choices[choiceIdx].correct;
  let isChoiceCorrectEl = document.getElementById("isChoiceCorrect");
  isChoiceCorrectEl.classList.remove("hidden");

  if (isCorrect) {
    isChoiceCorrectEl.innerHTML = "<p>Correct!</p>";
  } else {
    isChoiceCorrectEl.innerHTML = "<p>Wrong!</p>";
    // penalty if wrong: remove 10 points/seconds
    timeLeft -= 10;
  }
}

let endQuiz = function() {
  // if time negative set to zero
  timerEl.textContent = '0';

  // replace title
  let title = document.getElementById("title");
  title.textContent = "All Done!";

  let description = document.getElementById("description");
  description.textContent = `Your final score is ${timeLeft}`;

  let choicePool = document.getElementById("choices");
  choicePool.textContent = "";

  // new title

  // print score
}

let quizTimer, timeLeft;
let timerEl = document.getElementById("remaining");

loadQuiz();
