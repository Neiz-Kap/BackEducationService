const Router = require('express');
const router = new Router();
const lessonController = require('../controllers/lessonController');

// req - запрос, res - ответ
router.get('/', lessonController.getAll());

module.exports = router;
