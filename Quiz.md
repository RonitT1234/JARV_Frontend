---
title: Quiz
---
<html>
<head>
    <link rel="stylesheet" type="text/css" href="QuizStyle.css">
</head>
<body>
    <div class="quiz-container">
        <h1>Test Your Pokemon Knowledge</h1>
        <p id="question"></p>
        <ul id="options-list">
            <li id="option-1" onclick="checkAnswer(1)">Bulbasaur</li>
            <li id="option-2" onclick="checkAnswer(2)">Charmander</li>
            <li id="option-3" onclick="checkAnswer(3)">Squirtle</li>
            <li id="option-4" onclick="checkAnswer(4)">Pikachu</li>
        </ul>
        <button id="next-button" disabled>Next</button>
        <button id="restart-button">Restart Quiz</button>
        <p id="result"></p>
    </div>
    <script src="Qscript.js"></script>
</body>
</html>