document.getElementById("btSortear").addEventListener("click", function() {
    let menor = parseInt(document.getElementById("inputMenor").value);
    let maior = parseInt(document.getElementById("inputMaior").value);

    if (isNaN(menor) || isNaN(maior)) {
        alert("Por favor, insira valores numéricos.");
        return;
    }

    if (menor < 1 || maior > 100 || menor >= maior) {
        alert("Os valores devem estar entre 1 e 100, e  o menor deve ser menor que o maior.");
        return;
    }

    let sorteado = Math.floor(Math.random() * (maior - menor + 1)) + menor;

    document.getElementById("resultado").value = sorteado;
});