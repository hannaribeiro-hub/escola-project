(function () {
  const PERIODOS = {
    integral: { titulo: 'Equipe — Ensino Integral', container: 'teamIntegral' },
    noturno: { titulo: 'Equipe — Ensino Noturno', container: 'teamNoturno' }
  };

  const modal = document.getElementById('modalEquipe');
  const modalList = document.getElementById('modalList');
  const modalContador = document.getElementById('modalContador');
  const modalTitulo = document.getElementById('modalTitulo');
  const baseImg = 'conteudo/equipe/fotos/';
  let todosMembros = [];

  const TABS = {
    integral: {
      ativo: 'bg-primary text-white border-primary',
      inativo: 'border-slate-300 text-slate-600 hover:border-primary hover:text-primary'
    },
    noturno: {
      ativo: 'bg-secondary text-white border-secondary',
      inativo: 'border-slate-300 text-slate-600 hover:border-secondary hover:text-secondary'
    }
  };

  window.mudarTurno = function (periodo) {
    ['integral', 'noturno'].forEach((p) => {
      const turno = document.getElementById(`turno-${p}`);
      const tab = document.getElementById(`tab-${p}`);
      if (!turno || !tab) return;
      const ativo = p === periodo;
      turno.classList.toggle('hidden', !ativo);
      tab.className = `px-6 py-2.5 rounded-full font-headline text-label-md font-semibold transition-all border ${ativo ? TABS[p].ativo : TABS[p].inativo}`;
    });
  };

  window.scrollTeam = function (periodo, offset) {
    const container = document.getElementById(PERIODOS[periodo]?.container);
    if (container) container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  window.abrirModal = function (periodo) {
    const cfg = PERIODOS[periodo];
    if (!cfg) return;
    const lista = todosMembros.filter((m) => m.periodo === periodo);
    modalTitulo.textContent = cfg.titulo;
    modalContador.textContent = `${lista.length} membros`;
    modalList.innerHTML = lista.map(cardModal).join('');
    modalList.scrollTop = 0;
    modal.classList.remove('hidden');
  };

  function avatarHtml(m, tamanho) {
    if (m.foto) {
      return `<img src="${baseImg}${m.foto}" alt="${m.nome}" class="${tamanho} rounded-full object-cover border-2 border-${m.cor || 'primary'} mb-3">`;
    }
    return `<div class="${tamanho} rounded-full bg-${m.cor || 'primary'}/10 text-${m.cor || 'primary'} flex items-center justify-center mb-3"><span class="material-symbols-outlined text-[40px]">person</span></div>`;
  }

  function cardConteudo(m) {
    return `
        <h3 class="font-headline font-bold text-headline-sm text-slate-900">${m.nome}</h3>
        <span class="text-body-sm font-semibold text-${m.cor || 'primary'} mb-1">${m.cargo}${m.disciplina ? ' • ' + m.disciplina : ''}</span>
        <span class="text-[12px] text-slate-500 mb-3">${m.formacao || ''}</span>
        <p class="text-body-sm text-slate-600">${m.descricao || ''}</p>`;
  }

  function cardCarousel(m) {
    return `
      <div class="min-w-[280px] max-w-[280px] p-5 rounded-xl border border-slate-200 bg-white flex flex-col items-center text-center flex-shrink-0">
        ${avatarHtml(m, 'w-28 h-28')}
        ${cardConteudo(m)}
      </div>`;
  }

  function cardModal(m) {
    return `
      <div class="p-5 rounded-xl border border-slate-200 bg-white flex flex-col items-center text-center">
        ${avatarHtml(m, 'w-28 h-28')}
        ${cardConteudo(m)}
      </div>`;
  }

  fetch('conteudo/equipe/dados/membros.json', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      todosMembros = data.membros || [];

      for (const periodo of Object.keys(PERIODOS)) {
        const container = document.getElementById(PERIODOS[periodo].container);
        if (!container) continue;
        container.innerHTML = todosMembros
          .filter((m) => m.periodo === periodo && m.visivel)
          .map(cardCarousel)
          .join('');
      }

      modal.querySelectorAll('[data-close-modal]').forEach((el) =>
        el.addEventListener('click', () => modal.classList.add('hidden'))
      );
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.classList.add('hidden');
      });
    })
    .catch((err) => console.error('Erro ao carregar equipe:', err));
})();
