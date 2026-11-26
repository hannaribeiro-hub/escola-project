(function () {
  const baseImg = 'conteudo/cursos/fotos/';

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

  const DESCRICOES = {
    integral: 'Integrados ao Ensino Médio em tempo integral (7:30 às 17:30). O aluno conclui as 3ª séries com registro profissional ao finalizar os anos letivos.',
    noturno: 'Cursos do Eja integrados ao Ensino Médio no período noturno. O aluno conclui as 3ª séries em 1 ano e meio com registro profissional ao finalizar o ano letivo.'
  };

  window.mudarTurnoCursos = function (periodo) {
    const desc = document.getElementById('cursosDesc');
    if (desc) desc.textContent = DESCRICOES[periodo] || DESCRICOES.integral;
    ['integral', 'noturno'].forEach((p) => {
      const turno = document.getElementById(`turno-cursos-${p}`);
      const tab = document.getElementById(`tab-cursos-${p}`);
      if (!turno || !tab) return;
      const ativo = p === periodo;
      turno.classList.toggle('hidden', !ativo);
      tab.className = `px-6 py-2.5 rounded-full font-headline text-label-md font-semibold transition-all border ${ativo ? TABS[p].ativo : TABS[p].inativo}`;
    });
  };

  function cardCurso(c) {
    return `
        <div class="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div class="h-48 w-full overflow-hidden relative">
              <img src="${baseImg}${c.imagem}" alt="${c.titulo}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <span class="absolute top-3 left-3 bg-${c.tagCor || 'primary'} text-white text-[12px] font-headline font-semibold px-2.5 py-1 rounded">${c.tag}</span>
              ${c.periodo === 'noturno' ? '<span class="absolute top-3 right-3 bg-slate-900/80 text-white text-[11px] font-headline font-bold px-2.5 py-1 rounded">EJA</span>' : ''}
            </div>
            <div class="p-6 space-y-4">
              <h3 class="font-headline font-bold text-headline-sm text-primary">${c.titulo}</h3>
              <div class="space-y-2 text-body-sm text-slate-600">
                <p><strong class="text-slate-900">O que oferece:</strong> ${c.oferece}</p>
                <p><strong class="text-slate-900">Indicado para:</strong> ${c.indicado}</p>
              </div>
            </div>
          </div>
          <div class="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-body-sm">
            <span class="text-secondary font-semibold">Carga: ${c.carga}</span>
          </div>
        </div>`;
  }

  fetch('conteudo/cursos/dados/cursos.json', { cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      const cursos = data.cursos || [];
      const gridIntegral = document.getElementById('cursosGrid');
      const gridEja = document.getElementById('cursosEjaGrid');

      if (gridIntegral) {
        gridIntegral.innerHTML = cursos.filter((c) => c.periodo !== 'noturno').map(cardCurso).join('');
      }
      if (gridEja) {
        gridEja.innerHTML = cursos.filter((c) => c.periodo === 'noturno').map(cardCurso).join('');
      }

      observar(gridIntegral);
      observar(gridEja);
    })
    .catch((err) => console.error('Erro ao carregar cursos:', err));

  function observar(grid) {
    if (!grid) return;
    const itens = grid.querySelectorAll(':scope > div');
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
      el.style.transitionDelay = `${i * 80}ms`;
      io.observe(el);
    });
  }
})();
