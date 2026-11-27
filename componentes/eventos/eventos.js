(function () {
  const viewer = document.getElementById('eventosViewer');
  if (!viewer) return;

  const track = document.getElementById('evTrack');
  const dotsEl = document.getElementById('evDots');
  const tituloEl = document.getElementById('evTitulo');
  const descEl = document.getElementById('evDesc');
  const prevBtn = document.getElementById('evPrev');
  const nextBtn = document.getElementById('evNext');

  const baseImg = 'conteudo/eventos/fotos/';
  let slides = [];
  let eventos = [];
  let idx = 0;

  fetch('conteudo/eventos/dados/eventos.json', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      eventos = data.eventos || [];
      slides = [];
      eventos.forEach((ev) => {
        (ev.fotos || []).forEach((f) => slides.push({ evento: ev, foto: f }));
      });
      if (!slides.length) return;

      track.innerHTML = slides.map((s) => `
        <img src="${baseImg}${s.foto}" alt="${s.evento.titulo}" class="w-full h-[320px] sm:h-[420px] md:h-[480px] object-cover flex-shrink-0">`).join('');

      dotsEl.innerHTML = eventos.map((_, i) => `
        <button data-ev="${i}" class="ev-dot h-1.5 rounded-full transition-all" aria-label="Ir para evento"></button>`).join('');
      dotsEl.querySelectorAll('.ev-dot').forEach((d) => {
        d.addEventListener('click', () => goToEvento(parseInt(d.dataset.ev, 10)));
      });

      prevBtn.addEventListener('click', () => go(-1));
      nextBtn.addEventListener('click', () => go(1));

      render();
      observar();
    })
    .catch((err) => console.error('Erro ao carregar eventos:', err));

  function eventoIndex(ev) {
    return eventos.indexOf(ev);
  }

  function go(dir) {
    idx = (idx + dir + slides.length) % slides.length;
    render();
  }

  function goToEvento(i) {
    const primeiro = slides.findIndex((s) => eventoIndex(s.evento) === i);
    if (primeiro >= 0) {
      idx = primeiro;
      render();
    }
  }

  function render() {
    track.style.transform = `translateX(-${idx * 100}%)`;
    const atual = slides[idx];
    tituloEl.textContent = atual.evento.titulo;
    descEl.textContent = atual.evento.descricao || '';

    const evAtual = eventoIndex(atual.evento);
    dotsEl.querySelectorAll('.ev-dot').forEach((d, i) => {
      d.style.width = i === evAtual ? '1.75rem' : '0.375rem';
      d.style.background = i === evAtual ? '#fff' : 'rgba(255,255,255,0.45)';
    });
  }

  function observar() {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    io.observe(viewer);
  }
})();
