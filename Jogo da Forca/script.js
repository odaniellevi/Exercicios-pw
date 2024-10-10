const palavras = [
  "abacaxi",
  "anel",
  "amigo",
  "ave",
  "abacate",
  "bola",
  "bala",
  "banho",
  "bau",
  "banco",
  "casa",
  "cachorro",
  "carro",
  "cafe",
  "cama",
  "dado",
  "dedo",
  "doce",
  "dia",
  "dente",
  "elefante",
  "estrela",
  "escola",
  "elo",
  "escada",
  "faca",
  "festa",
  "fogo",
  "foca",
  "fada",
  "gato",
  "galo",
  "gelo",
  "goma",
  "ganso",
  "helicoptero",
  "hipopotamo",
  "hotel",
  "harpa",
  "horta",
  "ilha",
  "iglu",
  "iris",
  "indio",
  "ima",
  "janela",
  "jarra",
  "jogo",
  "jumento",
  "joaninha",
  "ketchup",
  "kiwi",
  "karate",
  "koala",
  "kamikaze",
  "leao",
  "lago",
  "lua",
  "lima",
  "livro",
  "maca",
  "mala",
  "muro",
  "mapa",
  "mesa",
  "neve",
  "ninho",
  "navio",
  "nuvem",
  "nota",
  "olho",
  "ovo",
  "onda",
  "ouro",
  "orelha",
  "pato",
  "peixe",
  "pipoca",
  "pato",
  "perna",
  "quilo",
  "quadro",
  "queijo",
  "quina",
  "queda",
  "raio",
  "rosa",
  "rede",
  "rato",
  "roupa",
  "sol",
  "sapo",
  "seda",
  "sabao",
  "sapato",
  "tigre",
  "touro",
  "teto",
  "tela",
  "tesoura",
  "uva",
  "urso",
  "urna",
  "uniao",
  "umidade",
  "vaca",
  "verao",
  "vento",
  "vela",
  "vidro",
  "webcam",
  "whisky",
  "waffle",
  "walker",
  "wifi",
  "xale",
  "xadrez",
  "xerox",
  "xarope",
  "xampu",
  "yoga",
  "yakisoba",
  "yogurte",
  "yeti",
  "yuppie",
  "zebra",
  "zoologico",
  "zumbi",
  "zero",
  "zagueiro",
];

let palavraSecreta = "";
let letrasRestantes = [];
let erros = 0;

function iniciarJogo() {
  palavraSecreta = escolherPalavraAleatoria();
  letrasRestantes = palavraSecreta.split("").map(() => "_");
  erros = 0;

  atualizarPalavraSecreta();
  gerarBotoesLetras();
  atualizarImagemForca();
}

function escolherPalavraAleatoria() {
  const index = Math.floor(Math.random() * palavras.length);
  return palavras[index];
}

function gerarBotoesLetras() {
  const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");
  const botoesDiv = document.getElementById("botoes-letras");
  botoesDiv.innerHTML = "";

  alfabeto.forEach((letra) => {
    const botao = document.createElement("button");
    botao.textContent = letra.toUpperCase();
    botao.onclick = () => verificarLetra(letra);
    botoesDiv.appendChild(botao);
  });
}

function verificarLetra(letra) {
  let acertou = false;

  palavraSecreta.split("").forEach((char, index) => {
    if (char === letra) {
      letrasRestantes[index] = letra;
      acertou = true;
    }
  });

  if (acertou) {
    atualizarPalavraSecreta();
    verificarVitoria();
  } else {
    erros++;
    atualizarImagemForca();
    verificarDerrota();
  }
}

function atualizarPalavraSecreta() {
  document.getElementById("palavra-secreta").textContent =
    letrasRestantes.join(" ");
}

function atualizarImagemForca() {
  document.getElementById("boneco").src = `imagens/forca${erros}.png`;
}

function verificarLetra(letra) {
  if (!palavraSecreta.includes(letra)) {
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (palavraSecreta[i] === letra) {
        letrasRestantes[i] = letra;
      }
    }

    document.getElementById("palavra").textContent = letrasRestantes.join(" ");
    if (!letrasRestantes.includes("_")) {
      document.getElementById("resultado").textContent = "Você venceu!";
      desativarBotoes();
    }
  } else {
    desativarBotaoLetra(letra);
    erros++;
    document.getElementById("erros").textContent = `Erros: ${erros}`;
    if (erros >= 6) {
      document.getElementById(
        "resultado"
      ).textContent = `Você perdeu! A palavra era: ${palavraSecreta}`;
      desativarBotoes();
    }
  }
}

function reiniciarJogo() {
  erros = 0;
  letrasRestantes = palavraSecreta.split("").map(() => "_");
  document.getElementById("resultado").textContent = "";
  document.getElementById("palavra").textContent = letrasRestantes.join(" ");
  document.getElementById("erros").textContent = `Erros: ${erros}`;

  const botoes = document
    .getElementById("botoes-letras")
    .querySelectorAll("button");
  botoes.forEach((botao) => {
    botao.disabled = false;
    botao.classList.remove("botao-desativado");
  });

  iniciarJogo();
}

function desativarBotaoLetra(letra) {
  const botao = document.querySelector(
    `#botoes-letras button[data-letra="${letra}"]`
  );
  if (botao) {
    botao.disabled = true;
    botao.classList.add("botao-desativado");
  }
}

document.querySelectorAll("#botoes-letras button").forEach((botao) => {
  botao.addEventListener("click", function () {
    const letra = this.getAttribute("data-letra");
    verificarLetra(letra);
  });
});

document.getElementById("btReiniciar").addEventListener("click", reiniciarJogo);

iniciarJogo();
