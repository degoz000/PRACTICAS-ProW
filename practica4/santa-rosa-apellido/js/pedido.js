// ===== 1. Conexión =====
console.log('pedido.js conectado');

// ===== 3. Estado del pedido y utilidades =====
const pedido = []; // cada ítem: { nombre, precio, cantidad }

const lista = document.getElementById('lista-pedido');
const totalTexto = document.getElementById('total');
const mensajeVacio = document.getElementById('pedido-vacio');
const aviso = document.getElementById('aviso');
const tituloPedido = document.getElementById('titulo-pedido');
const sugerencia = document.getElementById('sugerencia');
const btnVaciar = document.getElementById('btn-vaciar');

const MANTEQUILLA = { nombre: 'Mantequilla', precio: 2.50 };

function soles(monto) {
  return 'S/ ' + monto.toFixed(2);
}

function calcularTotal() {
  return pedido.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

// Cambia el texto de la región role="status": el lector de pantalla lo lee solo.
function anunciar(mensaje) {
  aviso.textContent = mensaje;
}

// Crea un botón accesible (con aria-label que incluye el nombre del producto).
function crearBoton(clase, texto, etiqueta, nombre) {
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = clase;
  boton.dataset.nombre = nombre;
  boton.textContent = texto;
  boton.setAttribute('aria-label', etiqueta);
  return boton;
}

// ===== 4. Dibujar la lista con el DOM =====
// La pantalla siempre se dibuja a partir del arreglo "pedido".
function render() {
  lista.replaceChildren(); // borra los <li> anteriores

  for (const item of pedido) {
    const li = document.createElement('li');

    const texto = document.createElement('span');
    const subtotal = soles(item.precio * item.cantidad);
    texto.textContent = `${item.cantidad} × ${item.nombre} · ${subtotal}`;

    const acciones = document.createElement('span');
    acciones.className = 'acciones';
    acciones.append(
      crearBoton('btn-restar', '−', `Restar un ${item.nombre}`, item.nombre),
      crearBoton('btn-sumar', '+', `Sumar un ${item.nombre}`, item.nombre),
      crearBoton('btn-quitar', 'Quitar', `Quitar ${item.nombre}`, item.nombre)
    );

    li.append(texto, acciones);
    lista.append(li);
  }

  totalTexto.textContent = soles(calcularTotal());
  mensajeVacio.hidden = pedido.length > 0;
  btnVaciar.hidden = pedido.length === 0;

  // Reto 3: sugerencia honesta, solo si hay pan y aún no hay mantequilla.
  const hayPan = pedido.some((item) => item.nombre.startsWith('Pan'));
  const hayMantequilla = pedido.some((item) => item.nombre === MANTEQUILLA.nombre);
  sugerencia.hidden = !(hayPan && !hayMantequilla);
}

// ===== 5. Añadir y quitar =====
function agregar(nombre, precio) {
  const existente = pedido.find((item) => item.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    pedido.push({ nombre, precio, cantidad: 1 });
  }
  render();
  anunciar(`Se añadió ${nombre}. Total: ${soles(calcularTotal())}.`);
}

function quitar(nombre) {
  const posicion = pedido.findIndex((item) => item.nombre === nombre);
  if (posicion === -1) return;
  pedido.splice(posicion, 1);
  render();
  anunciar(`Se quitó ${nombre}. Total: ${soles(calcularTotal())}.`);
  tituloPedido.focus(); // el foco no se pierde
}

// ===== 6. Reto: cantidades + y − =====
function cambiarCantidad(nombre, cambio, claseBoton) {
  const item = pedido.find((i) => i.nombre === nombre);
  if (!item) return;
  item.cantidad += cambio;

  if (item.cantidad <= 0) { // si llega a 0, se quita el producto
    quitar(nombre);
    return;
  }

  render();
  anunciar(`${item.nombre}: ${item.cantidad}. Total: ${soles(calcularTotal())}.`);
  // render() recrea los botones: devolvemos el foco al que se pulsó.
  lista.querySelector(`.${claseBoton}[data-nombre="${nombre}"]`).focus();
}

// ===== 7. Reto: vaciar con confirmación =====
function vaciar() {
  if (pedido.length === 0) return;
  const seguro = confirm('¿Seguro que quieres vaciar todo tu pedido?');
  if (!seguro) {
    anunciar('No se vació el pedido.');
    return;
  }
  pedido.length = 0;
  render();
  anunciar('Se vació el pedido. Total: S/ 0.00.');
  tituloPedido.focus();
}

// ===== 8. Eventos (delegación) =====
// Un solo oyente para todos los botones "Añadir"
document.querySelector('.catalogo').addEventListener('click', (evento) => {
  const boton = evento.target.closest('.btn-anadir');
  if (!boton) return;
  const producto = boton.closest('.producto');
  agregar(producto.dataset.nombre, Number(producto.dataset.precio));
});

// Un solo oyente para los botones de cada línea: Quitar, + y −
lista.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button');
  if (!boton) return;
  const nombre = boton.dataset.nombre;

  if (boton.classList.contains('btn-quitar')) quitar(nombre);
  else if (boton.classList.contains('btn-sumar')) cambiarCantidad(nombre, 1, 'btn-sumar');
  else if (boton.classList.contains('btn-restar')) cambiarCantidad(nombre, -1, 'btn-restar');
});

btnVaciar.addEventListener('click', vaciar);

// Sugerencia honesta: solo se añade si el cliente pulsa el botón.
document.getElementById('btn-sugerencia').addEventListener('click', () => {
  agregar(MANTEQUILLA.nombre, MANTEQUILLA.precio);
  tituloPedido.focus(); // el botón de la sugerencia se oculta; el foco no se pierde
});

render();
