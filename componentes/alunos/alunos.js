(function () {
  const grid = document.getElementById('alunosGrid');
  if (!grid) return;

  const baseImg = 'conteudo/alunos/fotos/';

  fetch('conteudo/alunos/dados/alunos.json', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      grid.innerHTML = (data.alunos || []).map((a) => `
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
          <div class="h-44 w-full overflow-hidden">
            <img src="${baseImg}${a.foto}" alt="${a.nome}" class="w-full h-full object-cover">
          </div>
          <div class="p-5 flex flex-col items-center text-center flex-1">
            <h3 class="font-headline font-bold text-headline-sm text-slate-900">${a.nome}</h3>
            <span class="text-body-sm font-semibold text-${a.linhaCor || 'secondary'} mb-2">${a.linha}</span>
            <p class="text-body-sm text-slate-600">${a.feito}</p>
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
