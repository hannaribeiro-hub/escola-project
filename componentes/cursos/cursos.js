(function () {
  const grid = document.getElementById('cursosGrid');
  if (!grid) return;

  const baseImg = 'imagens/cursos/imagens/';

  fetch('imagens/cursos/dados/cursos.json')
    .then((r) => r.json())
    .then((data) => {
      grid.innerHTML = (data.cursos || []).map((c) => `
        <div class="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="h-48 w-full overflow-hidden relative">
              <img src="${baseImg}${c.imagem}" alt="${c.titulo}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <span class="absolute top-3 left-3 bg-${c.tagCor || 'primary'} text-white text-[12px] font-headline font-semibold px-2.5 py-1 rounded">${c.tag}</span>
            </div>
            <div class="p-6 space-y-4">
              <h3 class="font-headline font-bold text-headline-sm text-primary">${c.titulo}</h3>
              <div class="space-y-2 text-body-sm text-slate-600">
                <p><strong class="text-slate-900">O que oferece:</strong> ${c.oferece}</p>
                <p><strong class="text-slate-900">Indicado para:</strong> ${c.indicado}</p>
              </div>
            </div>
          </div>
          <div class="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-body-sm">
            <span class="text-secondary font-semibold">Carga: ${c.carga}</span>
          </div>
        </div>`).join('');
      observar();
    })
    .catch((err) => console.error('Erro ao carregar cursos:', err));

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
