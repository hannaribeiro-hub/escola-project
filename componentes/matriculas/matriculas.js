(function () {
  const secao = document.querySelector('#matriculas');
  const form = document.getElementById('form-matricula');
  if (!secao || !form) return;

  const colunas = secao.querySelectorAll('.lg\\:col-span-7, .lg\\:col-span-5');
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.15 }
  );
  colunas.forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = true;

    const feedback = document.createElement('p');
    feedback.className = 'form-feedback form-feedback--success';
    feedback.setAttribute('role', 'status');
    feedback.textContent = 'Obrigado! A equipe pedagógica do CETI Parnaíba entrará em contato.';
    form.appendChild(feedback);
    form.reset();
  });
})();
