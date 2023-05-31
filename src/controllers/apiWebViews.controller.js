apiWebCtrlViews = {};


apiWebCtrlViews.renderHome = (req, res) => {

    return res.status(200).render('home');
}



apiWebCtrlViews.renderLogin = (req, res) => {

    return res.status(200).render('login');
}


apiWebCtrlViews.renderGraficos = (req, res) => {

    return res.status(200).render('graficos')
}


apiWebCtrlViews.renderCategorias = (req, res) => {

    return res.status(200).render('categorias');
}


module.exports = apiWebCtrlViews;