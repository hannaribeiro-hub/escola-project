(function () {
  window.scrollTeam = function (offset) {
    const container = document.getElementById('teamContainer');
    if (container) container.scrollBy({ left: offset, behavior: 'smooth' });
  };
})();
