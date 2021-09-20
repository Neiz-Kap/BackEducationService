const Router = require('express');
const router = new Router();
const cardController = require('../controllers/cardController');

// отдельная карточка
router.get('/:course_id', cardController.getOne);
router.get('/', cardController.getAll);
router.put('/:course_id', cardController.editOne);

module.exports = router;
