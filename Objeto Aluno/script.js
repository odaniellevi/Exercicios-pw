function transformarEmJSON() {
    let mat = document.getElementById("mat").value;
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let cpf = document.getElementById("cpf").value;

    if (!mat || !nome || !idade || !cpf) {
        alert("Todos os campos precisam ser preenchidos!");
        return;
    }

    if (!Number.isInteger(Number(idade))) {
        alert("A idade deve ser um número inteiro!");
        return;
    }

    let aluno = {
        mat: mat,
        nome: nome,
        idade: parseInt(idade),
        cpf: cpf
    };

    document.getElementById("resultado").textContent = JSON.stringify(aluno, null, 4);
}