(function () {
  const grid = document.getElementById('alunosGrid');
  if (!grid) return;

  const baseImg = 'imagens/alunos/imagens/';

  fetch('imagens/alunos/dados/alunos.json')
    .then((r) => r.json())
    .then((data) => {
      grid.innerHTML = (data.alunos || []).map((a) => `
        <div class="bg-white p-5 rounded-xl border border-slate-200 flex items-start gap-4">
          <img src="${baseImg}${a.foto}" alt="${a.nome}" class="w-14 h-14 rounded-full object-cover border-2 border-${a.fotoBorda || 'primary'} flex-shrink-0">
          <div>
            <h4 class="font-headline font-bold text-slate-900 text-label-lg">${a.nome}</h4>
            <span class="text-${a.linhaCor || 'secondary'} text-[13px] font-semibold block">${a.linha}</span>
            <p class="text-body-sm text-slate-600 mt-1">${a.feito}</p>
          </div>
        </div>`).join('');
      observar();
    })
    .catch((err) => console.error('Erro ao carregar alunos:', err));

  function observar() {
    const itens = grid.querySelectorAll(':scope > div');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    itens.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 80}ms`;
      io.observe(el);
    });
  }
})();
