const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ];


let contatore = 0
let score = 0
let currentQuestion = null
let usedQuestions = []

function benchmarkQuestion() {
  if (contatore >= 10) {
    localStorage.setItem("quizScore", score)
    window.open("welcome.html", "_self") //apre una nuova pagina dopo la decima domanda 
    for (let i = 0; i < BUTTONS.length; i++) {
      BUTTONS[i].disabled = true;  
    }
    return;
  }
    let domanda = document.querySelector("#question")
    let options = document.querySelectorAll("#options button")
    let counter = document.querySelector(".questionsCounter")

    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * questions.length)
    } while (usedQuestions.includes(randomIndex))
      usedQuestions.push(randomIndex)

    currentQuestion = questions[randomIndex]
    domanda.textContent = currentQuestion.question
    let risposte = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer)
    risposte = risposte.sort(() => Math.random() - 0.5)
    for (let i = 0; i < options.length; i++) {
        if (i < risposte.length) {
            options[i].style.display = "inline-block";
            options[i].textContent = risposte[i];
            options[i].value = risposte[i];
        } else {
            options[i].style.display = "none";
        }
    }

    contatore++
    counter.textContent = "Domanda " + contatore + "/10"
}


function checkAnswer(userSelAnswer) {
  if (userSelAnswer === currentQuestion.correct_answer) {
    score++
  }
  benchmarkQuestion()
}

const BUTTONS = document.querySelectorAll("#options button")
for (let i = 0; i < BUTTONS.length; i++) {
  BUTTONS[i].addEventListener("click", (click) => {
    let userSelAnswer = click.target.value
    checkAnswer(userSelAnswer)
  })
}

function button(checkboxId, buttonId) {

  const checkbox = document.getElementById(checkboxId);
  const button = document.getElementById(buttonId);


  button.disabled = !checkbox.checked;
}

const startTime = 30;
const radius = 70;
const circumference = 2 * Math.PI * radius;
const progressCircle = document.getElementById("progress-circle");
const timerText = document.getElementById("timerText");

let timerId = null;
let remainingTime = startTime;


progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = 0;


function startTimer() {
  remainingTime = startTime;
  timerText.textContent = remainingTime;
  progressCircle.style.strokeDashoffset = 0;

  timerId = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      timerText.textContent = remainingTime;
      const offset = circumference - (remainingTime / startTime) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    } else {
      clearInterval(timerId);
      console.log("Timer completato. Riavvio...");
      startTimer();
      benchmarkQuestion() // trovato il collegamento, benchmarkQuestion deve essere eseguita qui
    }
  }, 1000);
}

startTimer()
function restartTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
  }
  progressCircle.style.strokeDashoffset = 0;
  remainingTime = startTime;
  timerText.textContent = startTime;

  startTimer();
  console.log("Timer riavviato da input.");
}

const responseButtons = document.querySelectorAll(".option");
responseButtons.forEach(button => {
  button.addEventListener("click", restartTimer);
});


benchmarkQuestion()
