import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "Components/ReduxApp";
import shoppingStore from "Stores/shoppingStore";
import {Provider} from 'react-redux';

ReactDOM.hydrate(
	<Provider store={shoppingStore}>
        <Router >
		    <App />
        </Router>
	</Provider>,
	document.getElementById("root")
);
