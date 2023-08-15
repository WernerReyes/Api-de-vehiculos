class UI {

  mostrarVehiculosHTML(container, datos) {

    this.limpiarHTML(container);

    datos.forEach(carro => {

      const { model, precio, img: { regular }, city_mpg, year, cylinders } = carro;

      const divVehicle = document.createElement('DIV');
      divVehicle.className = 'flex flex-col items-center justify-center mt-10 border border-amber-50 py-5 px-2 rounded-3xl';

      divVehicle.innerHTML = `
            <img class="rounded-lg w-full sm:w-1/2 md:w-full h-32 lg:h-52 object-cover" src="${regular}" alt="" />
            <div class="flex justify-between text-white w-3/4 sm:w-1/2 md:w-full lg:w-3/4">
              <p class="uppercase text-xl md:text-sm lg:text-xl">Modelo: <span>${model}</span></p>
              <p class="uppercase text-xl md:text-sm lg:text-xl">Precio: <span>$${precio}</span></p>
            </div>
            <div class="flex flex-col sm:flex-row md:flex-col lg:flex-row sm:justify-evenly text-center text-[#A8A3A3] w-full">
              <span
                >Año
                <p class="text-white">${year}</p></span
              >
              <span
                >Eficiencia de combustible
                <p class="text-white">${city_mpg}MPG</p></span
              >
              <span class="${cylinders ? '' : 'hidden'}"
                >Número de cilindros
                <p class="text-white">${cylinders}</p></span
              >
            </div>                        
            `

      // Insertamos en el HTML
      container.appendChild(divVehicle);
    });
  }

  llenarModelosSelect(container, modelos) {

    this.limpiarHTML(container);

    const optionSelect = document.createElement('OPTION');
    optionSelect.selected = true;
    optionSelect.textContent = 'Seleccionar';
    container.appendChild(optionSelect);

    modelos.forEach( modelo => {
      
      const opcionModelo = document.createElement('OPTION');
      opcionModelo.value = modelo;
      opcionModelo.textContent = modelo;
      
      // Insertamos los modelos disponibles
      container.appendChild(opcionModelo);

    })
  }

  mostrarAlerta( container, mensaje, tipo ) {

    this.limpiarHTML(container);
    
    const divMensaje = document.createElement('DIV');
    divMensaje.setAttribute('id','alert');
    divMensaje.className = 'font-regular relative block mx-10 max-w-3xl lg:mx-auto mt-8 rounded-lg bg-gradient-to-tr px-4 py-4 text-base text-white flex items-center justify-center';
   
    
    if(tipo) {
      divMensaje.classList.add('from-red-600','to-red-400')
    } else {
      divMensaje.classList.add('from-green-600','to-green-400')

      setTimeout( () => divMensaje.remove(), 2000 );
    }

    divMensaje.innerHTML = `
    <div class="absolute top-4 left-4">
       ${ tipo ? '<i class="fa-solid fa-triangle-exclamation fa-bounce fa-xl" style="color: #d6a9a9;"></i>' : '<i class="fa-solid fa-circle-check fa-bounce fa-xl" style="color: #ffffff;"></i>' } 
    </div>
    <div class="ml-8 mr-12">${mensaje}</div>
    <div class="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20" data-dismissible-target="alert">
      <div role="button" class="w-max">
        <button
        class="select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        Cerrar
      </button>
      </div>
    </div>
    `

  container.appendChild(divMensaje);

  // Cerramos la alerta presionado el btn
  container.querySelector('button').onclick = () => divMensaje.remove();

  }


  spinner() {
    Swal.fire({
      html: `
          <div class="sk-cube-grid">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
          </div>
        `,
      showConfirmButton: false, // Ocultar el botón de confirmación
      allowOutsideClick: false, // Evitar que se cierre haciendo clic fuera del modal
      allowEscapeKey: false, // Evitar que se cierre con la tecla "Esc"
      background: "transparent",
      timer: 3000,
    });
  }

  limpiarHTML(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

}


export default UI;