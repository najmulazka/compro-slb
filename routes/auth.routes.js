const router = require('express').Router();
const { createAdmin, loginAdmin } = require('../controllers/auth.controllers');

router.post('/login', loginAdmin);
router.post('/create', createAdmin);

module.exports = router;
