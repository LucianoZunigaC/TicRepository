const dbCtrl = {};
const pg = require('./database');

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

        if(maxID != null){
            return maxID + 1;
        }
        
        return 0;



    } catch (error) {
        console.log(error);
    }
}


dbCtrl.inserUser = async (nombre, username, email, password) => {

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





// ESP

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
module.exports = dbCtrl;