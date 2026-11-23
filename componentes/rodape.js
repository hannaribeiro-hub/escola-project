(function () {
  const ano = document.querySelector('.ano-atual');
  if (ano) ano.textContent = new Date().getFullYear();
})();
