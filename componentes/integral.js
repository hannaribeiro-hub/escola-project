(function () {
  const itens = document.querySelectorAll('#integral article');
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
