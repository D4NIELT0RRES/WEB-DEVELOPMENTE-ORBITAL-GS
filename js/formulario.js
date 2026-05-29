const form = document.getElementById('form-contato');

const campos = {
  nome:     { el: document.getElementById('nome'),      erro: document.getElementById('erro-nome') },
  email:    { el: document.getElementById('email'),     erro: document.getElementById('erro-email') },
  assunto:  { el: document.getElementById('assunto'),   erro: document.getElementById('erro-assunto') },
  mensagem: { el: document.getElementById('mensagem'),  erro: document.getElementById('erro-mensagem') },
};

const sucesso = document.getElementById('form-sucesso');

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function marcarErro(campo, msg) {
  campo.el.classList.add('erro');
  campo.erro.textContent = msg;
  campo.erro.classList.add('visivel');
}

function limparErro(campo) {
  campo.el.classList.remove('erro');
  campo.erro.classList.remove('visivel');
}

function validarCampo(nome) {
  const campo = campos[nome];
  const valor = campo.el.value.trim();

  if (nome === 'email') {
    if (!valor) {
      marcarErro(campo, 'Por favor, informe seu e-mail.');
      return false;
    }
    if (!validarEmail(valor)) {
      marcarErro(campo, 'Por favor, informe um e-mail válido.');
      return false;
    }
  } else {
    if (!valor) {
      marcarErro(campo, campo.erro.textContent || `Por favor, preencha este campo.`);
      return false;
    }
  }

  limparErro(campo);
  return true;
}

Object.keys(campos).forEach(nome => {
  const { el } = campos[nome];
  el.addEventListener('blur', () => validarCampo(nome));
  el.addEventListener('input', () => {
    if (el.classList.contains('erro')) validarCampo(nome);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const validos = Object.keys(campos).map(validarCampo);
  if (validos.includes(false)) return;

  sucesso.classList.add('visivel');
  form.reset();
  Object.keys(campos).forEach(nome => limparErro(campos[nome]));

  setTimeout(() => sucesso.classList.remove('visivel'), 5000);
});
