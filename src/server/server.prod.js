const express = require("express");
const router = require("./router.js");
const server = express();
const path = require("path");

const staticMiddleware = express.static(path.join(__dirname, "../dist"));

server.use("/", router);
server.use(staticMiddleware);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`);
});
