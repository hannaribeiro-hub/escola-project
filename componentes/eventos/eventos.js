(function () {
  const evState = {};

  window.slideEv = function (id, dir) {
    const track = document.getElementById(id);
    if (!track) return;
    const total = track.children.length;
    if (total <= 1) return;
    evState[id] = ((evState[id] || 0) + dir + total) % total;
    track.style.transform = `translateX(-${evState[id] * 100}%)`;
    const dots = document.getElementById(id + 'Dots');
    if (dots) {
      Array.from(dots.children).forEach((d, i) => {
        d.className = i === evState[id]
          ? 'w-4 h-1.5 rounded-full bg-white'
          : 'w-1.5 h-1.5 rounded-full bg-white/50';
      });
    }
  };

  const grid = document.getElementById('eventosGrid');
  if (!grid) return;

  const baseImg = 'conteudo/eventos/fotos/';

  fetch('conteudo/eventos/dados/eventos.json', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      grid.innerHTML = (data.eventos || []).map((ev, i) => {
        const trackId = `evTrack${i + 1}`;
        const fotos = ev.fotos || [];
        return `
        <div class="evento-card bg-white rounded-xl overflow-hidden border border-slate-200">
          <div class="img-wrap relative h-48 w-full overflow-hidden bg-slate-900">
            <div id="${trackId}" class="flex w-full h-full transition-transform duration-300">
              ${fotos.map((f) => `<img src="${baseImg}${f}" alt="${ev.titulo}" class="ev-img w-full h-full object-cover flex-shrink-0">`).join('')}
            </div>
            ${fotos.length > 1 ? `
            <button onclick="slideEv('${trackId}', -1)" class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center" aria-label="Foto anterior">
              <span class="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button onclick="slideEv('${trackId}', 1)" class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center" aria-label="Próxima foto">
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
            <div id="${trackId}Dots" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              ${fotos.map((_, j) => `<span class="${j === 0 ? 'w-4 h-1.5 rounded-full bg-white' : 'w-1.5 h-1.5 rounded-full bg-white/50'}"></span>`).join('')}
            </div>` : ''}
          </div>
          <div class="p-5">
            <h4 class="font-headline font-bold text-slate-900 text-label-lg mb-1">${ev.titulo}</h4>
            <p class="text-body-sm text-slate-600">${ev.descricao}</p>
          </div>
        </div>`;
      }).join('');
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
