const path = require("path");
const fs = require("fs");

module.exports.uploadFile = async (req, res) => {
  const fileObj = {
    type: "file",
    fileName: req.file.filename,
    originalName: req.file.originalname,
    path: req.file.path,
  };
  db.insert(fileObj, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: "File uploaded", data });
    }
  });
};

module.exports.getFile = async (req, res) => {
  const { _id } = req.params;
  db.findOne({ _id }, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (!data) {
      res.status(404).json({ message: "File not found" });
    } else {
      let _path = path.join(__base, data.path);
      res.sendFile(_path);
    }
  });
};

module.exports.getFiles = async (req, res) => {
  db.find({}, (err, data) => {
    res.status(200).json({ message: "File List", data });
  });
};

module.exports.deleteFile = async (req, res) => {
  const { _id } = req.params;
  db.findOne({ _id }, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (!data) {
      res.status(404).json({ message: "File not found" });
    } else {
      db.remove({ _id }, (err, numRows) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          let _path = path.join(__base, data.path);
          fs.unlinkSync(_path);
          res.status(200).json({ message: "File removed" });
        }
      });
    }
  });
};

module.exports.update = async (req, res) => {
  const { _id } = req.params;
  const fileObj = {
    type: "file",
    fileName: req.file.filename,
    originalName: req.file.originalname,
    path: req.file.path,
  };

  db.findOne({ _id }, (err, record) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (!record) {
      let _path = path.join(__base, req.file.path);
      fs.unlinkSync(_path);
      res.status(404).json({ message: "File not found" });
    } else {
      db.update(
        { _id },
        { ...record, ...fileObj },
        { returnUpdatedDocs: true },
        (err, rows, data) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            let _path = path.join(__base, record.path);
            fs.unlinkSync(_path);
            res.status(200).json({ message: "File Updated", data });
          }
        }
      );
    }
  });
};
