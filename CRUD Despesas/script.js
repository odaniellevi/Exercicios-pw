const inputDescription = document.getElementById("inputDescricption");
const inputValue = document.getElementById("inputValue");
const btAdic = document.getElementById("btAdic");
const olDespesas = document.getElementById("olDespesas");
const totalDespesas = document.getElementById("totalDespesa");

const baseUrl = "https://parseapi.back4app.com/classes/Despesas";
const headers = {
  "X-Parse-Application-Id": "AprcXNQtxwGIADPbOdFzEDFf1KN22MmZ3C1kLN3x",
  "X-Parse-REST-API-Key": "IUxSg4R9aja3wj6EStkDdIBzSjU555q9m0gmey9F",
};

const headersJson = {
  "Content-Type": "application/json",
  ...headers,
};

const getDespesas = async () => {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers,
  });

  const data = await response.json();
  olDespesas.innerHTML = "";
  let total = 0;

  data.results.forEach((despesa) => {
    const li = document.createElement("li");
    li.textContent = `${despesa.descricao}: R$${despesa.valor.tofixed(2)}`;

    const inputNewValue = document.createElement("input");
    inputNewValue.type = "number";
    inputNewValue.value = despesa.valor;
    li.appendChild(inputNewValue);

    const btnRefresh = document.createElement("button");
    btnRefresh.textContent = "Atualizar";
    btRrefresh.onclick = () =>
      refreshDespesa(despesa.objectId, inputNewValue.value);
    li.appendChild(btnRefresh);

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Deletar";
    btnDelete.onclick = () => deleteDespesa(despesa.objectId);
    li.appendChild(btnDelete);

    olDespesas.appendChild(li);
    total += despesa.valor;
  });

  totalDespesa.textContent = total.toFixed(2);
};

const addDespesa = async () => {
  const descricao = inputDescription.value;
  const valor = parseFloat(inputValue.value);
  if (!descricao || isNaN(valor)) {
    alert("Preencha todos os campos!");
    return;
  }

  const newDespesa = { descricao, valor };
  await fetch(baseUrl, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify(newDespesa),
  });

  inputDescription.value = "";
  inputValue.value = "";
  getDespesas();
};

const deleteDespesa = async (id) => {
  await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers,
  });
  getDespesas();
};

const refreshDespesa = async (id, novoValor) => {
  if (isNaN(novoValor) || novoValor <= 0) {
    alert("Insira um valor válido!");
    return;
  }

  await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: headersJson,
    body: JSON.stringify({ valor: parseFloat(novoValor) }),
  });
  getDespesas();
};

window.onload = getDespesas;
window.onclick = addDespesa;
