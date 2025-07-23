const router = require('express').Router();
const { image } = require('../libs/multer.libs');
const { createAnnouncement } = require('../controllers/announcement.controllers');

router.post('/', image.single('image'), createAnnouncement);

module.exports = router;
