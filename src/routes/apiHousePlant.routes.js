const router = require('express').Router()
const controller = require('../controllers/apiHousePlants.controller');


// router.get('/getAllCategories', controller.getAllCategories);

router.post('/subirArchivo', controller.subirArchivo);


module.exports = router;