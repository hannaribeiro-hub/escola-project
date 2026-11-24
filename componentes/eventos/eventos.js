(function () {
  const evState = {};

  window.nextEv = function (id, total) {
    if (!evState[id]) evState[id] = 0;
    evState[id] = (evState[id] + 1) % total;
    const track = document.getElementById(id);
    if (track) track.style.transform = `translateX(-${evState[id] * 100}%)`;
  };

  const grid = document.getElementById('eventosGrid');
  if (!grid) return;

  const baseImg = 'conteudo/eventos/fotos/';

  fetch('conteudo/eventos/dados/eventos.json')
    .then((r) => r.json())
    .then((data) => {
      grid.innerHTML = (data.eventos || []).map((ev, i) => `
        <div class="bg-white rounded-xl overflow-hidden border border-slate-200">
          <div class="relative h-48 w-full overflow-hidden bg-slate-900">
            <div id="evTrack${i + 1}" class="flex w-full h-full transition-transform duration-300">
              ${(ev.fotos || []).map((f) => `<img src="${baseImg}${f}" alt="${ev.titulo}" class="w-full h-full object-cover flex-shrink-0">`).join('')}
            </div>
            <button onclick="nextEv('evTrack${i + 1}', ${(ev.fotos || []).length})" class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center" aria-label="Ver próxima foto">
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
          <div class="p-5">
            <h4 class="font-headline font-bold text-slate-900 text-label-lg mb-1">${ev.titulo}</h4>
            <p class="text-body-sm text-slate-600">${ev.descricao}</p>
          </div>
        </div>`).join('');
      observar();
    })
    .catch((err) => console.error('Erro ao carregar eventos:', err));

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
