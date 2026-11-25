(function () {
  const grid = document.getElementById('parceriasGrid');
  if (!grid) return;

  fetch('conteudo/parcerias/dados/parcerias.json', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      grid.innerHTML = (data.parcerias || []).map((p) => `
        <div class="p-6 rounded-lg border border-slate-200 bg-white hover:border-${p.cor || 'primary'}/40 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <span class="material-symbols-outlined text-${p.cor || 'primary'} text-[32px]">${p.icone || 'handshake'}</span>
            <h3 class="font-headline font-bold text-headline-sm text-slate-900">${p.nome}</h3>
          </div>
          <p class="text-body-sm text-slate-600 mb-3">${p.introducao || ''}</p>
          <ul class="space-y-2 text-body-sm text-slate-700">
            ${(p.itens || []).map((item) => `<li class="flex items-start gap-2"><span class="w-1.5 h-1.5 rounded-full bg-${p.cor || 'primary'} mt-2 flex-shrink-0"></span><span>${item}</span></li>`).join('')}
          </ul>
        </div>`).join('');
      observar();
    })
    .catch((err) => console.error('Erro ao carregar parcerias:', err));

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
