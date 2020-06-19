import { createStore, applyMiddleware, compose } from "redux";
import shoppingCartReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const shoppingStoreMiddleWare = thunkMiddleware;
const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(
    applyMiddleware(shoppingStoreMiddleWare)
);
const shoppingStore = createStore(shoppingCartReducer, enhancer);

export default shoppingStore;