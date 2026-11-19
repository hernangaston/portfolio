// Alterna entre modo oscuro (por defecto) y claro, y recuerda la elección.
(function () {
  var boton = document.querySelector('.tema');
  if (!boton) return;
  function aplicar(tema) {
    if (tema === 'claro') document.documentElement.setAttribute('data-tema', 'claro');
    else document.documentElement.removeAttribute('data-tema');
    boton.setAttribute('aria-label', tema === 'claro' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
  }
  aplicar(document.documentElement.getAttribute('data-tema') === 'claro' ? 'claro' : 'oscuro');
  boton.addEventListener('click', function () {
    var nuevo = document.documentElement.getAttribute('data-tema') === 'claro' ? 'oscuro' : 'claro';
    aplicar(nuevo);
    try { localStorage.setItem('tema', nuevo); } catch (e) {}
  });
})();
