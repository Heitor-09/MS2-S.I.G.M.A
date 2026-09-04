const btnMigue = document.getElementById("btnMigue");
const btnCopiar = document.getElementById("btnCopiar");
const btnFavoritar = document.getElementById("btnFavoritar");

const migue = document.getElementById("migue");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

const alertaCopiado = document.getElementById("alertaCopiado");
const alertaFavorito = document.getElementById("alertaFavorito");

const desculpas = [
    "Não consegui ir porque surgiu um compromisso familiar.",
    "Meu despertador não tocou.",
    "Tive um problema com a internet.",
    "O ônibus atrasou muito.",
    "Esqueci completamente que tinha esse compromisso.",
    "Passei mal durante a noite.",
    "Tive um imprevisto de última hora.",
    "Meu computador parou de funcionar.",
    "Achei que o prazo era amanhã.",
    "Tive que resolver uma situação urgente."
];

let totalMigue = Number(localStorage.getItem("contadorMigues")) || 0;
let tempoMigue;
let tempoCopiado;
let tempoFavorito;

contador.textContent = totalMigue;

function mostrarAlerta(alerta, tempo) {
    clearTimeout(tempo);

    alerta.classList.remove("d-none");
    alerta.classList.remove("animacao-alert");
    alerta.classList.remove("animacao-saida");

    void alerta.offsetWidth;

    alerta.classList.add("animacao-alert");

    return setTimeout(function () {
        alerta.classList.remove("animacao-alert");
        alerta.classList.add("animacao-saida");

        setTimeout(function () {
            alerta.classList.add("d-none");
            alerta.classList.remove("animacao-saida");
        }, 400);
    }, 1500);
}

btnMigue.addEventListener("click", function () {
    const indice = Math.floor(Math.random() * desculpas.length);

    const novoMigue = desculpas[indice];

    mensagem.textContent = novoMigue;

    totalMigue++;

    contador.textContent = totalMigue;

    localStorage.setItem("contadorMigues", totalMigue);

    const agora = new Date();

    const horario = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const migues = JSON.parse(localStorage.getItem("migues")) || [];

    migues.unshift({
        texto: novoMigue,
        horario: horario
    });

    localStorage.setItem("migues", JSON.stringify(migues));

    btnFavoritar.disabled = false;

    tempoMigue = mostrarAlerta(migue, tempoMigue);
});

btnCopiar.addEventListener("click", function () {
    if (mensagem.textContent === "") {
        return;
    }

    navigator.clipboard.writeText(mensagem.textContent);

    tempoCopiado = mostrarAlerta(alertaCopiado, tempoCopiado);
});

btnFavoritar.addEventListener("click", function () {
    if (mensagem.textContent === "") {
        return;
    }

    const agora = new Date();

    const horario = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const favoritos = JSON.parse(
        localStorage.getItem("favoritos")
    ) || [];

    favoritos.unshift({
        texto: mensagem.textContent,
        horario: horario
    });

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    btnFavoritar.disabled = true;

    tempoFavorito = mostrarAlerta(
        alertaFavorito,
        tempoFavorito
    );
});