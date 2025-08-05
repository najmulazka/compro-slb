const router = require("express").Router();
const {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
  getAllReports,
} = require("../controllers/report.controllers");
const { pdf } = require("../libs/multer.libs");
const { restrict } = require("../middlewares/restrict.middleware");

router.post("/", restrict, pdf.single("pdf"), createReport);
router.get("/", getReports);
router.get("/all", getAllReports);
router.get("/:id", getReport);
router.put("/:id", restrict, pdf.single("pdf"), updateReport);
router.delete("/:id", restrict, deleteReport);

module.exports = router;
