const tipoEfectivo = document.getElementById("tipoEfectivo");
const tipoTransferencia = document.getElementById("tipoTransfer");
const tipoTarjetas = document.getElementById("tipoTarjetas");
const botonComprar = document.getElementById("boton-de-compra");

function seleccionarOpcionPago(opcionSeleccionada) {
    if (opcionSeleccionada !== tipoEfectivo) {
      tipoEfectivo.classList.remove("selected");
      tipoEfectivo.disabled = true;
    } else if (opcionSeleccionada !== tipoTransfer) {
      tipoTransfer.classList.remove("selected");
      tipoTransfer.disabled = true;
    } else (opcionSeleccionada !== tipoTarjetas); {
      tipoTarjetas.classList.remove("selected");
      tipoTarjetas.disabled = true;
    }
    opcionSeleccionada.classList.add("selected");
  }
  
    tipoEfectivo.addEventListener("click", () => {seleccionarOpcionPago(tipoEfectivo)});
    tipoTransfer.addEventListener("click", () => {seleccionarOpcionPago(tipoTransfer)});
    tipoTarjetas.addEventListener("click", () => {seleccionarOpcionPago(tipoTarjetas)});
    
    function mostrarMensaje() {
    const comprar = document.getElementById("boton-de-compra");
    comprar.addEventListener("click", () => {
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Reservado con éxito',
                text: 'Su pasaje fue reservado correctamente',
                showCancelButton: false,
                confirmButtonText: "Aceptar",
                footer: `<a href="documentacion.html">Hacé click acá para conocer la documentación importante</a>`
              }).then((result) => {
                if (result.isConfirmed) {
                  location.href = '../index.html';
                }
              });
        }, 1500);

    })

}
mostrarMensaje();
