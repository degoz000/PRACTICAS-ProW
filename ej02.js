// Ejemplo 2: el evento input y el objeto evento
const notas = document.querySelector('#notas');
const contador = document.querySelector('#contador');

notas.addEventListener('input', (evento) => {
  // evento.target es el elemento donde ocurrió el evento
  const largo = evento.target.value.length;
  contador.textContent = `${largo} / 200`;

  // Abre la consola (F12) para ver los datos del evento
  console.log(evento.type, evento.target.id, largo);
});
