import {
  cantidadResultado,
  inputBuscarVehiculo,
  divAlertas,
  containerVehiculos,
  modeloVehiculos,
  tipoCombustibleVehiculos,
  filtrados,
  formulario
} from './selectores.js';
import UI from '../classes/UI.js';
import API from '../classes/API.js';

let vehiculos;
let vehiculoBuscado;
let cantidad;

// INSTANCIAS
const ui = new UI();
const api = new API();

eventListeners()
function eventListeners() {
  // Obtenemos los datos del storage
  obtenerDatosStorage();
}

// FUNCIONES
export async function vehiculosObtenidos(datos, vehicle) {

  // Cantidad de input
  cantidadResultado.value = cantidad;

  // Fabricante
  document.querySelector('#fabricante').textContent = vehicle;
  // Cantidad Resultados
  document.querySelector('#cantidad-resultados').textContent = `${datos.length} resultado${datos.length === 1 ? '' : 's'}`;
  // Vehiculos encontrados
  ui.mostrarVehiculosHTML(containerVehiculos, datos);

  sincronizarStorage(datos);

}

export function cantidadResultadosVehiculos() {

  // Obtenemos los datos actualizados del storage
  obtenerDatosStorage();

  cantidadResultado.addEventListener('change', async e => {

    if (Number(e.target.value) <= 0 || Number(e.target.value) > 50) {
      ui.mostrarAlerta(divAlertas, "Solo puedes obtener resultado entre 1 a 50", 'error');
      return;
    }

    if (Number(e.target.value) % 1 !== 0) {
      ui.mostrarAlerta(divAlertas, "Solo puedes ingresar número enteros", 'error');
      return;
    }

    cantidad = Number(e.target.value);

    // Obtenemos los datos con la nueva cantidad
    const datos = await api.obtenerVehiculosPorNombre(vehiculoBuscado, cantidad);

    // Volvemoa a obtener los vehiculos
    vehiculosObtenidos(datos, vehiculoBuscado);

    // Mostramos alerta de exito
    ui.mostrarAlerta(divAlertas, `Cambio efectuado correctamente, ahora obtendras ${cantidad} resultado${cantidad === 1 ? '' : 's'} de ahora en adelante`)

  })
}

export async function buscarVehiculoPorNombre(e) {
  e.preventDefault();

  // Verificamos que el campo no este vacio
  if (inputBuscarVehiculo.value.trim() === '') {
    ui.mostrarAlerta(divAlertas, "El campo es obligatorio", 'error');
    return;
  }

  // Obtenemos los resultados de la API
  const datos = await api.obtenerVehiculosPorNombre(inputBuscarVehiculo.value.trim(), cantidad);

  if (datos.length) {

    // Mostramos los vehiculos
    vehiculosObtenidos(datos, inputBuscarVehiculo.value);

    // En caso cambiemos la cantidad de resultado volvemos a efectuar los cambios
    cantidadResultadosVehiculos();

    ui.mostrarAlerta(divAlertas, "Vehiculo encontrado correctamente");
    return;
  }

  ui.mostrarAlerta(divAlertas, "No se encontro ningún vehiculo con los terminos de busqueda", 'error');

}


export async function seleccionarFabricanteCombustible(e, tipo) {

  if (e.target.value === 'Seleccionar') return;

  if (tipo === 'fabricante') {
    filtrados.obligatorio[tipo] = e.target.value;

    // Mostramos el spinner 
    ui.spinner();

    // Despues de 2 segundos mostramos los TIPOS DE COMBUSTIBLE
    setTimeout(() => tipoCombustibleVehiculos.disabled = false, 2000)

    if (filtrados.obligatorio.modelo !== '') {
      // Vacimos el modelo dl objeto
      filtrados.obligatorio.modelo = '';
      // Desabilitamos el bton
      formulario.querySelector('button[type="submit"]').disabled = true;
      formulario.querySelector('button[type="submit"]').classList.add('disabled:bg-[#7691fa]');
      // Fesabilitamos el input
      modeloVehiculos.disabled = true;
    }

  }

  if (tipo === 'tipoCombustible') {
    filtrados.obligatorio[tipo] = e.target.value;

    // Mostramos el spinner 
    ui.spinner();

    // Despues de 2 segundos mostramos los MODELOS
    setTimeout(() => {
      modeloVehiculos.disabled = false;

      // Habilitamos la infomacion
      document.querySelector('#tipo-combustible').classList.toggle('hidden', !e.target.value);
      document.querySelector('#tipo-combustible').innerHTML = `${e.target.value.toUpperCase()} <span> > </span>`

    }, 2000);

  }

  // Obtenemos los modelos 
  const modelosFabricante = await api.obtenerModelos(filtrados);

  // Llenamos el select de modelos
  ui.llenarModelosSelect(modeloVehiculos, modelosFabricante);

}

export function seleccionarModelo(e) {

  if (e.target.value === 'Seleccionar') return;

  // Llenamos el objeto
  filtrados.obligatorio.modelo = e.target.value;

  // Mostramos el spinner
  ui.spinner();

  // Despues de 2 segundos habilitamos el boton para aplicar los filtros
  setTimeout(() => {
    // Habilitamos el btn para APLICAR FILTROS
    formulario.querySelector('button[type="submit"]').disabled = false;
    formulario.querySelector('button[type="submit"]').classList.remove('disabled:bg-[#7691fa]');

    // Habilitamos la infomacion
    document.querySelector('#modelo').classList.toggle('hidden', !e.target.value);
    document.querySelector('#modelo').innerHTML = `${e.target.value.toUpperCase()} <span> > </span>`

  }, 2000);
}

