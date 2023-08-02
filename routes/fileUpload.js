const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  uploadFile,
  getFiles,
  getFile,
  update,
  deleteFile
} = require("../controllers/file");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const _format = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + _format);
  },
});

const upload = multer({ storage: storage });

router.get("/all", getFiles);
router.get("/:_id", getFile);
router.post("/", upload.single("file"), uploadFile);
router.put("/:_id", upload.single("file"), update);
router.delete("/:_id", deleteFile);

module.exports = router;
