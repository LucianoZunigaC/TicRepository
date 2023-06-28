const dbCtrl = require('../database/webQuery.database');
const axios = require('axios'); // HTTP client

const { setApiHouse } = require('../helpers/setApiHouse');


plantsCtrl = {};


plantsCtrl.subirArchivo = async (req, res) => {

    console.log(req.file)

    let user = req.user;

    let { setting, form } = setApiHouse(req.file.path);

    let planta_object = {
        nombre_cientifico: '',
        genero: '',
        familia: '',
        nombres_comun: [],
        ruta_imagen_real: '',
        ruta_imagen_similar: []
    };

    try {
        const { status, data } = await axios.post(setting, form, { headers: form.getHeaders() });


        // console.log('status', status); // should be: 200
        // console.log('data', require('util').inspect(data, false, null, true));


        let result = data.results[0];

        planta_object.nombre_cientifico = result.species.scientificName;
        planta_object.genero = result.species.genus.scientificName;
        planta_object.familia = result.species.family.scientificName;
        planta_object.nombres_comun = result.species.commonNames;
        planta_object.ruta_imagen_real= req.file.path;

        let img = result.images;
        let arreglo_rutas = []

        for(let i = 0; i < img.length; i++){
            arreglo_rutas.push(img[i].url.m);
        }
        planta_object.ruta_imagen_similar = arreglo_rutas;
        let user_id = user.id;

        let id_esp = req.body.id_esp;

        console.log({
            id_esp,
            user_id,
            planta_object
        })

        await dbCtrl.insertPlanta(planta_object, user.id, id_esp);




        return res.status(status).redirect('/graficos');
    } catch (error) {
        console.error('error', error);
    }

}





module.exports = plantsCtrl;