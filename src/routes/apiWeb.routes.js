const router = require('express').Router()
const controller = require('../controllers/apiWeb.controller');

// GET
router.get('/logOut', controller.logOut);
router.get('/getTemperatura', controller.AreaChartData);




// POST
router.post('/signIn', controller.signIn);
router.post('/signUp', controller.signUp);
router.post('/postESP', controller.postESP);



module.exports = router;