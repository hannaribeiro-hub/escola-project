(function () {
  const alvo = '#sobre .md\\:grid-cols-3 > div';
  const itens = document.querySelectorAll(alvo);
  if (!itens.length) return;

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.15 }
  );

  itens.forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
})();
