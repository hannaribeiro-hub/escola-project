(function () {
  window.scrollTeam = function (offset) {
    const container = document.getElementById('teamContainer');
    if (container) container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const container = document.getElementById('teamContainer');
  if (!container) return;

  const baseImg = 'imagens/equipe/imagens/';

  fetch('imagens/equipe/dados/membros.json')
    .then((r) => r.json())
    .then((data) => {
      container.innerHTML = (data.membros || []).map((m) => `
        <div class="min-w-[280px] max-w-[280px] p-5 rounded-xl border border-slate-200 bg-white flex flex-col items-center text-center flex-shrink-0">
          <img src="${baseImg}${m.foto}" alt="${m.nome}" class="w-20 h-20 rounded-full object-cover border-2 border-${m.cor || 'primary'} mb-3">
          <h3 class="font-headline font-bold text-headline-sm text-slate-900">${m.nome}</h3>
          <span class="text-body-sm font-semibold text-${m.cor || 'primary'} mb-1">${m.cargo}</span>
          <span class="text-[12px] text-slate-500 mb-3">${m.formacao}</span>
          <p class="text-body-sm text-slate-600">${m.descricao}</p>
        </div>`).join('');
    })
    .catch((err) => console.error('Erro ao carregar equipe:', err));
})();
