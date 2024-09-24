document.getElementById('fetchCatFactButton').addEventListener('click', () => {
    const apiURL = 'https://meowfacts.herokuapp.com/';

    fetchCatFact(apiURL);
});

async function fetchCatFact(apiURL) {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
    }
}