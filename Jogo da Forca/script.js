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

function guessLetter(letter) {
    if(word.includes(letter)) {
        guessedLetteres.push(letter);
        displayWord();

        if (!document.getElementById("wordContainer").textContent.includes("_")) {
            alert("Parabéns, você ganhou!");
            disableAllButtons();
        }
    } else {
        incorrectGuesses++;
        updateHangmanImage();

        if (incorrectGuesses === 6) {
            alert("Você perdeu! A palavra correta era: " + word);
            disableAllButtons();
        }
    }
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById("hangmanImage");
    hangmanImage.src = `img/forca${incorrectGuesses}.png`;
}