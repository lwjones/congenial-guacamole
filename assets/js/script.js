class Quiz {
  constructor () {
    this.frontMatter = {
      title: "Coding Quiz Challenge",
      description:
        "Try to answer the following code-related questions within the time \
         limit. Keep in mind that incorrect answers will penalize your \
         score/time by ten seconds!"
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

  startQuiz = function () {
    let title = document.getElementById("title");
    title.textContent = quiz.frontMatter.title;

    let description = document.getElementById("description");
    description.textContent = quiz.frontMatter.description;

    let mainContent = document.getElementById("main");
    mainContent.classList.add("center");
  }
}

let quiz = new Quiz();
quiz.startQuiz();
