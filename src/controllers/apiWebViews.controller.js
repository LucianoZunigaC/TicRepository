apiWebCtrlViews = {};


apiWebCtrlViews.renderLogin = (req, res) => {

    return res.status(200).render('login');
}


module.exports = apiWebCtrlViews;