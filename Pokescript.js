// Get the canvas element and create a 2D drawing context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define player character properties
const playerWidth = 50;
const playerHeight = 50;
let playerX = 50;
let playerY = canvas.height / 2 - playerHeight / 2;
let playerSpeed = 5;

// Define obstacle properties
const obstacleWidth = 50;
const obstacleHeight = 50;
let obstacleX = canvas.width - obstacleWidth;
let obstacleY = canvas.height / 2 - obstacleHeight / 2;
let obstacleSpeed = 2;

// Game over flag
let isGameOver = false;

// Event listeners for player controls
document.addEventListener("keydown", movePlayer);

// Function to draw the player character
function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// Function to draw the obstacle (Pokemon)
function drawObstacle() {
    ctx.fillStyle = "green";
    ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
}

// Function to update the game
function updateGame() {
    if (!isGameOver) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update obstacle position
        obstacleX -= obstacleSpeed;

        // Draw player and obstacle
        drawPlayer();
        drawObstacle();

        // Check if the player is colliding with the obstacle
        if (
            playerX + playerWidth > obstacleX &&
            playerX < obstacleX + obstacleWidth &&
            playerY + playerHeight > obstacleY &&
            playerY < obstacleY + obstacleHeight
        ) {
            // Collision detected, end the game
            isGameOver = true;
        }

        // Request the next frame
        requestAnimationFrame(updateGame);
    } else {
        // Game over message
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 75, canvas.height / 2);
    }
}

// Function to handle player movement
function movePlayer(event) {
    switch (event.key) {
        case "ArrowLeft":
            if (playerX - playerSpeed > 0) {
                playerX -= playerSpeed;
            }
            break;
        case "ArrowRight":
            if (playerX + playerSpeed < canvas.width - playerWidth) {
                playerX += playerSpeed;
            }
            break;
    }
}

// Start the game
updateGame();
