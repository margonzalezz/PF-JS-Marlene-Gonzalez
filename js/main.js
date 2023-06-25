// --------------- ARRAYS ---------------
const lugares = [
  { numero: 1, lugar: "Buenos Aires, Argentina" },
  { numero: 2, lugar: "New York, Estados Unidos" },
  { numero: 3, lugar: "Venecia, Italia" },
  { numero: 4, lugar: "Ibiza, España" },
  { numero: 5, lugar: "Paris, Francia" },
  { numero: 6, lugar: "Mykonos, Grecia" },
  { numero: 7, lugar: "Bariloche, Argentina" },
  { numero: 8, lugar: "Cataratas de Iguazú, Argentina" }
];

const aerolineas = [
  { aerolinea: "Aerolíneas Argentinas", precio: 250000, habilitado: [1, 2, 3, 4, 7, 8] },
  { aerolinea: "Iberia Airlines", precio: 280000, habilitado: [1, 2, 3, 4, 5, 6, 7, 8] },
  { aerolinea: "American Airlines", precio: 305000, habilitado: [1, 2, 3, 5, 6, 7, 8] }
];

// --------------- EVENTOS ---------------
const botonIda = document.getElementById("botonIda");
botonIda.addEventListener("click", () => {inputRegreso.disabled = true});

const botonIdaVuelta = document.getElementById("botonIdaVuelta");
botonIdaVuelta.addEventListener("click", () => {inputRegreso.disabled = false});

const reservas = [];
const form = document.getElementById("containerViaje");
let idPasajes = 1;
const mensajeError = document.getElementById("errorOption");
const fechaHoy = new Date();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const seleccionOrigen = document.getElementById("seleccionOrigen").value;
  const seleccionDestino = document.getElementById("seleccionDestino").value;
  const inputPasajeros = document.getElementById("inputPasajeros").value;
  const inputPartida = document.getElementById("inputPartida").value;
  const inputRegreso = document.getElementById("inputRegreso").value;
  const fechaPartida = new Date(inputPartida);
  const fechaRegreso = new Date(inputRegreso);

  const errorCampos = () => {
    const isEmpty = (value) => value === "";
    const fechaValida = (date) => new Date(date).getTime() >= fechaHoy.getTime();

    if ([botonIda.value, botonIdaVuelta.value, seleccionOrigen, seleccionDestino, inputPasajeros, inputPartida].some(isEmpty)) {
      mensajeError.innerHTML = "Por favor, complete todos los campos";
      mensajeError.className = "text-danger mt-2";
      return false;
    } else if (!fechaValida(inputPartida) || fechaRegreso < fechaPartida) {
      mensajeError.innerHTML = "Por favor, ingrese fechas válidas";
      mensajeError.className = "text-danger mt-2";
      return false;
    }
    return true;
  };
  const seguirSeleccion = errorCampos();
  if (seguirSeleccion) {
    const aerolineasEncontradas = aerolineas.filter(aerolinea => aerolinea.habilitado.includes(Number(seleccionDestino)));
    aerolineasEncontradas.forEach(aerolinea => {
      const tiempoViaje = Math.ceil((fechaRegreso - fechaPartida) / (1000 * 60 * 60 * 24));
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
        diasViaje: tiempoViaje
      };
      reservas.push(reserva);
    });
    localStorage.setItem("misReservas", JSON.stringify(reservas));
    location.href = "pages/pasajes.html";
  }
});