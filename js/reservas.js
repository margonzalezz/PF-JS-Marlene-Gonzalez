const reservas = JSON.parse(localStorage.getItem("misReservas"));
let miReserva;
const misPasajes = [];

const createFlightCard = (reserva) => {
  const { aerolinea, origen, partida, destino, pasaje, regreso, diasViaje, precio, id } = reserva;
  const nombreAerolinea = aerolinea.toLowerCase().replace(/\s/g, "-");
  const rutaImagen = `../img/icon/${nombreAerolinea}.png`;

  const gridPasajes = document.createElement("div");
  gridPasajes.id = "grid-pasajes";

  gridPasajes.innerHTML = `
    <div id="logoAerolinea" class="logo">
      <img src="${rutaImagen}" alt="${aerolinea}">
      <span class="nombreLogoAerolinea">${aerolinea}</span>
    </div>
    <div id="seccion-ida" class="ida">
      <p class="titulo-ida">ORIGEN:<br>${origen}</p>
      <p class="fecha-ida">${partida}</p>
    </div>
    <div id="seccion-idaYvuelta" class="vuelta">
      <p class="titulo-vuelta">DESTINO:<br>${destino}</p>
      ${pasaje === "solo_ida" ? '' : `<p class="fecha-vuelta">${regreso}</p>`}
    </div>
    ${pasaje === "solo_ida" ? '' : `<div id="container-dias" class="dias"><p>${diasViaje} días</p></div>`}
    <div id="container-precio" class="precio">
      <div class="precio-pasaje">
        <span class="titulo">PRECIO</span>
        <p>$${precio}</p>
      </div>
    </div>
    <div class="seleccionar-pasaje" id="${id}">
      <button type="button" class="btn" id="liveAlertBtn">Seleccionar</button>
    </div>
  `;

  gridPasajes.querySelector('.seleccionar-pasaje button').addEventListener('click', () => {
    miReserva = reserva;
    misPasajes.push(miReserva);
    localStorage.setItem("miReserva", JSON.stringify(miReserva));
    location.href = "../pages/checkout.html";
  });

  return gridPasajes;
};

const contenedorVuelos = document.getElementById("containerPasajes");
reservas.forEach(reserva => {
  const cardsPasajes = createFlightCard(reserva);
  contenedorVuelos.appendChild(cardsPasajes);
});

