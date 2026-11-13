// Ejemplo 8: { once: true }, textContent y esperar al usuario
const PRODUCTOS = ['Pan francés', 'Pan de yema', 'Chancay',
  'Torta de chocolate', 'Empanada de pollo', 'Alfajor'];

const buscador = document.querySelector('#buscador');
const resultados = document.querySelector('#resultados');
const estado = document.querySelector('#estado');
let espera = null;

function mostrar(lista) {
  resultados.replaceChildren();
  for (const nombre of lista) {
    const li = document.createElement('li');
    li.textContent = nombre;          // textContent, nunca innerHTML
    resultados.append(li);
  }
  estado.textContent = `${lista.length} producto(s) encontrado(s).`;
}

// Esperar 300 ms sin teclas antes de buscar (no en cada tecla)
buscador.addEventListener('input', () => {
  clearTimeout(espera);
  espera = setTimeout(() => {
    const texto = buscador.value.trim().toLowerCase();
    mostrar(PRODUCTOS.filter((n) => n.toLowerCase().includes(texto)));
  }, 300);
});

// { once: true }: el oyente se elimina solo después del primer clic
document.querySelector('#entendido').addEventListener('click', () => {
  document.querySelector('#bienvenida').hidden = true;
  console.log('Este oyente ya no se ejecutará otra vez.');
}, { once: true });

mostrar(PRODUCTOS);
