'use strict';

// Refactoring: improving internal structure, readability, and maintainability
// without changing the external behavior of the app

// Generate a random secret number between 1 and 20
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // player starts with 20 points, loses 1 per wrong guess
let highscore = 0; // persists across rounds, tracks the best score

// Reusable helper function to update the message on screen
// Instead of repeating document.querySelector('.message') every time, we centralize it here
// We just call displayMessage('any text') anywhere we need it
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// --- CHECK BUTTON: runs every time the player clicks "Check" ---
document.querySelector('.check').addEventListener('click', function () {
  // Grab the input value and convert from string to number
  // Number("") → 0 (falsy), Number("5") → 5 (truthy)
  const guess = Number(document.querySelector('.guess').value);

  // CASE 1: No number entered → Number("") returns 0, which is falsy
  if (!guess) {
    displayMessage('⛔️ No Number');

    // CASE 2: Correct guess
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber; // reveal secret number

    // Update styles inline to give visual feedback (overrides CSS temporarily)
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // Only update highscore if the current score beats the previous best
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // CASE 3: Wrong guess (covers both too high and too low)
    // We use guess !== secretNumber instead of two separate else if blocks
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // Ternary operator used here to avoid repeating the same block twice
      // Since both "too high" and "too low" had identical logic (score--, update DOM)
      // the only difference was the message, so we pass the ternary directly as the argument
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');

      score--; // shorthand for score = score - 1
      document.querySelector('.score').textContent = score;
    } else {
      // Score has hit 0 → game over
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// --- AGAIN BUTTON: resets everything except the highscore ---
document.querySelector('.again').addEventListener('click', function () {
  score = 20; // reset score to starting value
  secretNumber = Math.trunc(Math.random() * 20) + 1; // generate a new secret number
  displayMessage('Start guessing...'); // reset message using helper function
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?'; // hide secret number again
  document.querySelector('.guess').value = ''; // clear the input field
  document.querySelector('body').style.backgroundColor = '#222'; // restore background
  document.querySelector('.number').style.width = '15rem'; // restore number box size
  // highscore is intentionally NOT reset — it persists across rounds
});
