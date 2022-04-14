const Router = require('express');
const router = new Router();
const getLessonsController = require('../controllers/getLessonsController');

// req - запрос, res - ответ
router.get('/', getLessonsController.getAll);

module.exports = router;
