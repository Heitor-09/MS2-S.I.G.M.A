const btnMigue = document.getElementById("btnMigue");
const migue = document.getElementById("migue");
const mensagem = document.getElementById("mensagem");

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
  "Tive que resolver uma situação urgente.",
];

btnMigue.addEventListener("click", function () {
  const indice = Math.floor(Math.random() * desculpas.length);

  mensagem.textContent = desculpas[indice];

  migue.classList.remove("d-none");
  migue.classList.remove("animacao-alert");

  void migue.offsetWidth;

  migue.classList.add("animacao-alert");
});
