// Ejemplo 5: captura, objetivo y burbuja
const catalogo = document.querySelector('#catalogo');
const producto = document.querySelector('#producto');
const boton = document.querySelector('#boton');
const detener = document.querySelector('#detener');
const registro = document.querySelector('#registro');

function anotar(texto) {
  const li = document.createElement('li');
  li.textContent = texto;
  registro.append(li);
}

// Fase de captura: el evento BAJA desde el contenedor
catalogo.addEventListener('click', () => {
  registro.replaceChildren();          // empieza un clic nuevo
  anotar('Captura · section#catalogo (baja)');
}, { capture: true });

// Fase de objetivo: el elemento donde ocurrió el clic
boton.addEventListener('click', (evento) => {
  anotar('Objetivo · ' + evento.target.id);
});

// Fase de burbuja: el evento SUBE por cada padre
producto.addEventListener('click', (evento) => {
  anotar('Burbuja · article#producto (sube)');
  if (detener.checked) {
    evento.stopPropagation();
    anotar('stopPropagation: el evento ya no sube más');
  }
});

catalogo.addEventListener('click', () => {
  anotar('Burbuja · section#catalogo (sube)');
});
