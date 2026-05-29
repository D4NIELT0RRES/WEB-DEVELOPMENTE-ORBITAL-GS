const perguntas = [
  {
    pergunta: "Quantos detritos espaciais são rastreados atualmente pela NORAD?",
    opcoes: ["~5.000", "~27.000", "~100.000", "~500.000"],
    correta: 1,
    explicacao: "A NORAD rastreia aproximadamente 27.000 objetos em órbita, mas estima-se que existam mais de 500.000 fragmentos menores invisíveis ao radar."
  },
  {
    pergunta: "Qual é o primeiro satélite 100% projetado e fabricado no Brasil?",
    opcoes: ["CBERS-4A", "SCD-2", "Amazonia-1", "SGDC-1"],
    correta: 2,
    explicacao: "O Amazonia-1, lançado em 2021 pela AEB, é o primeiro satélite inteiramente projetado e fabricado no Brasil."
  },
  {
    pergunta: "A que altitude o CBERS-4A orbita a Terra?",
    opcoes: ["400 km", "500 km", "628 km", "752 km"],
    correta: 2,
    explicacao: "O CBERS-4A orbita em órbita polar a 628 km de altitude, sendo usado pelo INPE para monitorar o desmatamento brasileiro."
  },
  {
    pergunta: "O que significa a sigla AEB?",
    opcoes: [
      "Agência Espacial Brasileira",
      "Agência de Engenharia do Brasil",
      "Autoridade Espacial Brasileira",
      "Associação de Engenharia Brasileira"
    ],
    correta: 0,
    explicacao: "AEB é a Agência Espacial Brasileira, órgão responsável pela política espacial nacional e pela operação de satélites como o Amazonia-1."
  },
  {
    pergunta: "Qual algoritmo o Orbital Watch utiliza para calcular a posição dos satélites?",
    opcoes: ["Kalman Filter", "Newton-Raphson", "SGP4", "Runge-Kutta"],
    correta: 2,
    explicacao: "O SGP4 (Simplified General Perturbations 4) é o algoritmo padrão NORAD para propagação orbital, usando dados TLE para calcular posições futuras."
  },
  {
    pergunta: "A que velocidade aproximada viajam os detritos em órbita baixa (LEO)?",
    opcoes: ["5.000 km/h", "10.000 km/h", "27.000 km/h", "100.000 km/h"],
    correta: 2,
    explicacao: "Em órbita baixa, os detritos viajam a cerca de 27.000 km/h — tão rápido que até um fragmento de 1 cm pode causar danos catastróficos a um satélite."
  },
  {
    pergunta: "Em que ano o Amazonia-1 foi lançado?",
    opcoes: ["2018", "2019", "2020", "2021"],
    correta: 3,
    explicacao: "O Amazonia-1 foi lançado em 28 de fevereiro de 2021 a bordo do foguete PSLV-C51 da ISRO, a partir do Centro Espacial Satish Dhawan, na Índia."
  },
  {
    pergunta: "O que significa a sigla TLE, usada pelo Orbital Watch?",
    opcoes: [
      "Terrestrial Location Engine",
      "Two-Line Element set",
      "Tracking and Logging Equipment",
      "Telemetry Launch Event"
    ],
    correta: 1,
    explicacao: "TLE (Two-Line Element set) é o formato padrão de dados orbitais composto por duas linhas de parâmetros que descrevem a órbita de um objeto espacial."
  },
  {
    pergunta: "Qual é o custo estimado do satélite CBERS-4A?",
    opcoes: ["US$ 10 milhões", "US$ 50 milhões", "US$ 250 milhões", "US$ 1 bilhão"],
    correta: 2,
    explicacao: "O CBERS-4A tem custo estimado de US$ 250 milhões. Perder esse satélite por colisão com detrito seria um prejuízo enorme para o Brasil."
  },
  {
    pergunta: "A qual Objetivo de Desenvolvimento Sustentável (ODS) da ONU o Orbital Watch está alinhado?",
    opcoes: ["ODS 7 — Energia Limpa", "ODS 9 — Indústria e Inovação", "ODS 13 — Ação Climática", "ODS 17 — Parcerias"],
    correta: 1,
    explicacao: "O Orbital Watch está alinhado ao ODS 9 — Indústria, Inovação e Infraestrutura, por desenvolver infraestrutura tecnológica nacional resiliente e inovadora."
  }
];

let perguntaAtual = 0;
let acertos = 0;
let respondeu = false;

