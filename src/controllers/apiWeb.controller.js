const passport = require('passport');
const dbCtrl = require('../database/webQuery.database');


// towade5442@jwsuns.com
// sk-N0ZY6469d3a75bc741002


apiWebCtrl = {};

// Home View
apiWebCtrl.home = async (req, res) => {

    try {


        // const response = await fetch('https://perenual.com/api/species-list?page=1&key=sk-N0ZY6469d3a75bc741002&indoor=1');
        const response = await fetch('https://perenual.com/api/species/details/721?key=sk-N0ZY6469d3a75bc741002');
        const data = await response.json()

        return res.status(200).json(data);

    } catch (error) {
        console.error('error', error);
    }

}



// SignIn
apiWebCtrl.signIn = passport.authenticate('local', {
    failureRedirect: '/signIn',
    successRedirect: '/'
});

// SignUp
apiWebCtrl.signUp = async (req, res) => {


    const { nombre, username, email, password, confirmPassword } = req.body;
    // const { email } = req.body;

    let existUser = await dbCtrl.getUserEmail(email);

    console.log(req.body);

    if (password === confirmPassword) {

        if (existUser) {
            return res.status(200).send('Usuario ya existente en la base de datos');
        } else {

            await dbCtrl.inserUser(nombre, username, email, password);

            return res.status(200).send('Usuario registrado correctamente');
        }

    } else {
        return res.status(200).send('Las contraseñas no coinciden');
    }

}

// LogOut
apiWebCtrl.logOut = async (req, res, next) => {

    await req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
}

// PRUEBA ESP   

apiWebCtrl.postESP = async (req, res) => {

    // console.log(req.body);

    const { temperatura_aire, humedad_aire, humedad_suelo, id_esp } = req.body;

    await dbCtrl.insertTemperatura(id_esp, temperatura_aire);
    await dbCtrl.insertHumedad(id_esp, humedad_aire);



    return res.status(200).send('Recibido');

}



module.exports = apiWebCtrl;