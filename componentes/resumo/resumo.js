(function () {
  const grid = document.getElementById('resumoGrid');
  if (!grid) return;

  fetch('conteudo/resumo/dados/itens.json', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      grid.innerHTML = (data.itens || []).map((item) => `
        <div class="p-6 bg-white rounded-lg border border-slate-200 flex items-start gap-4">
          <div class="w-12 h-12 rounded-lg bg-${item.cor}/10 text-${item.cor} flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-[24px]">${item.icone}</span>
          </div>
          <div>
            <h3 class="font-headline font-bold text-headline-sm text-slate-900 mb-1">${item.titulo}</h3>
            <p class="text-body-sm text-slate-600">${item.texto}</p>
          </div>
        </div>`).join('');
      observar();
    })
    .catch((err) => console.error('Erro ao carregar resumo:', err));

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
