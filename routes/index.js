const router = require('express').Router();
const announcement = require('./announcements.routes');

router.use('/announcement', announcement);

module.exports = router;