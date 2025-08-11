const router = require('express').Router();
const { createClass, getclass, updateClass, deleteClass } = require('../controllers/class.controllers');
const { restrict } = require('../middlewares/restrict.middleware');

router.post('/', restrict, createClass);
router.get('/', getclass);
router.put('/:id', restrict, updateClass);
router.delete('/:id', restrict, deleteClass);

module.exports = router;