export function llenarFiltradoOpcionalInput(e) {

  filtrados.opcional[e.target.name] = e.target.value;

  switch (e.target.name) {
    case 'year':
      // Habilitamos la infomacion
      document.querySelector('#year').classList.toggle('hidden', !e.target.value);
      document.querySelector('#year').innerHTML = `${e.target.value.toUpperCase()} <span> > </span>`
      break

    case 'consumoMinimo':
      // Habilitamos la infomacion
      document.querySelector('#consumo-minimo').innerHTML = `${e.target.value.toUpperCase() || 'Nda'} <span class="block text-sm text-[#C5C1C1]"> Consumo MPG minimo </span>`
      break

    case 'consumoMaximo':
      // Habilitamos la infomacion
      document.querySelector('#consumo-maximo').innerHTML = `${e.target.value.toUpperCase() || 'Nda'} <span class="block text-sm text-[#C5C1C1]"> Consumo MPG minimo </span>`
      break

    case 'combinacionMinimo':
      // Habilitamos la infomacion
      document.querySelector('#combinacion-minimo').innerHTML = `${e.target.value.toUpperCase() || 'Nda'} <span class="block text-sm text-[#C5C1C1]"> Consumo MPG minimo </span>`
      break

    default:
      // Habilitamos la infomacion
      document.querySelector('#combinacion-maximo').innerHTML = `${e.target.value.toUpperCase() || 'Nda'} <span class="block text-sm text-[#C5C1C1]"> Consumo MPG minimo </span>`
      break
  }

}

export async function aplicarFiltro(e) {
  e.preventDefault();

  const { consumoMinimo, consumoMaximo, combinacionMinimo, combinacionMaximo } = filtrados.opcional;

  if (consumoMinimo !== '' && consumoMaximo !== '') {
    if (Number(consumoMinimo) > Number(consumoMaximo)) {
      ui.mostrarAlerta(divAlertas, "Error, ingresa correctamente los datos", 'error');
      return;
    }

    if (Number(consumoMinimo) <= 0 || Number(consumoMaximo) <= 0) {
      ui.mostrarAlerta(divAlertas, 'El consumo tiene que ser mayor a 0', 'error');
      return;
    }
  }

  if (combinacionMinimo !== '' && combinacionMaximo !== '') {
    if (Number(combinacionMinimo) > Number(combinacionMaximo)) {
      ui.mostrarAlerta(divAlertas, "Error, ingresa correctamente los datos", 'error');
      return;
    }

    if (Number(consumoMinimo) <= 0 || Number(consumoMaximo) <= 0) {
      ui.mostrarAlerta(divAlertas, 'El consumo tiene que ser mayor a 0', 'error');
      return;
    }
  }

  // Obtenemos el resultado del filtro
  const resultadoFiltro = await api.filtrarBusqueda(filtrados, cantidad);

  if (resultadoFiltro.length) {

    // Mostramos los vehiculos
    vehiculosObtenidos(resultadoFiltro, filtrados.obligatorio.fabricante);

    // En caso cambiemos la cantidad de resultado volvemos a efectuar los cambios
    cantidadResultadosVehiculos();

    // Reiniciamos el formulario
    borrarFiltros();
    
    // Mostramos la alerta de EXITO
    ui.mostrarAlerta(divAlertas, "Vehiculo encontrado correctamente");

    // Borramos el contenido
    formulario.reset();

    return;
  }

  ui.mostrarAlerta(divAlertas, 'No se encontro ningun registro, de acuerdo con lo solicitado', 'error');

}

export function borrarFiltros() {
  // Vaciamos el objeto
  for (const key in filtrados.obligatorio) {
    filtrados.obligatorio[key] = '';
  }

  for (const key in filtrados.opcional) {
    filtrados.opcional[key] = '';
  }

  // Desabilitamos los inputs
  tipoCombustibleVehiculos.disabled = true;
  modeloVehiculos.disabled = true;

  // Desabilitamos el boton
  formulario.querySelector('button[type="submit"]').disabled = true;
  formulario.querySelector('button[type="submit"]').classList.add('disabled:bg-[#7691fa]');

  // Desabilitamos la infomacion
  document.querySelector('#tipo-combustible').classList.add('hidden');
  document.querySelector('#modelo').classList.add('hidden');

}


export function generarPrecioAlAzar() {
  // Genera un número decimal aleatorio entre 0 (incluido) y 1 (excluido)
  const numeroAleatorio = Math.random();

  // Escala el número aleatorio al rango deseado de precios
  const precioAleatorio = 10000 + numeroAleatorio * (50000 - 10000);

  // Redondea el precio a dos decimales
  return Math.round(precioAleatorio * 100) / 100;
}

function obtenerDatosStorage() {
  vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
  vehiculoBuscado = (vehiculos.length > 0 && vehiculos[0].make) ? vehiculos[0].make : 'Toyota';
  cantidad = vehiculos.length || 20;
}

function sincronizarStorage(array) {
  localStorage.setItem('vehiculos', JSON.stringify(array));
}


