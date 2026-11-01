// Menú móvil, año del pie y visor de la galería. Sin dependencias.
(function () {
  var boton = document.getElementById('menu-boton');
  var nav = document.getElementById('menu');
  if (boton && nav) {
    boton.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('abierto');
        boton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Visor: sin JavaScript cada foto abre su archivo; con JavaScript se amplía en un cuadro de diálogo.
  var visor = document.getElementById('visor');
  if (!visor || typeof visor.showModal !== 'function') return;
  var fotos = [].slice.call(document.querySelectorAll('.galeria__item'));
  var contenedor = document.getElementById('visor-imagen');
  var pie = document.getElementById('visor-pie');
  var actual = 0;

  function mostrar(i) {
    actual = (i + fotos.length) % fotos.length;
    var miniatura = fotos[actual].querySelector('img');
    var grande = document.createElement('img');
    grande.src = fotos[actual].getAttribute('href');
    grande.alt = miniatura.alt;
    grande.width = miniatura.getAttribute('width');
    grande.height = miniatura.getAttribute('height');
    contenedor.textContent = '';
    contenedor.appendChild(grande);
    pie.textContent = miniatura.alt + ' (' + (actual + 1) + ' de ' + fotos.length + ')';
  }

  fotos.forEach(function (foto, i) {
    foto.addEventListener('click', function (e) {
      e.preventDefault();
      mostrar(i);
      visor.showModal();
    });
  });
  document.getElementById('visor-cerrar').addEventListener('click', function () { visor.close(); });
  document.getElementById('visor-anterior').addEventListener('click', function () { mostrar(actual - 1); });
  document.getElementById('visor-siguiente').addEventListener('click', function () { mostrar(actual + 1); });
  visor.addEventListener('click', function (e) { if (e.target === visor) visor.close(); });
  visor.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
    if (e.key === 'ArrowRight') mostrar(actual + 1);
  });
})();

(function () {
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
