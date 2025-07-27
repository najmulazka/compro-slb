const router = require('express').Router();
const { createdDocumentation, getDocumentations, getDocumentation, updateDocumentation, deleteDocumentation } = require('../controllers/documentation.controllers');
const { image } = require('../libs/multer.libs');
const { restrict } = require('../middlewares/restrict.middleware');

router.post('/', restrict, image.single('image'), createdDocumentation);
router.get('/', getDocumentations);
router.get('/:id', getDocumentation);
router.put('/:id', restrict, image.single('image'), updateDocumentation);
router.delete('/:id', restrict, deleteDocumentation);

module.exports = router;
