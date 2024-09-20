function separateWord() {
    const word = document.getElementById("wordInput").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    for (let i = 0; i < word.length; i++) {
        const letterDiv = document.createElement("div");
        letterDiv.className = "letter-box";
        letterDiv.textContent = word[i];
        resultDiv.appendChild(letterDiv);
    }
}