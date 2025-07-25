const router = require('express').Router();
const announcement = require('./announcements.routes');
const auth = require('./auth.routes');

router.use('/announcement', announcement);
router.use('/auth', auth);

module.exports = router;
