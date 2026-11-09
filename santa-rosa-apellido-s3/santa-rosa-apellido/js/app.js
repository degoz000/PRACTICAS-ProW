// ===== 1. Conexión =====
console.log('app.js conectado');

// ===== 2. Funciones de validación =====
// Cada función recibe el valor del campo y devuelve
// un mensaje de error, o '' (texto vacío) si todo está bien.

function validarNombre(nombre) {
  const limpio = nombre.trim();
  if (limpio === '') return 'Escribe tu nombre.';
  if (limpio.length < 2) return 'Tu nombre debe tener al menos 2 letras.';
  return '';
}

function validarCelular(celular) {
  const limpio = celular.replace(/\s/g, '');
  if (limpio === '') return 'Escribe tu número de celular.';
  if (!/^9\d{8}$/.test(limpio)) {
    return 'El celular debe tener 9 dígitos y empezar con 9. Ejemplo: 987 654 321.';
  }
  return '';
}

function validarProducto(producto) {
  return producto === '' ? 'Elige un producto.' : '';
}

function validarCantidad(valor) {
  const cantidad = Number(valor);
  if (valor === '' || !Number.isInteger(cantidad) || cantidad < 1) {
    return 'La cantidad debe ser un número entero mayor que 0.';
  }
  if (cantidad > 100) return 'Para más de 100 unidades, llámanos por teléfono.';
  return '';
}

// ===== 3. Reto: fecha de hoy y fecha de recojo no pasada =====
// Devuelve la fecha de hoy como texto AAAA-MM-DD (hora local, no UTC).
function fechaHoy() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // getMonth() empieza en 0
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

function validarFecha(fecha) {
  if (fecha === '') return 'Elige la fecha de recojo.';
  // Las fechas AAAA-MM-DD se pueden comparar como texto.
  if (fecha < fechaHoy()) {
    return 'La fecha de recojo no puede ser anterior a hoy. Elige hoy o un día futuro.';
  }
  return '';
}

// ===== 4. Mostrar u ocultar un error =====
function mostrarError(id, mensaje) {
  const campo = document.getElementById(id);
  const error = document.getElementById('error-' + id);
  error.textContent = mensaje;
  if (mensaje) {
    campo.setAttribute('aria-invalid', 'true');
  } else {
    campo.removeAttribute('aria-invalid');
  }
}

// ===== 5. Escuchar el envío del formulario =====
const formulario = document.querySelector('form');
const estado = document.getElementById('estado');

const reglas = [
  ['nombre', validarNombre],
  ['celular', validarCelular],
  ['producto', validarProducto],
  ['cantidad', validarCantidad],
  ['fecha', validarFecha],
];

// ===== 6. Reto: precios y total estimado =====
const precios = {
  'Pan de yema': 0.50,
  'Pan francés': 0.30,
  'Empanada': 3.50,
  'Torta de chocolate': 25.00,
};

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();
  let primerError = null;

  for (const [id, validar] of reglas) {
    const mensaje = validar(document.getElementById(id).value);
    mostrarError(id, mensaje);
    if (mensaje && primerError === null) primerError = id;
  }

  const acepta = document.getElementById('consentimiento').checked;
  const avisoConsentimiento = 'Necesitamos tu autorización para atender el pedido.';
  mostrarError('consentimiento', acepta ? '' : avisoConsentimiento);
  if (!acepta && primerError === null) primerError = 'consentimiento';

  if (primerError !== null) {
    estado.textContent = 'Revisa los campos marcados para continuar.';
    document.getElementById(primerError).focus();
    return;
  }

  const nombre = document.getElementById('nombre').value.trim();
  const producto = document.getElementById('producto').value;
  const cantidad = document.getElementById('cantidad').value;
  const fecha = document.getElementById('fecha').value;
  const total = (precios[producto] * Number(cantidad)).toFixed(2);

  estado.textContent = `Gracias, ${nombre}. Recibimos tu pedido de ` +
    `${cantidad} × ${producto} para el ${fecha}. ` +
    `Total estimado: S/ ${total}. Te confirmaremos por WhatsApp.`;
  formulario.reset();
  actualizarContador();
});

// ===== 7. Reto: contador de caracteres =====
const indicaciones = document.getElementById('indicaciones');
const contador = document.getElementById('contador');

function actualizarContador() {
  const quedan = indicaciones.maxLength - indicaciones.value.length;
  contador.textContent = `Te quedan ${quedan} caracteres`;
}

indicaciones.addEventListener('input', actualizarContador);

// ===== 8. Reto: no permitir elegir fechas pasadas en el calendario =====
document.getElementById('fecha').min = fechaHoy();
