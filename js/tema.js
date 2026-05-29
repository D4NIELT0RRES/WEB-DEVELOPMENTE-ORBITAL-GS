const TEMA_KEY = 'orbital-watch-tema';

const botoes = document.querySelectorAll('.tema-btn');

function aplicarTema(tema) {
  document.body.className = tema;
  botoes.forEach(btn => {
    btn.classList.toggle('ativo', btn.dataset.tema === tema);
  });
  localStorage.setItem(TEMA_KEY, tema);
}

botoes.forEach(btn => {
  btn.addEventListener('click', () => aplicarTema(btn.dataset.tema));
});

const temaSalvo = localStorage.getItem(TEMA_KEY);
if (temaSalvo) {
  aplicarTema(temaSalvo);
}
