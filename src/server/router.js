const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/api/items", (req, res) => {
	fs.readFile(path.join(__dirname, "../../src/services/items-list.json"), (err, json) => {
		if (err) {
			res.send({
				code: 123,
				message: err,
			});
		}
		let obj = JSON.parse(json);
		res.json(obj);
	});
});
router.get("/", express.static("dist"));

module.exports = router;
