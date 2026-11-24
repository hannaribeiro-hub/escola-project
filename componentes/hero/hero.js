(function () {
  const section = document.getElementById('inicio');
  if (!section) return;

  const slidesWrap = document.getElementById('heroSlides');
  const dotsWrap = document.getElementById('heroDots');
  const baseImg = 'imagens/hero/imagens/';

  const seloCores = { primary: 'bg-primary', secondary: 'bg-secondary', accent: 'bg-accent' };
  const botaoEstilos = {
    primary: 'bg-primary hover:bg-primary/90 text-white',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    white: 'bg-white text-slate-900 hover:bg-slate-100'
  };

  function render(slides) {
    slidesWrap.innerHTML = slides.map((s, i) => `
      <div class="hero-item absolute inset-0 transition-opacity duration-700 ${i === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}">
        <img src="${baseImg}${s.imagem}" alt="${s.titulo}" class="w-full h-full object-cover brightness-[0.70]">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-center">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 w-full">
            <div class="max-w-xl text-white space-y-4">
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full ${seloCores[s.seloCor] || 'bg-secondary'} text-white text-label-sm font-bold">${s.selo}</span>
              <h1 class="font-headline font-extrabold text-display-lg-mobile md:text-display-lg leading-tight">${s.titulo}</h1>
              <p class="text-body-md text-white/90 leading-relaxed">${s.texto}</p>
              <div class="pt-2 flex items-center gap-3">
                <a href="${s.href || '#'}" class="px-6 py-3 rounded-full ${botaoEstilos[s.botaoEstilo] || botaoEstilos.primary} font-headline text-label-md font-semibold transition-all">${s.botaoTexto}</a>
              </div>
            </div>
          </div>
        </div>
      </div>`).join('');

    dotsWrap.innerHTML = slides.map((_, i) =>
      `<button onclick="setSlide(${i})" class="transition-all ${i === 0 ? 'w-8 h-2 rounded-full bg-secondary' : 'w-2.5 h-2 rounded-full bg-white/40'}" aria-label="Slide ${i + 1}"></button>`
    ).join('');
  }

  fetch('imagens/hero/dados/slides.json')
    .then((r) => r.json())
    .then((data) => {
      const slides = data.slides || [];
      if (!slides.length) return;
      render(slides);
      init(slides.length);
    })
    .catch((err) => console.error('Erro ao carregar slides do hero:', err));

  let slides = [];
  let cur = 0;
  let timer = null;

  function init(count) {
    slides = Array.from(slidesWrap.querySelectorAll('.hero-item'));
    if (!slides.length) return;

    window.setSlide = (i) => go(i);
    window.nextSlide = () => go(cur + 1);
    window.prevSlide = () => go(cur - 1);

    section.addEventListener('mouseenter', () => clearInterval(timer));
    section.addEventListener('mouseleave', reiniciar);

    update();
    reiniciar();
  }

  function update() {
    slides.forEach((s, i) => {
      const ativo = i === cur;
      s.classList.toggle('opacity-100', ativo);
      s.classList.toggle('z-10', ativo);
      s.classList.toggle('opacity-0', !ativo);
      s.classList.toggle('z-0', !ativo);
      s.classList.toggle('pointer-events-none', !ativo);
    });
    Array.from(dotsWrap.children).forEach((d, i) => {
      d.className = i === cur
        ? 'w-8 h-2 rounded-full bg-secondary transition-all'
        : 'w-2.5 h-2 rounded-full bg-white/40 transition-all';
    });
  }

  function go(i) {
    cur = (i + slides.length) % slides.length;
    update();
    reiniciar();
  }

  function reiniciar() {
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 5000);
  }
})();
