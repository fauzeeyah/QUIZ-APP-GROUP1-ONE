const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const questions = [
    {
        question: "Which of the following is a JavaScript framework?",
        choice1: "Ruby on Rails",
        choice2: "Django",
        choice3: "Angular",
        choice4: "Laravel",
        Answer: 3,
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        choice1: "push()",
        choice2: "pop()",
        choice3: "shift()",
        choice4: "unshift()",
        Answer: 1,
    },
    {
        question: "Which of the following is not a valid JavaScript data type?",
        choice1: "Number",
        choice2: "String",
        choice3: "Character",
        choice4: "Boolean",
        Answer: 3,
    },
    {
        question: "How do you create a function in JavaScript?",
        choice1: "function:myFunction() {}",
        choice2: "function myFunction() {}",
        choice3: "def myFunction() {}",
        choice4: "create myFunction() {}",
        Answer: 2,
    },
    {
        question: "Which method can be used to convert a JSON string into a JavaScript object?",
        choice1: "JSON.parse()",
        choice2: "JSON.stringify()",
        choice3: "JSON.objectify()",
        choice4: "JSON.toObject()",
        Answer: 1,
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        choice1: "text-color",
        choice2: "fgcolor",
        choice3: "color",
        choice4: "font-color",
        Answer: 3,
    },
    {
        question: "How do you add a background color for all <h1> elements in CSS?",
        choice1: "h1 {background-color: #FFFFFF;}",
        choice2: "h1.all {background-color: #FFFFFF;}",
        choice3: "all.h1 {background-color: #FFFFFF;}",
        choice4: "h1 {bg-color: #FFFFFF;}",
        Answer: 1,
    },
    {
        question: "Which CSS property is used to change the font of an element?",
        choice1: "font-weight",
        choice2: "font-style",
        choice3: "font-family",
        choice4: "font-size",
        Answer: 3,
    },
    {
        question: "How do you make each word in a text start with a capital letter in CSS?",
        choice1: "text-transform: capitalize;",
        choice2: "text-style: capitalize;",
        choice3: "transform: capitalize;",
        choice4: "text-decoration: capitalize;",
        Answer: 1,
    },
    {
        question: "Which property is used to change the left margin of an element?",
        choice1: "padding-left",
        choice2: "margin-left",
        choice3: "indent-left",
        choice4: "space-left",
        Answer: 2,
    },
    {
        question: "What does HTML stand for?",
        choice1: "Hyperlinks and Text Markup Language",
        choice2: "Home Tool Markup Language",
        choice3: "Hyper Text Markup Language",
        choice4: "Hyperlinking Text Marking Language",
        Answer: 3,
    },
    {
        question: "Who is making the Web standards?",
        choice1: "Microsoft",
        choice2: "Google",
        choice3: "Mozilla",
        choice4: "The World Wide Web Consortium",
        Answer: 4,
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        choice1: "<h6>",
        choice2: "<head>",
        choice3: "<h1>",
        choice4: "<heading>",
        Answer: 3,
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        choice1: "<br>",
        choice2: "<lb>",
        choice3: "<break>",
        choice4: "<newline>",
        Answer: 1,
    },
    {
        question: "Which of these elements are all <table> elements?",
        choice1: "<table><tr><td>",
        choice2: "<table><tr><tt>",
        choice3: "<thead><body><tr>",
        choice4: "<table><head><tfoot>",
        Answer: 1,
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 15;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
        choice.classList.remove('correct', 'incorrect');
    });

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset['number']);

        const classToApply = selectedAnswer === currentQuestion.Answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
