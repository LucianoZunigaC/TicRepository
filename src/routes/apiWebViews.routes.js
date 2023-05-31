const router = require('express').Router()
const controller = require('../controllers/apiWebViews.controller');


router.get('/signIn', controller.renderLogin);


module.exports = router;