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
  // Clear start quiz button
  document.getElementById("cta").innerHTML = "";

  let mainContent = document.getElementById("main");
  mainContent.classList.add("left");
  mainContent.classList.remove("center");

  let title = document.getElementById("title");
  title.textContent = Quiz.questions[0].question;

  let description = document.getElementById("description");
  description.textContent = "";

  let choicePool = document.getElementById("choices");

  // create choices for given question
  for (let idx in Quiz.questions[0].choices) {
    let choiceBtn = document.createElement("button");
    choiceBtn.classList.add("left");
    choiceBtn.appendChild(document.createTextNode(Quiz.questions[0].choices[idx].text));
    choiceBtn.setAttribute("data-choice-id", idx);
    choicePool.appendChild(choiceBtn);
  }

  // determine if choice is correct or not
  console.log(this)
  console.log(checkAnswer);
  choicePool.addEventListener("click", checkAnswer);
};

let checkAnswer = function(event) {
  let choiceIdx = event.target.getAttribute("data-choice-id");
  console.log(Quiz.questions[0].choices[choiceIdx].correct);
}

loadQuiz();
