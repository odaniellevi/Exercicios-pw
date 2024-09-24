document.getElementById('fetchRandomVerseButton').addEventListener('click', () => {
    const apiURL = `https://bible-api.com/?random=verse`;

    fetchRandomVerse(apiURL);
});

async function fetchRandomVerse(apiURL) {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`Eroo HTTP! status: ${response.status}`);
        }

        const verse = await response.text();

        console.log(verse);

        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = `<p>${verse}</p>`;
    } catch (error) {
        console.error('Erro ao buscar o versículo aleatório:', error);
        document.getElementById('output').textContent = `Erro ao buscar o versículo: ${error.message}`;
    }
}