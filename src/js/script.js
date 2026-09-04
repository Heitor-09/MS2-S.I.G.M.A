const btnMigue = document.getElementById("btnMigue");
const btnCopiar = document.getElementById("btnCopiar");
const btnFavoritar = document.getElementById("btnFavoritar");

const migue = document.getElementById("migue");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

const alertaCopiado = document.getElementById("alertaCopiado");
const alertaFavorito = document.getElementById("alertaFavorito");

const desculpas = [
  // Transporte
  "Não consegui ir porque surgiu um compromisso familiar.",
  "O ônibus atrasou muito.",
  "Perdi o horário do ônibus/metrô.",
  "Fiquei preso no trânsito por mais de uma hora.",
  "Meu carro não quis ligar.",
  "Furei o pneu no caminho.",
  "Bati o carro (nada grave, mas tive que resolver tudo).",
  "Meu Uber cancelou em cima da hora e não achei outro.",
  "A rua estava interditada e tive que dar a volta.",
  "Fiquei sem gasolina no meio do caminho.",
  "O carro quebrou na estrada.",
  "Peguei o ônibus errado e fui parar longe.",
  "Tive que esperar o guincho porque o carro pifou.",
  "Estava chovendo muito forte e o trânsito travou tudo.",
  "Minha bike furou o pneu no caminho.",
  "O metrô parou por problema técnico.",
  "Fiquei preso num elevador.",
  "Não achei vaga pra estacionar e rodei um tempão.",
  "Meu voo atrasou/foi cancelado.",
  "A estrada estava interditada por acidente.",

  // Sono / rotina
  "Meu despertador não tocou.",
  "Dormi tarde demais e perdi a hora.",
  "Troquei o horário e achei que era mais tarde.",
  "Cochilei sem querer e passou da hora.",
  "Meu celular ficou no silencioso e o alarme não despertou.",
  "Passei a noite mal dormindo e não consegui acordar a tempo.",
  "Dormi na casa de alguém e não tinha como sair a tempo.",
  "Perdi a hora porque fiquei estudando/trabalhando até tarde.",

  // Tecnologia
  "Tive um problema com a internet.",
  "Meu computador parou de funcionar.",
  "Meu celular descarregou e não vi as mensagens.",
  "O sistema caiu bem na hora que eu precisava.",
  "Perdi o arquivo e tive que refazer tudo.",
  "Deu algum bug estranho e travei tudo.",
  "A energia caiu na minha casa/bairro.",
  "Minha reunião online travou e não consegui entrar.",
  "Meu celular quebrou e fiquei sem contato.",
  "Tomei um vírus no computador e perdi tudo.",
  "O Wi-Fi caiu bem na hora da chamada.",
  "Minha câmera/microfone parou de funcionar na hora H.",
  "O link da reunião não funcionava.",
  "Fiz o update do sistema e travou tudo.",
  "Perdi a senha e não consegui acessar a tempo.",

  // Saúde
  "Passei mal durante a noite.",
  "Tive uma dor de cabeça forte e precisei descansar.",
  "Fui parar no pronto-socorro por um imprevisto de saúde.",
  "Tive uma virose repentina.",
  "Torci o tornozelo e não consegui sair de casa.",
  "Tive uma crise de enxaqueca.",
  "Fiquei enjoado(a) o dia inteiro.",
  "Tive uma reação alérgica inesperada.",
  "Fui ao dentista de emergência.",
  "Tive uma dor nas costas que não me deixou levantar.",
  "Fiquei com febre alta de repente.",
  "Tive uma indigestão daquelas.",
  "Machuquei o pé e não conseguia andar direito.",
  "Tive uma crise de ansiedade e precisei me recompor.",
  "Estava com uma dor de garganta terrível.",

  // Família / pessoal
  "Esqueci completamente que tinha esse compromisso.",
  "Tive que cuidar de um familiar que passou mal.",
  "Meu filho/pet teve uma emergência.",
  "Surgiu um problema doméstico urgente (vazamento, curto-circuito etc).",
  "Tive uma emergência com meu animal de estimação.",
  "Alguém da família precisou de ajuda de última hora.",
  "Tive que levar alguém ao hospital.",
  "Minha casa alagou e tive que resolver na hora.",
  "Faltou água/luz em casa e precisei resolver isso.",
  "Tive uma briga de família que me deixou de cabeça em outro lugar.",
  "Precisei ficar com meu filho porque a escola cancelou a aula.",
  "O encanador/eletricista só pôde vir nesse horário.",
  "Recebi uma visita inesperada que não pude recusar.",

  // Trabalho / prazos
  "Achei que o prazo era amanhã.",
  "Tive que resolver uma situação urgente no trabalho.",
  "Fui chamado(a) para uma reunião de emergência.",
  "Meu chefe me pediu algo de última hora e não pude sair.",
  "Perdi o horário porque estava resolvendo outra pendência.",
  "Recebi uma demanda urgente que não pude adiar.",
  "Tive que cobrir o turno de um colega.",
  "Fui pego(a) de surpresa com uma auditoria/inspeção.",
  "O sistema da empresa caiu e tive que ficar resolvendo.",
  "Tive uma call que estourou o horário previsto.",
  "Meu horário de almoço foi cortado por uma urgência.",

  // Financeiro / burocracia
  "Tive que resolver um problema no banco.",
  "Fui fazer um pagamento urgente que não podia esperar.",
  "Tive um imprevisto com um boleto/conta.",
  "Precisei ir a um órgão público resolver uma pendência.",
  "Meu cartão foi bloqueado e tive que resolver na hora.",

  // Clima / força maior
  "Estava chovendo demais e não quis sair de casa.",
  "Tinha um temporal e ficamos sem conseguir sair.",
  "Fazia um calor insuportável e passei mal.",
  "Teve um alagamento na minha rua.",
  "Uma árvore caiu e bloqueou a rua.",
  "Houve uma queda de energia geral na região.",

  // Genéricas / imprevistos
  "Tive um imprevisto de última hora.",
  "Aconteceu algo inesperado e não consegui avisar antes.",
  "Me confundi com as datas.",
  "Achei que tinha cancelado esse compromisso.",
  "Simplesmente esqueci, foi mal.",
  "Estava sem sinal e não vi as mensagens a tempo.",
  "Tive um compromisso que surgiu do nada e não pude recusar.",
  "Fiquei preso em outra tarefa e perdi a noção do tempo.",
  "Me enrolei com outro compromisso e não deu tempo.",
  "Tive um mal-entendido com o horário combinado.",
  "Achei que era em outro lugar e fui pro endereço errado.",
  "Perdi as chaves de casa/carro e demorei pra resolver.",
  "Fiquei sem bateria no celular e perdi a hora.",
  "Recebi uma notícia que me deixou muito abalado(a) e precisei de um tempo.",
  "Tive um imprevisto que preferia não entrar em detalhes.",
  "Simplesmente rolou um perrengue daqueles.",
  "Deu ruim de um jeito que nem eu esperava.",
  "Foi um daqueles dias em que nada deu certo.",
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