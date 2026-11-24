(function () {
  const jornada = document.querySelector('.topbar-jornada');
  if (!jornada) return;

  const agora = new Date();
  const minutos = agora.getHours() * 60 + agora.getMinutes();
  const inicio = 7 * 60 + 30;
  const fim = 16 * 60 + 45;
  const diaUtil = agora.getDay() >= 1 && agora.getDay() <= 5;
  const aberto = diaUtil && minutos >= inicio && minutos <= fim;

  const badge = document.createElement('span');
  badge.className = `topbar-status ${aberto ? 'topbar-status--open' : 'topbar-status--closed'}`;
  badge.textContent = aberto ? 'Secretaria aberta' : 'Fora do expediente';
  jornada.insertAdjacentElement('afterend', badge);
})();
