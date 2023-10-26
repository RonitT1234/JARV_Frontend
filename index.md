---
layout: default
title: Student Blog
---

![Alt text](images/pokemon.png)

# Pokedex by Ronit T, Vance R, Jared B, Ashwin V.
<html>
<head>
    <title>Vote for Pokemon</title>
    <style>
        /* Define the style for the grid container */
        .grid-container {
            display: grid;
            grid-template-columns: repeat(2, 200px);
            grid-template-rows: repeat(2, 200px);
            gap: 10px;
        }

        /* Define the style for the individual squares */
        .grid-item {
            background-color: #3498db;
            border: 1px solid #333;
            text-align: center;
            font-size: 20px;
        }

        /* Style for the vote buttons */
        .vote-button {
            width: 80px;
            height: 40px;
            background-color: #4CAF50;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="grid-container">
        <!-- Box 0 -->
        <div class="grid-item">
            <p>Box 0</p>
            <button class="vote-button" id="upvoteButton0" onclick="toggleVote(0, 'upvoteButton0')">Upvote</button>
            <button class="vote-button" id="downvoteButton0" onclick="toggleVote(0, 'downvoteButton0')">Downvote</button>
            <p id="voteCount0">Votes: 0</p>
        </div>

        <!-- Box 1 -->
        <div class="grid-item">
            <p>Box 1</p>
            <button class="vote-button" id="upvoteButton1" onclick="toggleVote(1, 'upvoteButton1')">Upvote</button>
            <button class="vote-button" id="downvoteButton1" onclick="toggleVote(1, 'downvoteButton1')">Downvote</button>
            <p id="voteCount1">Votes: 0</p>
        </div>

        <!-- Box 2 -->
        <div class="grid-item">
            <p>Box 2</p>
            <button class="vote-button" id="upvoteButton2" onclick="toggleVote(2, 'upvoteButton2')">Upvote</button>
            <button class="vote-button" id="downvoteButton2" onclick="toggleVote(2, 'downvoteButton2')">Downvote</button>
            <p id="voteCount2">Votes: 0</p>
        </div>

        <!-- Box 3 -->
        <div class="grid-item">
            <p>Box 3</p>
            <button class="vote-button" id="upvoteButton3" onclick="toggleVote(3, 'upvoteButton3')">Upvote</button>
            <button class="vote-button" id="downvoteButton3" onclick="toggleVote(3, 'downvoteButton3')">Downvote</button>
            <p id="voteCount3">Votes: 0</p>
        </div>
    </div>

    <script>
        let currentVotes = [0, 0, 0, 0]; // Track the current vote states for each box

        // Function to get and display the current vote count for a box
        function updateVoteCount(boxId) {
            fetch(`https://jarvproject.stu.nighthawkcodingsociety.com/api/pokemons/upvote/${boxId}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById(`voteCount${boxId}`).textContent = `Votes: ${data.count}`;
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }

        // Function to handle toggling between upvote and downvote for a box
        function toggleVote(boxId, buttonId) {
            if (currentVotes[boxId] === buttonId) {
                return; // If the same button is clicked, do nothing
            }

            // Perform the new vote action (upvote or downvote) for the box
            fetch(`https://jarvproject.stu.nighthawkcodingsociety.com/api/pokemons/${buttonId === `upvoteButton${boxId}` ? 'upvote' : 'downvote'}/${boxId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [buttonId === `upvoteButton${boxId}` ? 'upvote' : 'downvote']: true }),
            })
                .then(() => {
                    updateVoteCount(boxId); // Update the vote count for the box
                    currentVotes[boxId] = buttonId; // Update the current vote state for the box
                });

            // Enable both buttons for the box
            document.getElementById(`upvoteButton${boxId}`).disabled = false;
            document.getElementById(`downvoteButton${boxId}`).disabled = false;
            // Disable the clicked button for the box
            document.getElementById(buttonId).disabled = true;
        }

        // Initialize the vote counts for all boxes
        for (let i = 0; i <= 3; i++) {
            updateVoteCount(i);
        }
    </script>
</body>
</html>
