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
  "hino",
  "brasil",
  "computador",
  "internet",
  "programacao",
  "tecnologia",
  "planta",
  "floresta",
  "animal",
  "natureza",
  "fotografia",
  "arte",
  "musica",
  "filme",
  "video",
  "jogo",
  "esporte",
  "futebol",
  "basquete",
  "volei",
  "handebol",
  "natacao",
  "ginastica",
  "atletismo",
  "tenis",
  "almofada",
  "cama",
  "cobertor",
  "travesseiro",
  "colchao",
  "armario",
  "varanda",
  "sala",
  "cozinha",
  "banheiro",
  "quarto",
  "escritorio",
  "jardim",
  "garagem",
  "corredor",
  "porta",
  "janela",
  "telhado",
  "parede",
  "teto",
  "piso",
];

let palavraSecreta =
  palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();
let letrasRestantes = palavraSecreta.split("").map(() => "_");
let erros = 0;

function iniciarJogo() {
  document.getElementById("palavra-secreta").textContent =
    letrasRestantes.join(" ");
  document.getElementById("erros").textContent = `Erros: ${erros}`;
  gerarBotoesLetras();
}

function gerarBotoesLetras() {
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const botoesContainer = document.getElementById("botoes-letras");
  botoesContainer.innerHTML = ""; // Limpar botões existentes

  alfabeto.split("").forEach((letra) => {
    const botao = document.createElement("button");
    botao.textContent = letra;
    botao.setAttribute("data-letra", letra);
    botao.addEventListener("click", function () {
      verificarLetra(letra);
    });
    botoesContainer.appendChild(botao);
  });
}

function verificarLetra(letra) {
  if (palavraSecreta.includes(letra)) {
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (palavraSecreta[i] === letra) {
        letrasRestantes[i] = letra;
      }
    }
    atualizarPalavraSecreta();
    verificarVitoria();
  } else {
    erros++;
    atualizarErros();
    atualizarImagemForca();
    desativarBotaoLetra(letra);
    verificarDerrota();
  }
}

function atualizarPalavraSecreta() {
  document.getElementById("palavra-secreta").textContent =
    letrasRestantes.join(" ");
}

function atualizarErros() {
  document.getElementById("erros").textContent = `Erros: ${erros}`;
}

function atualizarImagemForca() {
  document.getElementById("boneco").src = `imagens/forca${erros}.png`;
}

function verificarVitoria() {
  if (!letrasRestantes.includes("_")) {
    document.getElementById("resultado").textContent = "Você venceu!";
    desativarBotoes();
  }
}

function verificarDerrota() {
  if (erros >= 6) {
    document.getElementById(
      "resultado"
    ).textContent = `Você perdeu! A palavra era: ${palavraSecreta}`;
    desativarBotoes();
  }
}

function desativarBotoes() {
  const botoes = document
    .getElementById("botoes-letras")
    .querySelectorAll("button");
  botoes.forEach((botao) => {
    botao.disabled = true;
    botao.classList.add("botao-desativado");
  });
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

function reiniciarJogo() {
  palavraSecreta =
    palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();
  erros = 0;
  letrasRestantes = palavraSecreta.split("").map(() => "_");
  document.getElementById("resultado").textContent = "";
  document.getElementById("palavra-secreta").textContent =
    letrasRestantes.join(" ");
  document.getElementById("erros").textContent = `Erros: ${erros}`;
  document.getElementById("boneco").src = "imagens/forca0.png";

  const botoes = document
    .getElementById("botoes-letras")
    .querySelectorAll("button");
  botoes.forEach((botao) => {
    botao.disabled = false;
    botao.classList.remove("botao-desativado");
  });

  iniciarJogo();
}

document.getElementById("btReiniciar").addEventListener("click", reiniciarJogo);

iniciarJogo();
