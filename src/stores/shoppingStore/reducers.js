import {combineReducers} from 'redux';

import {
	FETCH_ITEMS_REQUEST,
	FETCH_ITEMS_SUCCESS,
	FETCH_ITEMS_FAILURE,
	FILTER_SEARCH,
	REMOVE_FILTER,
	SCREEN_RESIZE,
	SORT_HIGH_TO_LOW,
	SORT_LOW_TO_HIGH,
	SORT_DISCOUNT,
    RANGE_FILTER,
    REDUCE_ITEM_COUNT,
    ADD_ITEM,
    REMOVE_ITEM
} from "./actionTypes";

import getViewPort from 'Utility/viewport';

const items = {
	isLoading: false,
	itemList: [],
	itemSet: [],
	itemError: "",
	searchText: "",
	range: {
		min: 0,
		max: 100000,
		defaultMin: 0,
		defaultMax: 100000
    },
    cart:{
        items:[],
        count:0
    },
	sortOrder: SORT_HIGH_TO_LOW,
};

const ui = {
	viewport: typeof window === "object" ? getViewPort() : "xlarge",
};

const currency= "₹";

const uiReducer = (state = ui, action)=> {
	switch (action.type) {
		case SCREEN_RESIZE:
			return { ...state, viewport: action.payload };
	}
	return state;
}

const currencyReducer = (state=currency, action) => {
    return state || action.payload;
}

const itemsReducer = (state = items, action) => {
	switch (action.type) {
		case FETCH_ITEMS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_ITEMS_SUCCESS:
			return {
				...state,
				isLoading: false,
				itemList: action.payload,
				itemSet: action.payload,
				error: "",
			};
		case FETCH_ITEMS_FAILURE:
			return {
				...state,
				isLoading: false,
				itemSet: [],
				itemList: [],
				error: action.payload,
			};
		case SORT_HIGH_TO_LOW:
		case SORT_LOW_TO_HIGH:
		case SORT_DISCOUNT:
			return {
				...state,
				sortOrder: action.type,
				itemList: [...state.itemList.sort(action.payload)],
				itemSet: [...state.itemSet.sort(action.payload)],
			};
		case FILTER_SEARCH: {
			return {
				...state,
				itemList: [
					...state.itemSet
						.filter((item) => item.name.toLowerCase().indexOf(action.payload.toLowerCase()) > -1)
						.filter((item) => {
							return item.price.actual >= state.range.min && item.price.actual <= state.range.max;
						}),
				],
				searchText: action.payload,
			};
		}
		case RANGE_FILTER: {
			return {
				...state,
				itemList: [
					...state.itemSet
						.filter((item) => {
							return item.price.actual >= action.payload.min && item.price.actual <= action.payload.max;
						})
						.filter((item) => item.name.toLowerCase().indexOf(state.searchText.toLowerCase()) > -1),
				],
				range: {
					min: action.payload.min,
					max: action.payload.max,
					defaultMin: state.range.defaultMin,
					defaultMax: state.range.defaultMax,
				},
			};
		}
		case ADD_ITEM: {
            return { 
                ...state,
                cart: addItemsToCart(action.payload, state.cart)
            };
		}
		case REMOVE_ITEM: {
            return {
                ...state,
                cart: reduceItemFromCart(action.payload, state.cart, true),
            };
        }
        case REDUCE_ITEM_COUNT :{
            return {
				...state,
				cart: reduceItemFromCart(action.payload, state.cart),
			};
        }
		default:
			return state;
	}
};

const addItemsToCart = (item,cart) => {
    let isItemAlreadyPresent = false;
    let updatedItems = cart.items;
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
    return {
        items: updatedItems,
        count: cart.count+1
	};
    // updateCheckoutItemCount(checkoutItemCount + 1);
};

const reduceItemFromCart = (item, cart ,removeItemfromCart = false) => {
    let updatedItems = cart.items;
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
    return {
		items: [...updatedItems],
		count: !removeItemfromCart ? cart.count - 1 : cart.count - itemCount,
	};  
};

const shoppingCartReducer = combineReducers({
	items: itemsReducer,
	ui: uiReducer,
	currency: currencyReducer,
});
export default shoppingCartReducer;