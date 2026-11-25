(function () {
  window.scrollTeam = function (offset) {
    const container = document.getElementById('teamContainer');
    if (container) container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const container = document.getElementById('teamContainer');
  const modal = document.getElementById('modalEquipe');
  const modalList = document.getElementById('modalList');
  const modalContador = document.getElementById('modalContador');
  if (!container) return;

  const baseImg = 'conteudo/equipe/fotos/';

  function avatarHtml(m, tamanho) {
    if (m.foto) {
      return `<img src="${baseImg}${m.foto}" alt="${m.nome}" class="${tamanho} rounded-full object-cover border-2 border-${m.cor || 'primary'} mb-3">`;
    }
    return `<div class="${tamanho} rounded-full bg-${m.cor || 'primary'}/10 text-${m.cor || 'primary'} flex items-center justify-center mb-3"><span class="material-symbols-outlined text-[40px]">person</span></div>`;
  }

  function cardCarousel(m) {
    return `
      <div class="min-w-[280px] max-w-[280px] p-5 rounded-xl border border-slate-200 bg-white flex flex-col items-center text-center flex-shrink-0">
        ${avatarHtml(m, 'w-28 h-28')}
        <h3 class="font-headline font-bold text-headline-sm text-slate-900">${m.nome}</h3>
        <span class="text-body-sm font-semibold text-${m.cor || 'primary'} mb-1">${m.cargo}${m.disciplina ? ' • ' + m.disciplina : ''}</span>
        <span class="text-[12px] text-slate-500 mb-3">${m.formacao || ''}</span>
        <p class="text-body-sm text-slate-600">${m.descricao || ''}</p>
      </div>`;
  }

  function cardModal(m) {
    return `
      <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
        ${m.foto
          ? `<img src="${baseImg}${m.foto}" alt="${m.nome}" class="w-14 h-14 rounded-full object-cover border-2 border-${m.cor || 'primary'} flex-shrink-0">`
          : `<div class="w-14 h-14 rounded-full bg-${m.cor || 'primary'}/10 text-${m.cor || 'primary'} flex items-center justify-center flex-shrink-0"><span class="material-symbols-outlined text-[26px]">person</span></div>`}
        <div class="min-w-0">
          <h4 class="font-headline font-bold text-slate-900 text-label-lg leading-tight">${m.nome}</h4>
          <span class="text-${m.cor || 'primary'} text-[13px] font-semibold block">${m.cargo}${m.disciplina ? ' • ' + m.disciplina : ''}</span>
          <span class="text-[12px] text-slate-500 block mb-1">${m.formacao || ''}</span>
          <p class="text-body-sm text-slate-600">${m.descricao || ''}</p>
        </div>
      </div>`;
  }

  fetch('conteudo/equipe/dados/membros.json', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      const membros = data.membros || [];

      container.innerHTML = membros
        .filter((m) => m.visivel)
        .map(cardCarousel)
        .join('');

      modalList.innerHTML = membros.map(cardModal).join('');
      modalContador.textContent = `${membros.length} membros`;

      const btn = document.getElementById('btnVerTodos');
      if (btn) btn.addEventListener('click', () => modal.classList.remove('hidden'));
      modal.querySelectorAll('[data-close-modal]').forEach((el) =>
        el.addEventListener('click', () => modal.classList.add('hidden'))
      );
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.classList.add('hidden');
      });
    })
    .catch((err) => console.error('Erro ao carregar equipe:', err));
})();
