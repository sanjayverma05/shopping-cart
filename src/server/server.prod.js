import express from "express";
import router from "./router.js";
import { Provider } from "react-redux";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import shoppingStore from "Stores/shoppingStore";
import App from "Components/ReduxApp";

const PORT = process.env.PORT || 8888;
const app = express();
app.use("/", router);
app.use(express.static("fe-dist"));

app.get(["/","/checkout"], (req, res) => {
	console.log(req.url);
	const content = renderToString(
		<Provider store={shoppingStore}>
			<StaticRouter location={req.url} context={{}}>
				<App />
			</StaticRouter>
		</Provider>
	);
	const raw = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name=”description” content=”A mini shopping e-cart“/>
        <title>Shopping Cart</title>
            <link rel="stylesheet" href="/main.css">
	</head>

	<body>
		<div id="root">${content}</div>
		<div id="modal-root"></div>
	<script src="/vendor.js"></script><script src="/main-bundle.js"></script></body>
</html>

  `;

	res.send(raw);
});

app.listen(PORT, () => console.log(`Frontend service listening on port: ${PORT}`));