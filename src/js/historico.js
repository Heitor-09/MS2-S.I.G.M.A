const historico = document.getElementById("historico");
const btnLimpar = document.getElementById("btnLimpar");

let migues = JSON.parse(localStorage.getItem("migues")) || [];

function mostrarHistorico() {
  historico.innerHTML = "";

  if (migues.length === 0) {
    historico.innerHTML = `
            <div class="alert alert-secondary text-center">
                Nenhum migué foi registrado ainda.
            </div>
        `;

    return;
  }

  migues.forEach(function (migue) {
    const item = document.createElement("div");

    item.className = "alert alert-light border shadow-sm";

    item.innerHTML = `
            <p class="mb-1 fw-semibold">${migue.texto}</p>
            <small class="text-secondary">
                Gerado às ${migue.horario}
            </small>
        `;

    historico.appendChild(item);
  });
}

btnLimpar.addEventListener("click", function () {
  localStorage.removeItem("migues");

  migues = [];

  mostrarHistorico();
});

mostrarHistorico();
