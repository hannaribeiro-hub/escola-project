(function () {
  const itens = document.querySelectorAll('#contato .md\\:grid-cols-2 > div');
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

  itens.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 100}ms`;
    io.observe(el);
  });
})();
