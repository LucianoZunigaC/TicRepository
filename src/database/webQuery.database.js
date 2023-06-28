const dbCtrl = {};
const { convertirHumedad } = require('../helpers/setApiHouse');
const pg = require('./database');
const moment = require('moment-timezone');

// USER

// Buscar user por email y password;
dbCtrl.getUser = async (email, password) => {


    try {


        let values = [email, password];
        let query = 'SELECT * FROM users WHERE email = $1 AND password = $2';

        let user = (await pg.query(query, values)).rows[0];

        return user;

    } catch (error) {

        console.log(error);

    }
}

// Buscar user por email
dbCtrl.getUserEmail = async (email) => {


    try {

        let values = [email];
        let query = 'SELECT * FROM users WHERE email = $1';

        let user = (await pg.query(query, values)).rows[0];

        return user;

    } catch (error) {

        console.log(error);

    }
}

// Buscar user por id
dbCtrl.getUserId = async (id) => {

    try {

        let values = [id];
        let query = 'SELECT * FROM users WHERE id = $1';

        let user = (await pg.query(query, values)).rows[0];

        return user;

    } catch (error) {
        console.log(error);
    }
}

// ID maximo de users
dbCtrl.getMaxId = async (value) => {

    try {

        let maxID = (await pg.query(`SELECT max(id) FROM ${value}`)).rows[0].max;

        if (maxID != null) {
            return maxID + 1;
        }

        return 0;



    } catch (error) {
        console.log(error);
    }
}


dbCtrl.insertUser = async (nombre, username, email, password) => {

    try {

        let maxID = await dbCtrl.getMaxId('users');
        let values = [maxID, nombre, username, email, password];


        let query = 'INSERT INTO users(id, nombre, username, email, password) VALUES($1, $2, $3, $4, $5)';

        await pg.query(query, values);

        console.log('Usuario insertado correctamente');

    } catch (error) {
        console.log(error);
    }

}


// Temperatura

dbCtrl.getDataMensual = async (id_user) => {

    let nombresMeses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    try {

        let id_esp = await dbCtrl.getEspId_userId(id_user);

        if (id_esp === false) {
            return false;
        }

        let dataArray = {
            mes: [],
            temperatura: [],
            humedad: []
        }

        for (let i = 1; i <= 12; i++) {
            dataArray.mes.push(nombresMeses[i - 1]);


            let values = [i, 2023, id_esp];
            let query = 'SELECT ROUND(AVG(valor)::numeric, 2) as avg FROM temperatura WHERE EXTRACT(MONTH FROM fecha) = $1 AND EXTRACT(YEAR FROM fecha) = $2 AND id_esp = $3';

            let dataTempAvg = (await pg.query(query, values)).rows[0].avg
            dataArray.temperatura.push(dataTempAvg);

            query = 'SELECT ROUND(AVG(valor)::numeric, 2) as avg FROM humedad WHERE EXTRACT(MONTH FROM fecha) = $1 AND EXTRACT(YEAR FROM fecha) = $2 AND id_esp = $3';
            let dataHumAvg = (await pg.query(query, values)).rows[0].avg
            dataArray.humedad.push(dataHumAvg);
        }


        return dataArray;


    } catch (error) {
        console.log(error);
    }
}


dbCtrl.insertTemperatura = async (id_esp, temperatura_aire) => {


    try {

        let maxID = await dbCtrl.getMaxId('temperatura');

        let values = [maxID, id_esp, temperatura_aire, 'now()'];

        let query = 'INSERT INTO temperatura(id, id_esp, valor, fecha) VALUES($1, $2, $3, $4)';

        await pg.query(query, values);

        // console.log('Temperatura insertada correctamente');

    } catch (error) {
        console.log(error);
    }
}

dbCtrl.insertHumedad = async (id_esp, humedad_aire) => {


    try {

        let maxID = await dbCtrl.getMaxId('humedad');

        let values = [maxID, id_esp, humedad_aire, 'now()'];

        let query = 'INSERT INTO humedad(id, id_esp, valor, fecha) VALUES($1, $2, $3, $4)';

        await pg.query(query, values);

        // console.log('Humedad insertada correctamente');

    } catch (error) {
        console.log(error);
    }
}

dbCtrl.insertHumedadSuelo = async (id_esp, huemdad_suelo) => {

    try {

        let maxID = await dbCtrl.getMaxId('humedad_suelo');

        let values = [maxID, id_esp, huemdad_suelo, 'now()'];

        let query = 'INSERT INTO humedad_suelo(id, id_esp, valor, fecha) VALUES($1, $2, $3, $4)';

        await pg.query(query, values);


    } catch (error) {
        console.log(error);
    }

}


