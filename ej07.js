// Ejemplo 7: button vs. div, y cerrar con Escape
const aviso = document.querySelector('#aviso');
const cerrar = document.querySelector('#cerrar');
let origen = null;   // el elemento que abrió el aviso

function mostrarAviso(elemento) {
  origen = elemento;
  aviso.hidden = false;
  cerrar.focus();            // el foco va al aviso
}

function cerrarAviso() {
  if (aviso.hidden) return;
  aviso.hidden = true;
  if (origen) origen.focus(); // el foco vuelve a donde estaba
}

// El div solo responde al mouse: no recibe foco ni Enter
document.querySelector('#falso').addEventListener('click', (evento) => {
  mostrarAviso(evento.currentTarget);
});

// El button responde al mouse, a Enter y a la barra espaciadora
document.querySelector('#real').addEventListener('click', (evento) => {
  mostrarAviso(evento.currentTarget);
});

cerrar.addEventListener('click', cerrarAviso);

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') cerrarAviso();
});
