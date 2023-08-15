import {
    formulario,
    fabricanteVehiculos,
    tipoCombustibleVehiculos,
    modeloVehiculos,
    consumoMinimoVehiculos,
    consumoMaximoVehiculos,
    combinacionMaximoVehiculos,
    combinacionMinimoVehiculos,
    yearVehiculos,
    btnBuscarVehiculo,

} from '../componentes/selectores.js';
import {
    vehiculosObtenidos,
    cantidadResultadosVehiculos,
    buscarVehiculoPorNombre,
    seleccionarFabricanteCombustible,
    seleccionarModelo,
    llenarFiltradoOpcionalInput,
    aplicarFiltro,
    borrarFiltros,
} from '../componentes/funciones.js';
import API from '../classes/API.js';


class App {
    constructor() {
        this.initApp();
    }

    async initApp() {
        let vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];

        let vehiculoBuscado = (vehiculos.length > 0 && vehiculos[0].make) ? vehiculos[0].make : 'Toyota';

        let cantidad = vehiculos.length || 20;


        // INSTANCIAS
        const api = new API();

        // Obtenemos los resultados de la API
        const datos = await api.obtenerVehiculosPorNombre(vehiculoBuscado, cantidad);
        vehiculosObtenidos(datos, vehiculoBuscado)

        // Cantidad de resultados a obtener
        cantidadResultadosVehiculos();

        // Seleccionar fabricante
        fabricanteVehiculos.addEventListener('change', e => seleccionarFabricanteCombustible(e, 'fabricante'));

        // Seleccionar tipo de combustible
        tipoCombustibleVehiculos.addEventListener('change', e => seleccionarFabricanteCombustible(e, 'tipoCombustible'));

        // Seleccionar modelo
        modeloVehiculos.addEventListener('change', seleccionarModelo);

        // Ingresar consumo minimo and maximo
        consumoMinimoVehiculos.addEventListener('input', llenarFiltradoOpcionalInput);
        consumoMaximoVehiculos.addEventListener('input', llenarFiltradoOpcionalInput);

        // Ingresar combinacion minimo and maximo
        combinacionMinimoVehiculos.addEventListener('input', llenarFiltradoOpcionalInput);
        combinacionMaximoVehiculos.addEventListener('input', llenarFiltradoOpcionalInput);

        // Ingresar el año del vehiculo
        yearVehiculos.addEventListener('input', llenarFiltradoOpcionalInput);

        // Aplicamos el filtro
        formulario.addEventListener('submit', aplicarFiltro);

        // Borramos los filtros
        formulario.addEventListener('reset', borrarFiltros);


        // Buscar vehiculo por fabricante
        btnBuscarVehiculo.addEventListener('click', buscarVehiculoPorNombre);
    }
}

export default App;