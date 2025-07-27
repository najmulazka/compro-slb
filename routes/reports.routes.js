const router = require('express').Router();
const { createReport, getReports, getReport, updateReport, deleteReport } = require('../controllers/report.controllers');
const { pdf } = require('../libs/multer.libs');
const { restrict } = require('../middlewares/restrict.middleware');

router.post('/', restrict, pdf.single('pdf'), createReport);
router.get('/', getReports);
router.get('/:id', getReport);
router.put('/:id', restrict, pdf.single('pdf'), updateReport);
router.delete('/:id', restrict, deleteReport);

module.exports = router;
