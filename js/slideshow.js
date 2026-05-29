const slides = document.getElementById('slides');
const indicadores = document.querySelectorAll('.indicador');
const btnPrev = document.getElementById('slide-prev');
const btnNext = document.getElementById('slide-next');

const TOTAL = 3;
let atual = 0;
let intervalo;

function irPara(index) {
  atual = (index + TOTAL) % TOTAL;
  slides.style.transform = `translateX(-${atual * 100}%)`;
  indicadores.forEach((ind, i) => ind.classList.toggle('ativo', i === atual));
}

function avancar() { irPara(atual + 1); }
function recuar()  { irPara(atual - 1); }

function reiniciarIntervalo() {
  clearInterval(intervalo);
  intervalo = setInterval(avancar, 5000);
}

btnNext.addEventListener('click', () => { avancar(); reiniciarIntervalo(); });
btnPrev.addEventListener('click', () => { recuar();  reiniciarIntervalo(); });

indicadores.forEach(ind => {
  ind.addEventListener('click', () => {
    irPara(Number(ind.dataset.index));
    reiniciarIntervalo();
  });
});

reiniciarIntervalo();
