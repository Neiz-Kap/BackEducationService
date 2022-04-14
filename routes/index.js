const Router = require('express');
const router = new Router();

const getLessonsRouter = require('./getLessonsRouter');

router.use('/', getLessonsRouter);
// router.use('/lessons', createLessonsRouter);

module.exports = router;
