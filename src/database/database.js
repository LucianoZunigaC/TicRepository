const { Pool } = require('pg');


// BD LOCAL

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "prueba_esp",
    port: 5432,
});



// BD UDP

// const pool = new Pool({
//     user: "alumno",
//     password: "alumno",
//     host: "157.245.180.1",
//     database: "prueba_esp",
//     port: 5432,
// });


module.exports = pool;