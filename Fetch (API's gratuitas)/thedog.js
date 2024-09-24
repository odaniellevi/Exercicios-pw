const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY"
});

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result); 

    if (result && result.length > 0) {
      const imageUrl = result[0].url;

      const outputDiv = document.getElementById('output');
      if (imageUrl) {
        outputDiv.innerHTML = `<img src="${imageUrl}" alt="Random Dog Image" style="max-width: 300px;" />`;
      } else {
        outputDiv.textContent = 'Não foi possível carregar a imagem.';
      }
    } else {
      console.log('Nenhuma imagem foi retornada.');
    }
  })
  .catch(error => {
    console.log('Erro ao buscar dados da API:', error);
    document.getElementById('output').textContent = 'Erro ao buscar dados da API';
  });
