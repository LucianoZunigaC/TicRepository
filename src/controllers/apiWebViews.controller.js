const dbCtrl = require('../database/webQuery.database');
apiWebCtrlViews = {};


apiWebCtrlViews.renderHome = (req, res) => {

    return res.status(200).render('home');
}



apiWebCtrlViews.renderLogin = (req, res) => {

    return res.status(200).render('login');
}


apiWebCtrlViews.renderGraficos = async (req, res) => {


    const user = req.user;

    let ids_esp = await dbCtrl.getAllEspId_userId(user.id);

    let datosPlanta = await dbCtrl.getPlanta(user.id);

    return res.status(200).render('graficos', { ids_esp, datosPlanta });
}


apiWebCtrlViews.renderCategorias = (req, res) => {

    return res.status(200).render('categorias');
}

apiWebCtrlViews.renderMiCuenta = (req, res) => {

    return res.status(200).render('micuenta');
}

module.exports = apiWebCtrlViews;