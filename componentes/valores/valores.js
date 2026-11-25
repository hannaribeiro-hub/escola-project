(function () {
  const grid = document.getElementById('valoresGrid');
  if (!grid) return;

  fetch('conteudo/valores/dados/itens.json', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      grid.innerHTML = (data.itens || []).map((item) => `
        <div class="p-6 rounded-lg border border-slate-200 hover:border-${item.cor}/40 transition-colors">
          <span class="material-symbols-outlined text-${item.cor} text-[32px] mb-3 block">${item.icone}</span>
          <h3 class="font-headline font-bold text-headline-sm text-slate-900 mb-1">${item.titulo}</h3>
          <p class="text-body-sm text-slate-600">${item.texto}</p>
          ${(item.lista || []).length ? `<div class="mt-4 flex flex-wrap gap-2">${item.lista.map((v, vi) => {
            const coresBox = ['bg-primary', 'bg-secondary', 'bg-accent'];
            const corBox = coresBox[vi % coresBox.length];
            return `<span class="px-3 py-1.5 rounded-lg ${corBox} text-white text-[13px] font-headline font-semibold">${v}</span>`;
          }).join('')}</div>` : ''}
        </div>`).join('');
      observar();
    })
    .catch((err) => console.error('Erro ao carregar valores:', err));

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
      el.style.transitionDelay = `${i * 60}ms`;
      io.observe(el);
    });
  }
})();
