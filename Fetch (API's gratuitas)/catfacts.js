const apiURL = 'https://cat-fact.herokuapp.com/#/';

async function fetchData() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        document.getElementById('output').innerHTML = json.stringify(data, null, 2);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        document.getElementById('output').textContent = 'Erro ao buscar dados da API';
    }

}

fetchData();