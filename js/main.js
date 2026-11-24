const COMPONENTS = [
  'topbar',
  'header',
  'hero',
  'sobre',
  'integral',
  'itinerarios',
  'estrutura',
  'matriculas',
  'contato',
  'rodape'
];

document.documentElement.classList.add('js');

function loadComponent(name) {
  return fetch(`componentes/${name}/${name}.html`)
    .then((res) => {
      if (!res.ok) throw new Error(`${name}.html: HTTP ${res.status}`);
      return res.text();
    })
    .then((html) => {
      const mount = document.querySelector(`[data-component="${name}"]`);
      if (mount) mount.innerHTML = html;
    });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`${src} falhou`));
    document.body.appendChild(script);
  });
}

Promise.all(COMPONENTS.map(loadComponent))
  .then(() => Promise.allSettled(COMPONENTS.map((n) => loadScript(`componentes/${n}/${n}.js`))))
  .catch((err) => console.error('Erro ao carregar componentes:', err));
