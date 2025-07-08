const wordBank = [
  { word: "fig", hint: "Fruit" },
  { word: "dog", hint: "Animal" },
  { word: "sun", hint: "Star" },
  { word: "mango", hint: "Fruit" },
  { word: "zebra", hint: "Animal" },
  { word: "lemon", hint: "Fruit" },
  { word: "planet", hint: "Space Object" },
  { word: "guitar", hint: "Instrument" },
  { word: "tomato", hint: "Fruit" },
  { word: "galaxy", hint: "Space Object" }
];

let selectedWord = "";
let selectedHint = "";
let guessedLetters = [];
let wrongLetters = [];
let lives = 5;
let timer;
let timeLeft = 10;

const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const wrongLettersDisplay = document.getElementById("wrongLetters");
const livesDisplay = document.getElementById("lives");
const hintText = document.getElementById("hintText");

function setDifficulty(length) {
  const filtered = wordBank.filter(w => w.word.length === length);
  const random = filtered[Math.floor(Math.random() * filtered.length)];

  selectedWord = random.word.toLowerCase();
  selectedHint = random.hint;
  guessedLetters = [selectedWord[0], selectedWord[selectedWord.length - 1]];
  wrongLetters = [];
  lives = 5;

  letterInput.disabled = false;
  letterInput.value = "";
  letterInput.focus();
  hintText.textContent = selectedHint;

  startTimer();
  updateDisplay();
}

function startGame() {
  const defaultLength = 5;
  setDifficulty(defaultLength);
}

function updateDisplay() {
  const wordHTML = selectedWord
    .split("")
    .map((letter, i) =>
      guessedLetters.includes(letter) || i === 0 || i === selectedWord.length - 1
        ? letter
        : "_"
    )
    .join(" ");

  wordDisplay.textContent = wordHTML;
  wrongLettersDisplay.textContent = wrongLetters.join(", ") || "None";
  livesDisplay.textContent = lives;

  if (!wordHTML.includes("_")) {
    clearInterval(timer);
    alert("🎉 You guessed the word!");
    letterInput.disabled = true;
  }

  if (lives <= 0) {
    clearInterval(timer);
    alert(`💀 Game Over! The word was "${selectedWord}"`);
    letterInput.disabled = true;
  }
}

function guessLetter() {
  const letter = letterInput.value.toLowerCase();
  if (
    !letter ||
    guessedLetters.includes(letter) ||
    wrongLetters.includes(letter) ||
    !letter.match(/^[a-z]$/)
  ) return;

  if (
    selectedWord.includes(letter) &&
    letter !== selectedWord[0] &&
    letter !== selectedWord[selectedWord.length - 1]
  ) {
    guessedLetters.push(letter);
  } else {
    wrongLetters.push(letter);
    lives--;
    shakeEffect();
  }

  letterInput.value = "";
  resetTimer();
  updateDisplay();
}

function shakeEffect() {
  wordDisplay.classList.add("shake");
  setTimeout(() => wordDisplay.classList.remove("shake"), 400);
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      lives--;
      shakeEffect();
      updateDisplay();
      if (lives > 0) resetTimer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}
