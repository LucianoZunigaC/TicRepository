const router = require('express').Router()
const controller = require('../controllers/apiWebViews.controller');


router.get('/', controller.renderHome);
router.get('/signIn', controller.renderLogin);
router.get('/categorias', controller.renderCategorias);
router.get('/graficos', controller.renderGraficos);


module.exports = router;