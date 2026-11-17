// Menú móvil y año del pie. Sin dependencias.
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
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
