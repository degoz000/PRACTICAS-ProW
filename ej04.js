// Ejemplo 4: submit y preventDefault
const formulario = document.querySelector('#pedido');
const error = document.querySelector('#error-celular');

formulario.addEventListener('submit', (evento) => {
  const campo = formulario.celular;
  const celular = campo.value.replace(/\s/g, '');

  if (!/^9\d{8}$/.test(celular)) {
    evento.preventDefault();          // hay error: no se envía
    error.textContent = 'El celular debe tener 9 dígitos y empezar con 9.';
    campo.setAttribute('aria-invalid', 'true');
    campo.focus();                    // el foco va al campo con el error
    return;
  }

  error.textContent = '';
  campo.removeAttribute('aria-invalid');
  // sin errores: no llamamos a preventDefault y el navegador envía
});
