const inputPalpite = document.getElementById("inputPalpite");
const btnGo = document.getElementById("btnGo");
const resultadoDiv = document.getElementById("resultadoDiv");
let numeroSecreto = "";

while (numeroSecreto.length < 4) {
  let digitoAleatorio = Math.floor(Math.random() * 10).toString();
  if (!numeroSecreto.includes(digitoAleatorio)) {
    numeroSecreto += digitoAleatorio;
  }
}

let tentativas = 0;

function verificarTentativa() {
  let palpite = inputPalpite.value;
  if (palpite.length !== 4 || new Set(palpite).size !== 4) {
    resultadoDiv.innerHTML =
      "<p>Por favor insira um número com 4 dígitos únicos</p>";
    return;
  }
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < 4; i++) {
    if (palpite[i] === numeroSecreto[i]) {
      bulls++;
    } else if (numeroSecreto.includes(palpite[i])) {
      cows++;
    }
  }

  tentativas++;
  resultadoDiv.innerHTML =
    `<p>Tentativa #${tentativas}: ${palpite} | Bulls: ${bulls}, Cows: ${cows}</p>` +
    resultadoDiv.innerHTML;

  if (bulls === 4) {
    resultadoDiv.innerHTML =
      `<p>Parabéns! Você acertou o número secreto ${numeroSecreto} em ${tentativas} tentativas!</p>` +
      resultadoDiv.innerHTML;
  }

  inputPalpite.value = "";
}

btnGo.addEventListener("click", verificarTentativa);

const reiniciarJogo = () => {
  numeroSecreto = "";
  while (numeroSecreto.length < 4) {
    let digitoAleatorio = Math.floor(Math.random() * 10).toString();
    if (!numeroSecreto.includes(digitoAleatorio)) {
      numeroSecreto += digitoAleatorio;
    }
  }

  tentativas = 0;
  resultadoDiv.innerHTML = "";
  inputPalpite.value = "";
};

document.getElementById("btReiniciar").addEventListener("click", reiniciarJogo);
