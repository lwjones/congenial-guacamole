class Quiz {
  constructor () {
    this.frontMatter = {
      title: "Coding Quiz Challenge",
      description:
        "Try to answer the following code-related questions within the time \
         limit. Keep in mind that incorrect answers will penalize your \
         score/time by ten seconds!",
      cta: "Start Quiz"
    };
    this.questions = [
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
    ];
  }

  loadQuiz = function() {
    let title = document.getElementById("title");
    title.textContent = quiz.frontMatter.title;

    let description = document.getElementById("description");
    description.textContent = quiz.frontMatter.description;

    let cta = document.getElementById("cta");
    let startBtn = document.createElement("button");
    startBtn.appendChild(document.createTextNode(quiz.frontMatter.cta));
    cta.appendChild(startBtn);

    let mainContent = document.getElementById("main");
    mainContent.classList.add("center");

    startBtn.addEventListener("click", this.startQuiz);
  }

  startQuiz = function() {
    document.getElementById("cta").innerHTML = "";
    let mainContent = document.getElementById("main");
    mainContent.classList.add("left");
    mainContent.classList.remove("center");

    let title = document.getElementById("title");
    title.textContent = quiz.questions[0].question;

    let description = document.getElementById("description");
    description.textContent = "";

    for (let idx in quiz.questions[0].choices) {
      let choicePool = document.getElementById("choices");
      let choiceBtn = document.createElement("button");
      choiceBtn.classList.add("left");
      choiceBtn.appendChild(document.createTextNode(quiz.questions[0].choices[idx].text));
      choicePool.appendChild(choiceBtn);
    }
  }
}

let quiz = new Quiz();
quiz.loadQuiz();