// Trae la temperatura de el usuario x en x horas
dbCtrl.getInteravloSpline = async (id_user) => {

    let dataArray = {
        temperatura: [],
        humedad_aire: [],
        humedad_suelo: [],
        fecha: []
    }

    try {

        let id_esp = await dbCtrl.getEspId_userId(id_user);

        if (id_esp == false) {
            return false;
        }

        let intervalo = 1;
        let values = [id_esp];

        let query_temperatura = `SELECT * FROM temperatura WHERE id_esp = $1 order by id desc limit 30`;
        let query_humedad_aire = `SELECT valor FROM humedad WHERE id_esp = $1 order by id desc limit 30`;
        let query_humedad_suelo = `SELECT valor FROM humedad_suelo WHERE id_esp = $1 order by id desc limit 30`;
        // let query = 'SELECT max(fecha) FROM temperatura WHERE id_esp = $1';
        // let query = 'select now()';

        let datos_temperatura = (await pg.query(query_temperatura, values)).rows;
        let datos_humedad_aire = (await pg.query(query_humedad_aire, values)).rows;
        let datos_humedad_suelo = (await pg.query(query_humedad_suelo, values)).rows;


        const datosCorregidos = datos_temperatura.map((datos) => {
            const fechaCorregida = moment.utc(datos.fecha).tz('America/Santiago').format('YYYY-MM-DDTHH:mm:ss');
            return {
                id: datos.id,
                id_esp: datos.id_esp,
                valor: datos.valor,
                fecha: fechaCorregida,
            };
        });

       let huemdad_sueloArray = datos_humedad_suelo.map((datos) => datos.valor)

        var humedadesPorcentaje = huemdad_sueloArray.map(function (valorAnalogico) {
            return convertirHumedad(valorAnalogico);
        });

        dataArray.humedad_suelo = humedadesPorcentaje;

        dataArray.temperatura = datosCorregidos.map((datos) => datos.valor)
        dataArray.humedad_aire = datos_humedad_aire.map((datos) => datos.valor)
        dataArray.fecha = datosCorregidos.map((datos) => datos.fecha)


        
        return dataArray;


    } catch (error) {
        console.log(error);
    }

};



dbCtrl.getRealTimeData = async (id_user) => {

    try {


        let id_esp = await dbCtrl.getEspId_userId(id_user);

        if (id_esp === false) {

            return false;
        }

        let values = [id_esp]
        let query = `SELECT t.valor as temperatura, h.valor as humedad, s.valor as humedad_suelo
                    FROM temperatura as t, humedad as h, humedad_suelo as s
                    WHERE t.id_esp = $1 AND h.id_esp = $1 AND s.id_esp = $1 AND 
                    t.id in (SELECT max(id) FROM temperatura WHERE id_esp = $1) 
                    AND h.id in (SELECT max(id) FROM humedad WHERE id_esp = $1)
                    AND s.id in (SELECT max(id) FROM humedad_suelo WHERE id_esp = $1)`;


        let datos = (await pg.query(query, values)).rows[0];

        // console.log(datos);


        return datos;

    } catch (error) {
        console.log(error);
    }
}


// ESP 


dbCtrl.insertEsp = async (id_esp, id_planta, id_user) => {

    try {

        id_esp = parseInt(id_esp);

        let values = [id_esp, 'ff:ff:ff:ff:ff:ff', '192.168.100.111', id_user, id_planta];

        let query = 'INSERT INTO esp_monitor(id, mac_direction, ip_direction, id_user, id_planta) VALUES($1, $2, $3, $4, $5)';

        await pg.query(query, values);

        console.log('ESP INSERTADO CORRECTAMENTE');

    } catch (error) {
        console.log(error);
    }
}

dbCtrl.getEspId_userId = async (id_user) => {

    try {


        let values = [id_user];

        let query = 'SELECT id FROM esp_monitor WHERE id_user = $1';

        const id_esp = (await pg.query(query, values)).rows[0];

        if (id_esp === undefined) {

            return false;

        }

        return id_esp.id;

    } catch (error) {
        console.log(error);
    }
}


dbCtrl.getAllEspId_userId = async (id_user) => {

    try {

        let values = [id_user];

        let query = 'SELECT id FROM esp_monitor WHERE id_user = $1';

        const id_esp = (await pg.query(query, values)).rows;

        return id_esp;

    } catch (error) {
        console.log(error);
    }
}

dbCtrl.getPlantId_userId = async (id_user) => {


    try {
        let values = [id_user];

        let query = 'SELECT id_planta FROM esp_monitor WHERE id_user = $1';

        const id_esp = (await pg.query(query, values)).rows;

        return id_esp;

    } catch (error) {
        console.log(error);
    }

}


// PLANTA

dbCtrl.insertPlanta = async (planta_object, user_id, id_esp) => {


    try {


        let values = Object.values(planta_object);

        let maxID = await dbCtrl.getMaxId('plantas');
        values.unshift(maxID);

        let query = `INSERT INTO plantas(id, nombre_cientifico, genero, familia, nombres_comun, ruta_imagen_real, ruta_imagen_similar)
                    VALUES($1, $2, $3, $4, $5, $6, $7)`;

        await pg.query(query, values);


        await dbCtrl.insertEsp(id_esp, maxID, user_id);

    } catch (error) {
        console.log(error);
    }
}



dbCtrl.getPlanta = async (id_user) => {


    try {

        let values = [id_user];

        let query = `SELECT p.*
                    FROM plantas p
                    JOIN esp_monitor e_m ON p.id = e_m.id_planta
                    WHERE e_m.id_user = $1;`

        let data = await pg.query(query, values);

        return data.rows;

    } catch (error) {
        console.log(error);
    }
}





module.exports = dbCtrl;