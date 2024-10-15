const baseUrl = "https://parseapi.back4app.com/classes/Despesas";
const headers = {
  "X-Parse-Application-Id": "AprcXNQtxwGIADPbOdFzEDFf1KN22MmZ3C1kLN3x",
  "X-Parse-REST-API-Key": "IUxSg4R9aja3wj6EStkDdIBzSjU555q9m0gmey9F",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const getDespesas = async () => {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers,
  });
  const data = await response.json();
  const despesas = data.results;
  const olDespesas = document.getElementById("olDespesas");
  olDespesas.innerHTML = "";

  let total = 0;
  despesas.forEach((despesa) => {
    const li = document.createElement("li");
    li.textContent = `${despesa.descricao}: R$ ${despesa.valor.toFixed(2)}`;
    olDespesas.appendChild(li);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Deletar";
    deleteButton.addEventListener("click", () =>
      deleteDespesa(despesa.objectId)
    );
    li.appendChild(deleteButton);

    const updateButton = document.createElement("button");
    updateButton.textContent = "Atualizar";
    updateButton.addEventListener("click", () => {
      const novoValor = prompt("Digite o novo valor:", despesa.valor);
      if (novoValor) {
        refreshDespesa(despesa.objectId, novoValor);
      }
    });
    li.appendChild(updateButton);

    total += despesa.valor;
  });

  document.getElementById("totalDespesa").textContent = total.toFixed(2);
};

const addDespesa = async () => {
  const descricao = document.getElementById("inputDescription").value;
  const valor = document.getElementById("inputValue").value;
  if (!descricao || isNaN(valor) || valor <= 0) {
    alert("Insira uma descrição e um valor válido!");
    return;
  }

  await fetch(baseUrl, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify({ descricao, valor: parseFloat(valor) }),
  });
  document.getElementById("inputDescription").value = "";
  document.getElementById("inputValue").value = "";
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
document.getElementById("btAdic").addEventListener("click", addDespesa);
