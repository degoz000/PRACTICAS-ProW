// Ejemplo 1: escuchar un clic con addEventListener
let total = 0;

const boton = document.querySelector('#btn-anadir');
const totalTexto = document.querySelector('#total');

function mostrarTotal() {
  totalTexto.textContent = 'S/ ' + total.toFixed(2);
}

// 1) el elemento  2) el tipo de evento  3) el manejador
boton.addEventListener('click', function () {
  total = total + 0.50;
  mostrarTotal();
});

// DOMContentLoaded: el HTML terminó de cargarse
document.addEventListener('DOMContentLoaded', mostrarTotal);
