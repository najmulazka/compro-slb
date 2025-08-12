const router = require("express").Router();
const {
  createClass,
  getclass,
  getClassById,
  updateClass,
  deleteClass,
} = require("../controllers/class.controllers");
const { restrict } = require("../middlewares/restrict.middleware");

router.post("/", restrict, createClass);
router.get("/", getclass);
router.get("/:id", getClassById);
router.put("/:id", restrict, updateClass);
router.delete("/:id", restrict, deleteClass);

module.exports = router;
