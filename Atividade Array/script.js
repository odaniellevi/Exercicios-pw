let vetor = [];

function adicionarValor() {
    let valor = document.getElementById("valor").value;

    if (valor === '') {
        alert("Por favor, insira um valor.");
        return;
    }

    valor = parseFloat(valor);
    vetor.push(valor);

    exibirValores();
    exibirMedia();

    document.getElementById("valor").value = '';
}

function exibirValores() {
    document.getElementById('valoresVetor').textContent = vetor.join(', ');
}

function exibirMedia() {
    let soma = vetor.reduce((acc, val) => acc + val, 0);
    let media = (vetor.length > 0) ? (soma / vetor.length).toFixed(2) : 0;

    document.getElementById('mediaVetor').textContent = media;
}