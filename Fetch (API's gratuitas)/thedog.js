const headers = new Headers({
    "Content-Type": "application/json",
    "live_Wh5aOuksfQcTu26s09h5Gms9vuT2a3oAOxDb4LqeyJvt1uGCZ2fzgNNvGKqqkw4q": "DEMO-API-KEY"
});

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result);

    const imageUrl = result[0].url;

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<img src="https://api.thecatapi.com/v1/images/search?limit=10" alt="Random Dog Image" />`;
  })
  .catch(error => console.log('error', error));