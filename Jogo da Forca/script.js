const word = "life is good";
let guessedLetteres = [];
let incorrectGuesses = 0;

function displayWord() {
    const wordContainer = document.getElementById("wordContainer");
    wordContainer.innerHTML = "";

    for (let i = 0; i < word.length; i++) {
        const letter = guessedLetters.includes(word[i]) ? word[i] : "_";
        wordContainer.innerHTML += letter + " ";
    }
}

    function createAlphabetButtons () {
        const alphabetContainer = document.getElementById("alphabetContainer");
        const alphabet = "abcdefghijklmnopqrstuvwxyz";

        for (let i = 0; i < alphabet.length; i++) {
            const letterButton = document.createElement("button");
            letterButton.textContent = alphabet[i];
            letterButton.onclick = () => guessLetter(alphabet[i]);
            alphabetContainer.appendChild(letterButton);
        }
    }