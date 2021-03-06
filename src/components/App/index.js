import React, { useState, useEffect, useDebugValue } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "Components/Header";
import Footer from "Components/Footer";
import LazyLoad from "Utility/Lazyload";

import baseStyles from "Styles/base.scss";
import styles from "./index.scss";

export const AppContext = React.createContext({
	items: [],
	selectedItems: [],
	addItemsToCart: () => {},
	updateItems: () => {},
	sortItems: () => {},
	sortOrder: "",
	searchText: "",
	handleSearchTextChange: () => {},
	checkoutItemCount: 0,
	reduceItemFromCart: () => {},
	applyFilter: () => {},
	removeFilter: () => {},
	maxFilterValue: 1000,
	minFilterValue: 0,
	currentMinValue: 0,
	currentMaxValue: 1000,
	setCurrentMinValue: () => {},
	setCurrentMaxValue: () => {},
	currency: "₹",
	viewport: "large",
});

const SelectItemView = (props) => (
	<LazyLoad
		load={() => import(/* webpackChunkName: "lazyload-SelectView", webpackPreload: true */ "Components/SelectView")}
	>
		{(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
	</LazyLoad>
);

const CheckoutView = (props) => (
	<LazyLoad
		load={() => import(/* webpackChunkName: "lazyload-Checkout", webpackPrefetch: true */ "Components/Checkout")}
	>
		{(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
	</LazyLoad>
);

const ShoppingCart = () => {
	let [items, updateItems] = useState([]);
	let [cachedItems, updateCachedItems] = useState([]);
	let [selectedItems, updateSelectedItems] = useState([]);
	let [sortOrder, updateSortOrder] = useState("");
	let [searchText, changeSeachText] = useState("");
	let [checkoutItemCount, updateCheckoutItemCount] = useState(0);
	let [minFilterValue, setMinFilterValue] = useState(0);
	let [maxFilterValue, setMaxFilterValue] = useState(10000);
	let [currentMinValue, setCurrentMinValue] = useState(0);
	let [currentMaxValue, setCurrentMaxValue] = useState(10000);
	const [viewport, setViewport] = useState(getViewPort());

	const applyFilter = (min, max) => {
		let updatedItems = [...cachedItems];
		updatedItems = updatedItems.filter((item) => {
			return item.price["actual"] >= min && item.price["actual"] <= max;
		});
		updateItems(updatedItems);
	};

	const removeFilter = () => {
		updateItems([...selectedItems]);
	};

	const addItemsToCart = (item) => {
		let isItemAlreadyPresent = false;
		let updatedItems = [...selectedItems];
		updatedItems.some((_item) => {
			if (_item.name === item.name) {
				isItemAlreadyPresent = true;
				_item["_count"] += 1;
				return true;
			}
		});
		if (!isItemAlreadyPresent) {
			item["_count"] = 1;
			updatedItems = [...updatedItems, item];
		}
		updateSelectedItems(updatedItems);
		updateCheckoutItemCount(checkoutItemCount + 1);
	};

	const reduceItemFromCart = (item, removeItemfromCart = false) => {
		let updatedItems = [...selectedItems];
		let itemCount = 0;
		updatedItems.some((_item) => {
			if (_item.name === item.name) {
				if (!removeItemfromCart) {
					_item["_count"] -= 1;
				} else {
					itemCount = _item["_count"];
					_item["_count"] = 0;
				}
				return true;
			}
		});
		updatedItems = updatedItems.filter((_item) => _item["_count"] !== 0);
		updateSelectedItems(updatedItems);
		!removeItemfromCart
			? updateCheckoutItemCount(checkoutItemCount - 1)
			: updateCheckoutItemCount(checkoutItemCount - itemCount);
	};

	const handleSearchTextChange = (e) => {
		e.preventDefault();
		changeSeachText(e.target.value);
	};

	const sortGivenItems = (order, items = []) => {
		let itemsToSort = [...items];
		let sortCb = () => {};

		switch (order) {
			case "asc": {
				sortCb = (a, b) => {
					return a.price.actual - b.price.actual;
				};
				break;
			}
			case "desc": {
				sortCb = (a, b) => {
					return b.price.actual - a.price.actual;
				};
				break;
			}
			case "discount": {
				sortCb = (a, b) => b.discount - a.discount;
				break;
			}
		}
		itemsToSort.sort(sortCb);
		return [...itemsToSort];
	};

	const sortItems = (order) => {
		updateSortOrder(order);
	};
	function getViewPort() {
		const { innerWidth: width } = window;
		if (width < 768) {
			return "small";
		} else if (width >= 768 && width < 1024) {
			return "medium";
		} else if (width >= 1024 && width < 1152) {
			return "large";
		} else {
			return "xlarge";
		}
	}

	useEffect(() => {
		fetch("/api/items")
			.then((res) => res.json())
			.then(({ itemList = [] }) => {
				if (itemList.length > 0) {
					let minValue = 0,
						maxValue = 0;

					updateItems([...itemList]);
					updateCachedItems([...itemList]);
					itemList.sort((a, b) => {
						return a.price.actual - b.price.actual;
					});
					minValue =
						((itemList[0] && itemList[0].price["actual"]) || minFilterValue) - 4000 || minFilterValue;
					maxValue =
						itemList[itemList.length - 1] && itemList[itemList.length - 1]["price"]["actual"]
							? itemList[itemList.length - 1]["price"]["actual"] + 4000
							: maxFilterValue;
					setMinFilterValue(minValue);
					setMaxFilterValue(maxValue);
					setCurrentMinValue(itemList[0].price["actual"]);
					setCurrentMaxValue(itemList[itemList.length - 1]["price"]["actual"]);
				}
			});
		function handleResize() {
			setViewport(getViewPort());
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (sortOrder) {
			cachedItems = sortGivenItems(sortOrder, [...cachedItems]);
		}
		let updatedItems = (searchText &&
			cachedItems.filter((item) => {
				return item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
			})) || [...cachedItems];

		updateItems([...updatedItems]);
	}, [searchText, sortOrder]);

	return (
		<div>
			<AppContext.Provider
				value={{
					items,
					selectedItems,
					addItemsToCart,
					updateSelectedItems,
					sortItems,
					sortOrder,
					searchText,
					handleSearchTextChange,
					checkoutItemCount,
					reduceItemFromCart,
					applyFilter,
					removeFilter,
					maxFilterValue,
					minFilterValue,
					currentMinValue,
					currentMaxValue,
					setCurrentMinValue,
					setCurrentMaxValue,
					currency: "₹",
					viewport,
				}}
			>
				<Router>
					<Header />
					<Switch>
						<Route exact path="/checkout" render={() => <CheckoutView selectedItems={selectedItems} />} />
						<Route
							exact
							path="/"
							render={() => <SelectItemView items={items} addItemsToCart={addItemsToCart} />}
						/>
					</Switch>
				</Router>
			</AppContext.Provider>
			<Footer />
		</div>
	);
};

export default ShoppingCart;
