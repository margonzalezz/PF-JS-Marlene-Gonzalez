// --------------- ARRAYS ---------------
const URLugares = "db-json/dbDestinos.JSON"
const lugares = [];

const URLAerolineas = "db-json/dbAerolineas.JSON"
const aerolineas = [];

// --------------- EVENTOS ---------------
const DateTime = luxon.DateTime;

  const botonIda = document.getElementById("botonIda");
  const botonIdaVuelta = document.getElementById("botonIdaVuelta");
  let isBotonSelected = false;

  botonIda.addEventListener("click", () => {
    botonIda.classList.add("seleccionado");
    botonIdaVuelta.classList.remove("seleccionado");
    isBotonSelected = true;
    inputRegreso.disabled = true;
  });

  botonIdaVuelta.addEventListener("click", () => {
    botonIdaVuelta.classList.add("seleccionado");
    botonIda.classList.remove("seleccionado");
    isBotonSelected = true;
    inputRegreso.disabled = false;
  });

  function configuracionDeFechas() {
      const inputFechaPartida = document.getElementById("inputPartida"); 
      const inputFechaRegreso = document.getElementById("inputRegreso");
      const hoy = new Date();
      const fechaActual = hoy.toISOString().split("T")[0];
      inputFechaPartida.addEventListener("change", () => {inputFechaRegreso.min = inputFechaPartida.value});
      inputFechaPartida.min = fechaActual;
      inputFechaRegreso.min = inputFechaPartida;
  }
  configuracionDeFechas();
  
  const reservas = [];
  const form = document.getElementById("containerViaje");
  let idPasajes = 1;
  const mensajeError = document.getElementById("errorOption");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const seleccionOrigen = document.getElementById("seleccionOrigen").value;
    const seleccionDestino = document.getElementById("seleccionDestino").value;
    const inputPasajeros = document.getElementById("inputPasajeros").value;
    const inputPartida = document.getElementById("inputPartida").value;
    const inputRegreso = document.getElementById("inputRegreso").value;
    const fechaPartida = new Date(inputPartida);
    const fechaRegreso = new Date(inputRegreso);
    inputPartida.readOnly = true;
    inputRegreso.readOnly = true;

      if (!isBotonSelected || seleccionOrigen == "" || seleccionDestino == "" || inputPasajeros == "" || inputPartida == "") {
          Swal.fire({
            icon: 'error',
            text: 'Por favor, complete todos los campos'
          })
      } else {
        const aerolineasEncontradas = aerolineas.filter(aerolinea => aerolinea.habilitado.includes(Number(seleccionDestino)));
        aerolineasEncontradas.forEach(aerolinea => {
          const fechaInicial = DateTime.fromJSDate(fechaPartida);
          const fechaFinal = DateTime.fromJSDate(fechaRegreso);
          const duracionViaje = fechaFinal.diff(fechaInicial, 'days').days;
          const lugarOrigen = lugares.find(lugar => lugar.numero === Number(seleccionOrigen));
          const lugarDestino = lugares.find(lugar => lugar.numero === Number(seleccionDestino));
          const precio = botonIdaVuelta.checked ? aerolinea.precio * 2 : aerolinea.precio;
          const precioFinal = [1, 7, 8].includes(Number(seleccionOrigen)) ? precio * 1.4 : precio;
          const precioFinalPasajeros = inputPasajeros > 1 ? precioFinal * inputPasajeros : precioFinal;

          const reserva = {
            pasaje: botonIda.checked ? botonIda.value : botonIdaVuelta.value,
            id: idPasajes++,
            origen: lugarOrigen.lugar,
            destino: lugarDestino.lugar,
            pasajeros: inputPasajeros,
            partida: inputPartida,
            regreso: inputRegreso,
            aerolinea: aerolinea.aerolinea,
            precio: precioFinalPasajeros,
            diasViaje: duracionViaje
          };
          reservas.push(reserva);
        });
        localStorage.setItem("misReservas", JSON.stringify(reservas));
        location.href = "pages/pasajes.html";

      }
    }
);

function obtenerLugares() {
  fetch(URLugares)
  .then((respuesta)=> respuesta.json())
  .then((data)=> lugares.push(...data))
}
obtenerLugares()

function obtenerAerolineas() {
  fetch(URLAerolineas)
  .then((response)=> response.json())
  .then((datos)=> aerolineas.push(...datos))
}
obtenerAerolineas();