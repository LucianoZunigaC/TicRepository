const router = require('express').Router()
const controller = require('../controllers/apiWebViews.controller');
const { isAuthenticated } = require('../helpers/auth');

router.get('/', controller.renderHome);
router.get('/signIn', controller.renderLogin);
router.get('/categorias', isAuthenticated, controller.renderCategorias);
router.get('/graficos', isAuthenticated, controller.renderGraficos);


module.exports = router;