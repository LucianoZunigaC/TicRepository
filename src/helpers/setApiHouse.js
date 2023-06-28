const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams
const helpers = {};


helpers.setApiHouse = (file_path) => {
    const PROJECT = 'all'; // try 'weurope' or 'canada'
    const API_URL = 'https://my-api.plantnet.org/v2/identify/' + PROJECT + '?api-key=';
    const API_PRIVATE_KEY = '2b10kb10skcN4ZKmO6MfXAfjD'; // secret
    const API_SIMSEARCH_OPTION = '&include-related-images=true'; // optional: get most similar images
    const API_LANG = '&lang=es'; // default: en

    const IMAGE_1 = file_path;
    const ORGAN_1 = 'auto';

    let form = new FormData();


    form.append('organs', ORGAN_1);
    form.append('images', fs.createReadStream(IMAGE_1));

    let setting = API_URL + API_PRIVATE_KEY + API_SIMSEARCH_OPTION + API_LANG
    return { setting, form };

}


helpers.convertirHumedad = (humedad_suelo) => {

    // Rango del valor analógico (0 a 1024) al rango del porcentaje (0% a 100%)
    var porcentaje = (humedad_suelo / 1024) * 100;

    // Redondear el resultado a dos decimales
    porcentaje = Math.round(porcentaje * 100) / 100;

    return porcentaje;
}

module.exports = helpers;