const router = require('express').Router();
const announcement = require('./announcements.routes');
const documentation = require('./documentations.routes');
const report = require('./reports.routes');
const auth = require('./auth.routes');
const { restrict } = require('../middlewares/restrict.middleware');

router.use('/announcement', announcement);
router.use('/documentation', documentation);
router.use('/report', report);
router.use('/auth', auth);
router.get('/me', restrict);

module.exports = router;
