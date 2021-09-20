const Router = require('express');
const router = new Router();

const cardRouter = require('./cardRouter');

router.use('/cards', cardRouter);

module.exports = router;
