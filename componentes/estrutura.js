(function () {
  const itens = document.querySelectorAll('#estrutura .sm\\:grid-cols-2 > div');
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
