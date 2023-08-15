// VARIABLES
export const containerVehiculos = document.querySelector('#container-vehiculos');
export const divAlertas = document.querySelector('#alertas');

export const formulario = document.querySelector('#formulario');
export const fabricanteVehiculos = document.querySelector('#fabricante-vehiculo');
export const tipoCombustibleVehiculos = document.querySelector('#tipo-combustible-vehiculo');
export const modeloVehiculos = document.querySelector('#modelo-vehiculo');
export const consumoMinimoVehiculos = document.querySelector("#consumo-minimo-vehiculo");
export const consumoMaximoVehiculos = document.querySelector("#consumo-maximo-vehiculo");
export const combinacionMinimoVehiculos = document.querySelector("#combinacion-minimo-vehiculo");
export const combinacionMaximoVehiculos = document.querySelector("#combinacion-maximo-vehiculo");
export const yearVehiculos = document.querySelector('#year-vehiculo');

export const inputBuscarVehiculo = document.querySelector('#buscar-vehiculo');
export const btnBuscarVehiculo = document.querySelector('#btn-buscar');
export const cantidadResultado = document.querySelector('#cantidad-busqueda');

export const filtrados = {

  obligatorio: {
    fabricante: '',
    modelo: '',
    tipoCombustible: '',
  },

  opcional: {
    consumoMinimo: '',
    consumoMaximo: '',
    combinacionMinimo: '',
    combinacionMaximo: '',
    year: '',
  }
}