const elPerguntaTexto  = document.getElementById('quiz-pergunta-texto');
const elOpcoes         = document.getElementById('quiz-opcoes');
const elFeedback       = document.getElementById('quiz-feedback');
const elProximo        = document.getElementById('quiz-proximo');
const elResultado      = document.getElementById('quiz-resultado');
const elBlocoQuestao   = document.getElementById('quiz-pergunta-bloco');
const elProgresso      = document.getElementById('quiz-progresso-texto');
const elPontos         = document.getElementById('quiz-pontos-texto');
const elBarra          = document.getElementById('quiz-barra');
const elNumero         = document.getElementById('quiz-numero');
const elReiniciar      = document.getElementById('quiz-reiniciar');
const elEmblema        = document.getElementById('resultado-emblema');
const elPontuacao      = document.getElementById('resultado-pontuacao');
const elMensagem       = document.getElementById('resultado-mensagem');
const elDetalhe        = document.getElementById('resultado-detalhe');

function carregarPergunta() {
  respondeu = false;
  const p = perguntas[perguntaAtual];

  elNumero.textContent = `PERGUNTA ${perguntaAtual + 1}`;
  elPerguntaTexto.textContent = p.pergunta;
  elProgresso.textContent = `Pergunta ${perguntaAtual + 1} de 10`;
  elBarra.style.width = `${(perguntaAtual / 10) * 100}%`;

  elOpcoes.innerHTML = '';
  elFeedback.className = 'quiz-feedback';
  elFeedback.textContent = '';
  elProximo.style.display = 'none';

  p.opcoes.forEach((opcao, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opcao';
    btn.textContent = opcao;
    btn.addEventListener('click', () => responder(i, btn));
    elOpcoes.appendChild(btn);
  });
}

function responder(indice, btnClicado) {
  if (respondeu) return;
  respondeu = true;

  const p = perguntas[perguntaAtual];
  const correto = indice === p.correta;

  if (correto) acertos++;

  elPontos.textContent = `${acertos} acerto${acertos !== 1 ? 's' : ''}`;

  const botoes = elOpcoes.querySelectorAll('.quiz-opcao');
  botoes.forEach((btn, i) => {
    btn.disabled = true;
    if (i === p.correta) btn.classList.add('correta');
    if (i === indice && !correto) btn.classList.add('errada');
  });

  elFeedback.textContent = correto
    ? `Correto! ${p.explicacao}`
    : `Errado. ${p.explicacao}`;
  elFeedback.className = `quiz-feedback visivel ${correto ? 'acerto' : 'erro'}`;

  const ultimaPergunta = perguntaAtual === perguntas.length - 1;
  elProximo.textContent = ultimaPergunta ? 'Ver resultado' : 'Próxima pergunta';
  elProximo.style.display = 'inline-block';
}

function mostrarResultado() {
  elBlocoQuestao.style.display = 'none';
  elProximo.style.display = 'none';
  elResultado.classList.add('visivel');
  elBarra.style.width = '100%';
  elProgresso.textContent = 'Quiz concluído!';

  elPontuacao.textContent = acertos;

  const pct = acertos / 10;
  let emblema, mensagem, detalhe;

  if (pct === 1) {
    emblema  = '🏆';
    mensagem = 'Especialista em detritos orbitais!';
    detalhe  = 'Parabéns! Você acertou todas as questões. Seu conhecimento sobre o programa espacial brasileiro e o problema dos detritos orbitais é impressionante.';
  } else if (pct >= 0.8) {
    emblema  = '🚀';
    mensagem = 'Excelente conhecimento espacial!';
    detalhe  = 'Ótimo desempenho! Você demonstra sólido entendimento sobre os satélites brasileiros e a problemática dos detritos em órbita.';
  } else if (pct >= 0.6) {
    emblema  = '🛰️';
    mensagem = 'Bom conhecimento sobre o tema!';
    detalhe  = 'Você sabe bastante sobre o assunto! Continue explorando para aprofundar seu conhecimento sobre monitoramento orbital e soberania espacial brasileira.';
  } else if (pct >= 0.4) {
    emblema  = '🌍';
    mensagem = 'Conhecimento intermediário.';
    detalhe  = 'Você conhece o básico sobre o tema. Explore mais o conteúdo do Orbital Watch para aprender sobre detritos espaciais e satélites brasileiros.';
  } else {
    emblema  = '🔭';
    mensagem = 'Continue explorando o cosmos!';
    detalhe  = 'O universo está esperando por você! Explore as seções do Orbital Watch para descobrir mais sobre o problema dos detritos e como o Brasil protege seus satélites.';
  }

  elEmblema.textContent  = emblema;
  elMensagem.textContent = mensagem;
  elDetalhe.textContent  = detalhe;
}

elProximo.addEventListener('click', () => {
  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++;
    carregarPergunta();
  } else {
    mostrarResultado();
  }
});

elReiniciar.addEventListener('click', () => {
  perguntaAtual = 0;
  acertos = 0;
  respondeu = false;
  elResultado.classList.remove('visivel');
  elBlocoQuestao.style.display = '';
  elPontos.textContent = '0 acertos';
  carregarPergunta();
});

carregarPergunta();
