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
const DateTime = luxon.DateTime
const botonIda = document.getElementById("botonIda");
botonIda.addEventListener("click", () => {inputRegreso.disabled = true});

const botonIdaVuelta = document.getElementById("botonIdaVuelta");
botonIdaVuelta.addEventListener("click", () => {inputRegreso.disabled = false});

// Obtener la fecha actual
const fechaHoy = DateTime.now().startOf('day');
const partida = document.getElementById("inputPartida");
const regreso = document.getElementById("inputRegreso");

partida.addEventListener("change", () => fechaHoy.min = partida.value)

regreso.addEventListener("change", () => partida.min = regreso.value)
const fechaPartida = DateTime.fromISO(partida.value).startOf('day');
//-------------------
//const { DateTime } = luxon;

const fechaViajeInput = document.getElementById("fechaViaje");
const fechaActual = DateTime.now().toISODate(); // Obtiene la fecha actual en formato ISO
partida.setAttribute("min", fechaActual);
//llegada.addEventListener("change", ()=> salida.min = llegada.value)

// const { DateTime } = luxon;

// const fechaViajeInput = document.getElementById("fechaViaje");
// const fechaActual = DateTime.now().toISODate();
// fechaViajeInput.setAttribute("min", fechaActual);
