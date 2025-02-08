const targetColor = document.querySelector(".clor-game-screen");
const colorBtns = document.querySelectorAll(".btn");
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const showScore = document.querySelector(".score");
const scoreMiss = document.querySelector(".scoreMiss");
const newGameStatus = document.querySelector('[data-testid="newGameStatus"]'); // Select the new game button

let score = 0;
let miss = 0;
let results = [];

// Generate Random Colors
function getColorArray() {
    results = []; // Reset array before generating new colors
    for (let i = 0; i < 6; i++) {
        let color = "#";
        const letters = "0123456789ABCDEF";
        for (let j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        results.push(color);
    }
}

// Assign colors to buttons
function assignColor() {
    colorBtns.forEach((btn, index) => {
        btn.style.background = results[index];
    });
}

// Set random target background color
function setRandomBackgroundColor() {
    const randomBackgroundColor = results[Math.floor(Math.random() * results.length)];
    targetColor.style.background = randomBackgroundColor;
}

// Show confetti effect when the user guesses correctly
function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Check if selected button matches target color
function checkBackgroundColor() {
    colorBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (e.target.style.background === targetColor.style.background) {
                gameStatus.textContent = "You guessed right! 🎉";
                score++;
                showScore.textContent = `${score} /`;
                showConfetti(); // 🎊 Trigger confetti animation
            } else {
                gameStatus.textContent = "You guessed wrong! 😢";
                miss++;
                scoreMiss.textContent = ` ${miss}`;
            }
            resetGame(); // Dynamically change colors
        });
    });
}

// Reset game state dynamically
function resetGame() {
    getColorArray();
    assignColor();
    setRandomBackgroundColor();
}

// Restart Game - Resets Everything when the button is clicked
function restartGame() {
    score = 0; // Reset score
    miss = 0;  // Reset misse scores
    showScore.textContent = `${score} /`; // Update score display
    scoreMiss.textContent = ` ${miss}`;   // Update Missed score display
    gameStatus.textContent = "Game restarted! Try again."; // Reset message
    resetGame(); // Reset colors and target
}

// Add event listener to the "New Game" button
newGameStatus.addEventListener("click", restartGame);

// Initialize game
getColorArray();
assignColor();
setRandomBackgroundColor();
checkBackgroundColor(); // Only run once

