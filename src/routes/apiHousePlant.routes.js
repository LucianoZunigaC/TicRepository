const router = require('express').Router()
const controller = require('../controllers/apiHousePlants.controller');


router.get('/getAllCategories', controller.getAllCategories);
module.exports = router;