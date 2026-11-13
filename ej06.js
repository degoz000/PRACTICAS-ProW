// Ejemplo 6: delegación de eventos en una lista que cambia
const pedido = [];   // cada ítem: { nombre, precio, cantidad }

const lista = document.querySelector('#lista-pedido');
const totalTexto = document.querySelector('#total');
const aviso = document.querySelector('#aviso');

function soles(monto) {
  return 'S/ ' + monto.toFixed(2);
}

function calcularTotal() {
  return pedido.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

function render() {
  lista.replaceChildren();
  for (const item of pedido) {
    const li = document.createElement('li');
    const texto = document.createElement('span');
    texto.textContent = `${item.cantidad} × ${item.nombre} `;

    const quitar = document.createElement('button');
    quitar.type = 'button';
    quitar.className = 'btn-quitar';
    quitar.dataset.nombre = item.nombre;
    quitar.textContent = 'Quitar';
    quitar.setAttribute('aria-label', `Quitar ${item.nombre}`);

    li.append(texto, quitar);
    lista.append(li);
  }
  totalTexto.textContent = soles(calcularTotal());
}

// UN solo oyente para todos los botones "Añadir"
document.querySelector('.catalogo').addEventListener('click', (evento) => {
  const boton = evento.target.closest('.btn-anadir');
  if (!boton) return;                 // el clic no fue en un botón
  const producto = boton.closest('.producto');
  const nombre = producto.dataset.nombre;

  const existente = pedido.find((item) => item.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    pedido.push({ nombre, precio: Number(producto.dataset.precio), cantidad: 1 });
  }
  render();
  aviso.textContent = `Se añadió ${nombre}. Total: ${soles(calcularTotal())}.`;
});

// UN solo oyente para los botones "Quitar", aunque se creen después
lista.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.btn-quitar');
  if (!boton) return;
  const nombre = boton.dataset.nombre;
  const posicion = pedido.findIndex((item) => item.nombre === nombre);
  pedido.splice(posicion, 1);
  render();
  aviso.textContent = `Se quitó ${nombre}. Total: ${soles(calcularTotal())}.`;
  document.querySelector('#titulo-pedido').focus();   // el foco no se pierde
});
