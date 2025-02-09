const targetColor = document.querySelector(".clor-game-screen");
const colorBtns = document.querySelectorAll(".btn");
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const showScore = document.querySelector(".score");
const scoreMiss = document.querySelector(".scoreMiss");
const newGameStatus = document.querySelector('[data-testid="newGameStatus"]');
const timerEl = document.querySelector(".timeLeft");

let score = 0;
let miss = 0;
let timeLeft = 10; // Initial countdown time
let timerInterval;
let results = [];

// Generate Random Colors
function getColorArray() {
    results = [];
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
        btn.disabled = false; // Ensure buttons are enabled when game resets
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
                showConfetti();
            } else {
                gameStatus.textContent = "You guessed wrong! 😢";
                miss++;
                scoreMiss.textContent = `${miss}`;
            }
            resetGame(); // Generate new colors and target
            restartTimer(); // Restart the timer on every button click
        });
    });
}

// Reset game state dynamically
function resetGame() {
    getColorArray();
    assignColor();
    setRandomBackgroundColor();
}

// Restart Timer (Resets to 10 seconds)
function restartTimer() {
    clearInterval(timerInterval); // Clear existing timer
    timeLeft = 5; // Reset time
    timerEl.textContent = `Time left: ${timeLeft} seconds`;
    
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerEl.textContent = "Time's up!";
            endGame(); // Stop game when time runs out
        } else {
            timeLeft--;
            timerEl.textContent = `Time left: ${timeLeft} seconds`;
        }
    }, 1000);
}

// End Game (Disable buttons when time runs out)
function endGame() {
    gameStatus.textContent = "Game Over! Click 'New Game' to restart.";
    colorBtns.forEach((btn) => btn.disabled = true);
}

// Restart Game - Resets Everything when "New Game" button is clicked
function restartGame() {
    score = 0;
    miss = 0;
    showScore.textContent = `${score} /`;
    scoreMiss.textContent = `${miss}`;
    gameStatus.textContent = "Game restarted! Try again.";
    
    resetGame(); // Reset colors
    restartTimer(); // Restart the timer
}

// Add event listener to the "New Game" button
newGameStatus.addEventListener("click", restartGame);

// Initialize game
restartGame();
checkBackgroundColor();
