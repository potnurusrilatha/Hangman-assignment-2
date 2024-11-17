// List of words and hints
const wordList = [
    { word: "javascript", 
      hint: "A popular programming language for the web" },
    { word: "developer", 
      hint: "A person who writes code" },
    { word: "function", 
      hint: "Reusable block of code" },
    { word: "variable", 
      hint: "A container for storing data values" },
    { word: "browser",
      hint: "Software used to browse the internet" },
    { word: "algorithm", 
      hint: "A set of steps to solve a problem" },
    { word: "debugging",
      hint: "The process of fixing errors in code" }
];

const maxAttempts = 5;
const hintRevealAfter = 4; 

//variables
 let secretWord;
 let hint;
 let displayedWord;
 let remainingAttempts;
 let guessedLetters;
 let incorrectGuesses;

//function to select a random word and its hint
const chooseRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
};

//function to generate the hidden word display with underscores
const generateHiddenWord = (selectedWord, guessedLetters) => {
   
    let hiddenWord = "";
        for (const character of selectedWord) {
            if (guessedLetters.includes(character)) {
                hiddenWord += character;
            } else {
                hiddenWord += "_";
            }
        }
        return hiddenWord;
}
//function to initialize the variables
const initializeGame = () => {
    const selectedWordObj = chooseRandomWord();
    secretWord = selectedWordObj.word;
    hint = selectedWordObj.hint;
    remainingAttempts = maxAttempts;
    guessedLetters = [];
    incorrectGuesses = 0;
    displayedWord = generateHiddenWord(secretWord, guessedLetters);
    console.log(`DEBUG: The selected word is "${secretWord}"`);
};

//function to get and validate user input
const getPlayerGuess = () => {
    while (true) {
        let playerInput = prompt(`Word: ${displayedWord}\nAttempts Left: ${remainingAttempts}\nGuessed Letters: ${guessedLetters.join(", ")}\nEnter a letter:`);

        if (playerInput === null) {
            if (confirm("Are you sure you want to quit the game?")) {
                alert("Game cancelled. Goodbye!");
                return null;
            } else {
                continue;
            }
        }

        //empty input

        if (playerInput.trim() === "") {
            alert("Please enter a letter. Input cannot be empty.");
            continue;
        }

        // Convert input to lowercase for consistency
        playerInput = playerInput.toLowerCase();

        // Validate that the input is a single letter
        if (playerInput.length !== 1 || !/^[a-z]$/.test(playerInput)) {
            alert("Invalid input. Please enter a single letter (a-z).");
        } else {
            return playerInput;
        }
    }
};

// update the game with the player's guess
const processPlayerGuess = guess => {
    if (guessedLetters.includes(guess)) {
        alert(`You've already guessed the letter "${guess}".`);
        return;
    }

    guessedLetters.push(guess);

    if (secretWord.includes(guess)) {
        alert(`Good job! The letter "${guess}" is in the word.`);
    } else {
        remainingAttempts--;
        incorrectGuesses++;
        alert(`Sorry! The letter "${guess}" is not in the word.`);
    }

    displayedWord = generateHiddenWord(secretWord, guessedLetters);
};

//function to check if the player has won
const hasPlayerWon = () => displayedWord === secretWord;

// Main arrow function to run the game
const startHangmanGame = () => {
    initializeGame();

    while (remainingAttempts > 0) {
        
        if (incorrectGuesses >= hintRevealAfter && hint) {
            alert(`Hint: ${hint}`);
            hint = null; 
        }

        const playerGuess = getPlayerGuess();

        if (playerGuess === null) return;

        processPlayerGuess(playerGuess);

      
        if (hasPlayerWon()) {
            alert(`Congratulations! You guessed the word "${secretWord}" correctly!`);
            break;
        }

        if (remainingAttempts === 0) {
            alert(`Game over! The correct word was "${secretWord}".`);
        }
    }

    // Ask the player if they want to play again
    //confirm("Do you want to play again?") ? startHangmanGame() : alert("Thanks for playing!");
            if (confirm("Do you want to play again?")) {
                startHangmanGame();
            } else {
                alert("Thanks for playing!");
            }
        
};

// Start the game 
 startHangmanGame();



