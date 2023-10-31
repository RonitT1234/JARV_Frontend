const questions = [
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
    {
        question: "What device do trainers use to access a database of all their Pokemon?",
        options: ["Pokelist", "Pokedex", "Pokemon Training Chart", "Poke-Catalog"],
        answer: "Pokedex",
    },
    {
        question: "As of October 2023, how many pokemon generations are there?",
        options: ["6","7","9","13"],
        answer: "9",
    },
    {
        question: "Who gave Ash Ketchum his first pokemon?"
        options: ["Professor Oak", "Nurse Joy", "Professor X", "Mr. Fox"],
        answer: "Professor Oak",
    },
    {
        question: "Who does Pikachu evolve into?",
        options: ["Pichu", "Chuchu", "Pekuchi","Raichu"],
        answer: "",
    }
    {
        question: "What is the first Pokémon the Pokédex? (Not first created)",
        options: ["Bulbasaur", "Pikachu", "Charizard", "Squirtle"],
        answer: "Bulbasaur",
    },
    {
        question: "How do you make a ditto return to its normal form?",
        options: ["Make it cry", "Give it food", "Beat it in a battle", "Make it laugh"],
        answer: "Make it laugh",
    },
    {
        question: "What Pokemon was Ash's first catch?",
        options: ["Pikachu","Squirtle","Caterpie","Magicarp"],
        answer: "Caterpie",
    },
    {
        question: "Which of these Pokemon is a fairy type",
        options: ["Jigglypuff", "Diglett", "Eevee", "Snorlax"],
        answer: "Jigglypuff",
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