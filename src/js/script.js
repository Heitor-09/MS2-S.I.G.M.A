const btnMigue = document.getElementById("btnMigue");
const btnCopiar = document.getElementById("btnCopiar");
const btnFavoritar = document.getElementById("btnFavoritar");

const migue = document.getElementById("migue");
const mensagem = document.getElementById("mensagem");
const nivelBadge = document.getElementById("nivelBadge");
const contador = document.getElementById("contador");

const alertaCopiado = document.getElementById("alertaCopiado");
const alertaFavorito = document.getElementById("alertaFavorito");

const NIVEIS = {
  facil: { label: "🟢 cola facil", classe: "bg-success" },
  arriscado: { label: "🟡 arriscado", classe: "bg-warning text-dark" },
  duvidoso: { label: "🔴 duvidoso", classe: "bg-danger" },
};

let desculpas = [];
let totalMigue = Number(localStorage.getItem("contadorMigues")) || 0;
let tempoMigue, tempoCopiado, tempoFavorito;
let ultimoIndice = -1; // pra n repetir o msm migué 2x seguidas

contador.textContent = totalMigue;

// carrega as desculpas do json antes de liberar o botão
async function carregarDesculpas() {
  btnMigue.disabled = true;
  btnMigue.textContent = "carregando...";

  try {
    const res = await fetch("./src/data/desculpas.json");
    desculpas = await res.json();

    btnMigue.disabled = false;
    btnMigue.textContent = "clica aqui pra pegar um migué novo!";
  } catch (err) {
    console.error("deu ruim pra carregar as desculpas:", err);
    btnMigue.textContent = "deu erro pra carregar :(";
  }
}

carregarDesculpas();

// mostra um alerta com animação de entrada/saída
function mostrarAlerta(alerta, tempo) {
  clearTimeout(tempo);

  alerta.classList.remove("d-none", "animacao-alert", "animacao-saida");
  void alerta.offsetWidth; // reinicia a animação
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

// atualiza o badge de nível e reinicia a animação dele
function atualizarBadge(nivel) {
  const info = NIVEIS[nivel];

  nivelBadge.textContent = info.label;
  nivelBadge.className = "badge " + info.classe;

  nivelBadge.classList.remove("badge-animado");
  void nivelBadge.offsetWidth;
  nivelBadge.classList.add("badge-animado");
}

// retorna o horário atual formatado (ex: 14:32:07)
function horarioAtual() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// salva um item no início de uma lista no localStorage
function salvarNoHistorico(chave, item) {
  const lista = JSON.parse(localStorage.getItem(chave)) || [];
  lista.unshift(item);
  localStorage.setItem(chave, JSON.stringify(lista));
}

// gera um migué aleatório e atualiza tela + histórico
btnMigue.addEventListener("click", function () {
  if (desculpas.length === 0) return;

  let indice = Math.floor(Math.random() * desculpas.length);

  if (desculpas.length > 1) {
    while (indice === ultimoIndice) {
      indice = Math.floor(Math.random() * desculpas.length);
    }
  }

  ultimoIndice = indice;

  const novoMigue = desculpas[indice];

  mensagem.textContent = novoMigue.texto;
  atualizarBadge(novoMigue.nivel);

  totalMigue++;
  contador.textContent = totalMigue;
  localStorage.setItem("contadorMigues", totalMigue);

  salvarNoHistorico("migues", {
    texto: novoMigue.texto,
    nivel: novoMigue.nivel,
    horario: horarioAtual(),
  });

  btnFavoritar.disabled = false;
  tempoMigue = mostrarAlerta(migue, tempoMigue);
});

// copia o migué atual pra área de transferência
btnCopiar.addEventListener("click", function () {
  if (mensagem.textContent === "") return;

  navigator.clipboard.writeText(mensagem.textContent);
  tempoCopiado = mostrarAlerta(alertaCopiado, tempoCopiado);
});

// salva o migué atual como favorito
btnFavoritar.addEventListener("click", function () {
  if (mensagem.textContent === "") return;

  salvarNoHistorico("favoritos", {
    texto: mensagem.textContent,
    nivel: nivelBadge.textContent,
    horario: horarioAtual(),
  });

  btnFavoritar.disabled = true;
  tempoFavorito = mostrarAlerta(alertaFavorito, tempoFavorito);
});