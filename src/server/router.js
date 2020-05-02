const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/api/items", (req, res) => {
  fs.readFile("src/services/items-list.json", (err, json) => {
    if (err) {
      res.send({
        code: 404,
        message: err,
      });
    }
    let obj = JSON.parse(json);
    res.json(obj);
  });
});

module.exports = router;
