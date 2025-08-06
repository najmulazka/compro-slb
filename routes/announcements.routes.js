const router = require("express").Router();
const { image } = require("../libs/multer.libs");
const {
  createAnnouncement,
  getAnnouncements,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
} = require("../controllers/announcement.controllers");
const { restrict } = require("../middlewares/restrict.middleware");

router.post("/", restrict, image.single("image"), createAnnouncement);
router.get("/", getAnnouncements);
router.get("/all", getAllAnnouncements);
router.get("/:id", getAnnouncement);
router.put("/:id", restrict, image.single("image"), updateAnnouncement);
router.delete("/:id", restrict, deleteAnnouncement);

module.exports = router;
