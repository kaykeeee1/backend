const express = require('express');
const auth = require('../middlewares/auth.middleware');
const controller = require('../controllers/service.controller');

const router = express.Router();

router.use(auth);

router.post('/', controller.create);
router.get('/', controller.list);

module.exports = router;
