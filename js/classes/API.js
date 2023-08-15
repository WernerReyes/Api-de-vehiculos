import { generarPrecioAlAzar } from '../componentes/funciones.js';

class API {

    constructor() {
        this.apiKey = '2oQ92HJ2e36r4O+UGbVJyA==N7vaE22MwGMiFOo8';
        this.options = { method: 'GET', headers: { 'X-Api-Key': this.apiKey } };
    }

    async obtenerVehiculosPorNombre(vehicle, cantidad) {

        const url = `https://api.api-ninjas.com/v1/cars?&make=${vehicle}&limit=${cantidad}`;

        try {

            const respuesta = await fetch(url, this.options);
            const datos = await respuesta.json();

            // Obtenemos las imagnes
            const imgs = await this.obtenerImgVehiculos(vehicle, cantidad);

            // Asignamos cada imagen a cada vehiculo
            const vehiculosConImg = datos.map((vehicle, index) => {
                return { ...vehicle, img: imgs[index % imgs.length], precio: generarPrecioAlAzar() };
            })

            return vehiculosConImg;

        } catch (error) {
            console.log(error);
        }

    }

    async obtenerModelos(filtro) {

        const { obligatorio: { fabricante, tipoCombustible } } = filtro;

        const url = `https://api.api-ninjas.com/v1/cars?&make=${fabricante}&fuel_type=${tipoCombustible}&limit=20`;

        try {

            const respuesta = await fetch(url, this.options);
            const datos = await respuesta.json();

            const modelosUnicos = datos.filter((modelo, index, self) => {
                // Verificamos si el indice actual es igual al indice anterior
                return self.findIndex(item => item.model === modelo.model) === index;
            }).map(dato => dato.model); // Obtenemos solo los modelos

            return modelosUnicos;

        } catch (error) {
            console.log(error);
        }


    }

    async filtrarBusqueda(filtros, cantidad) {

        console.log(filtros);

        const { obligatorio: { fabricante, tipoCombustible, modelo },
            opcional: { consumoMinimo, consumoMaximo, combinacionMinimo, combinacionMaximo, year } } = filtros;

        const url = `https://api.api-ninjas.com/v1/cars?&make=${fabricante}&fuel_type=${tipoCombustible}&model=${modelo}&min_hwy_mpg=
                ${consumoMinimo}&max_hwy_mpg=${consumoMaximo}&min_comb_mpg=${combinacionMinimo}&max_comb_mpg=${combinacionMaximo}&year=${year}&limit=${cantidad}`;

        try {
            const respuesta = await fetch(url, this.options);
            const datos = await respuesta.json();

            // Obtenemos las imagnes
            const imgs = await this.obtenerImgVehiculos(fabricante, cantidad);

            // Asignamos cada imagen a cada vehiculo
            const vehiculosConImg = datos.map((vehicle, index) => {
                return { ...vehicle, img: imgs[index % imgs.length], precio: generarPrecioAlAzar() };
            })

            console.log(vehiculosConImg);

            return vehiculosConImg;

        } catch (error) {
            console.log(error);
        }

    }


    async obtenerImgVehiculos(vehicle, cantidad) {

        const apiKey = 'Be2luoQs6UvbEu5mLfWxM4Gw3IqLJLQ3Ly9eIzpA6ow';

        const url = `https://api.unsplash.com/search/photos/?query=${vehicle}&per_page=${cantidad}&client_id=${apiKey}`

        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();

            // Obtenemos solo las imagenes
            const imgs = datos.results.map(dato => dato['urls']);

            // Retornamos las imagenes
            return imgs;

        } catch (error) {
            console.log(error);
        }
    }



}

export default API;