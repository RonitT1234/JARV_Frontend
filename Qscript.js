const questions = [
    {
        question: "What is the first Pokémon in the Pokédex?",
        options: ["Bulbasaur", "Pikachu", "Charizard", "Squirtle"],
        answer: "Bulbasaur",
    },
    {
        question: "What is the first Pokémon ever created?",
        options: ["Bulbasaur", "Charmander", "Pikachu", "Rhydon"],
        answer: "Rhydon",
    },
    {
        question: "Which type is strong against Water-type Pokémon?",
        options: ["Fire", "Electric", "Grass", "Psychic"],
        answer: "Grass",
    },
    // Add more questions
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsList = document.getElementById("options");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-button");

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;

    optionsList.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option");
        optionButton.addEventListener("click", () => checkAnswer(option));
        optionsList.appendChild(optionButton);
    });
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score++;
    }
    optionsList.querySelectorAll(".option").forEach((option) => {
        option.disabled = true;
    });
    resultElement.textContent = `Your score: ${score} / ${currentQuestionIndex + 1}`;
    nextButton.disabled = false;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        resultElement.textContent = "";
        nextButton.disabled = true;
        optionsList.querySelectorAll(".option").forEach((option) => {
            option.disabled = false;
        });
    } else {
        resultElement.textContent = `Quiz completed. Your final score: ${score} / ${questions.length}`;
    }
}

nextButton.addEventListener("click", nextQuestion);
loadQuestion();