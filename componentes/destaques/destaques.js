(function () {
  const evState = {};

  window.nextEv = function (id, total) {
    if (!evState[id]) evState[id] = 0;
    evState[id] = (evState[id] + 1) % total;
    const track = document.getElementById(id);
    if (track) track.style.transform = `translateX(-${evState[id] * 100}%)`;
  };

  const itens = document.querySelectorAll('#destaques .grid > div');
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
