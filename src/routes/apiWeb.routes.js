const router = require('express').Router()
const controller = require('../controllers/apiWeb.controller');

// GET
router.get('/', controller.home);
router.get('/logOut', controller.logOut);




// POST
router.post('/signIn', controller.signIn);
router.post('/signUp', controller.signUp);
router.post('/postESP', controller.postESP);



module.exports = router;