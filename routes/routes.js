var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController')

router.get('/', HomeController.index);
router.get('/users', UserController.index)
router.get('/user/:id', UserController.findOne)
router.post('/user', UserController.create)
router.delete('/user/:id', UserController.del)
router.put('/user/:id', UserController.edit)
router.post('/recoverpassword', UserController.recoverPassword)

module.exports = router;