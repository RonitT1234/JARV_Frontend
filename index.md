---
layout: default
title: Student Blog
---


<html>
<head>
    <title>Vote for Pokemon</title>
</head>
<body>
    <button id="upvoteButton" onclick="toggleVote('upvoteButton')">Upvote Pokemon</button>
    <button id="downvoteButton" onclick="toggleVote('downvoteButton')">Downvote Pokemon</button>
    <script>
        let currentVote = null; // Track the current vote state (null, 'upvote', or 'downvote')
        // Function to get and display the current vote count
        function updateVoteCount() {
            fetch("https://jarvproject.stu.nighthawkcodingsociety.com/api/pokemons/upvote/2")
            .then(response => response.json())
            .then(data => {
                document.getElementById("voteCount").textContent = `Votes: ${data.count}`;
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
        // Function to handle toggling between upvote and downvote
        function toggleVote(buttonId) {
            if (currentVote === buttonId) {
                return; // If the same button is clicked, do nothing
            }
            // Perform the new vote action (upvote or downvote)
            fetch(`https://jarvproject.stu.nighthawkcodingsociety.com/api/pokemons/${buttonId === 'upvoteButton' ? 'upvote' : 'downvote'}/2`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [buttonId === 'upvoteButton' ? 'upvote' : 'downvote']: true }), 
            })
            .then(() => {
                updateVoteCount(); // Update the vote count
                currentVote = buttonId; // Update the current vote state
            });
            // Enable both buttons
            document.getElementById('upvoteButton').disabled = false;
            document.getElementById('downvoteButton').disabled = false;
            // Disable the clicked button
            document.getElementById(buttonId).disabled = true;
        }
    </script>
</body>
</html>
