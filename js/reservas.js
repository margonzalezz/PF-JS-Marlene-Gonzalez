const reservas = JSON.parse(localStorage.getItem("misReservas"));
let miReserva;
const misPasajes = [];

if (reservas && reservas.length > 0) {
  const contenedorVuelos = document.getElementById("containerPasajes");

  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
                        <div class="alert alert-${type} alert-dismissible divSuccess" role="alert">
                          <div>${message}</div>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    contenedorVuelos.insertBefore(wrapper, contenedorVuelos.firstChild);
  };

  reservas.forEach(reserva => {
    const cardsPasajes = document.createElement("div");
    const nombreAerolinea = reserva.aerolinea.toLowerCase().replace(/\s/g, "-");
    const rutaImagen = `../img/icon/${nombreAerolinea}.png`;

    cardsPasajes.innerHTML = `
      <div id="grid-pasajes">
        <div id="logoAerolinea" class="logo">
          <img src="${rutaImagen}" alt="${reserva.aerolinea}">
          <span class="nombreLogoAerolinea">${reserva.aerolinea}</span>
        </div>
        <div id="seccion-ida" class="ida">
        <p class="titulo-ida">ORIGEN:<br>${reserva.origen}</p>
          <p class="fecha-ida">${reserva.partida}</p>
        </div>
        ${reserva.pasaje === "solo_ida" ? `<div id="seccion-idaYvuelta" class="vuelta">
        <p class="titulo-vuelta">DESTINO:<br>${reserva.destino}</p> </div>`:
        `<div id="seccion-idaYvuelta" class="vuelta">
          <p class="titulo-vuelta">DESTINO:<br>${reserva.destino}</p>
            <p class="fecha-vuelta">${reserva.regreso}</p>
        </div>`}
        ${reserva.pasaje === "solo_ida" ? '' : `<div id="container-dias" class="dias"><p>${reserva.diasViaje + " días"}</p></div>`}
        <div id="container-precio" class="precio">
          <div class="precio-pasaje">
            <span class="titulo">PRECIO</span>
            <p>${"$" + reserva.precio}</p>
          </div>
        </div>
        <div class="seleccionar-pasaje" id="${reserva.id}">
          <button type="button" class="btn" id="liveAlertBtn">Seleccionar</button>
        </div>
      </div>
    `;
    contenedorVuelos.appendChild(cardsPasajes);

    function obtenerBotones(reserva) {
      const botonSeleccionar = cardsPasajes.querySelector('.seleccionar-pasaje button');
      botonSeleccionar.addEventListener('click', () => {
        appendAlert('La reserva fue realizada con éxito.', 'success');
        miReserva = reserva;
        misPasajes.push(miReserva);
        localStorage.setItem("miReserva", JSON.stringify(miReserva));
      });
    }
    obtenerBotones(reserva);
  });
}
