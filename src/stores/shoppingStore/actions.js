import getViewPort from 'Utility/viewport';

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
	REMOVE_ITEM,
} from "./actionTypes";

const fetchItemsRequest = ()=>{
    return {
		type: FETCH_ITEMS_REQUEST
	};
}
const fetchItemsSuccess = items => {
    return {
        type: FETCH_ITEMS_SUCCESS,
        payload: items
	};
}

const fetchItemsFailure = err => {
	return {
		type: FETCH_ITEMS_FAILURE,
		payload: err
	};
};

const fetchItems = ()=>{
    return (dispatch)=>{
        dispatch(fetchItemsRequest());
        fetch("/api/items")
			.then((res) => res.json())
			.then(({ itemList = [] }) => {
                dispatch(fetchItemsSuccess(itemList));
                dispatch(sortItems(SORT_HIGH_TO_LOW));
			})
			.catch((err) => {
				dispatch(fetchItemsFailure(err));
			});
    }
}

const sortItems = (order)=>{
    return (dispatch) => {
		dispatch(sortItemList(order));
	};
}

const updateViewport = ()=>{
    return {
        type: SCREEN_RESIZE,
        payload: getViewPort()
    }
}

const sortCallbackObj = {
	HIGH_TO_LOW: (a, b) => {
		return b.price.actual - a.price.actual;
	},
	LOW_TO_HIGH: (a, b) => {
		return a.price.actual - b.price.actual;
	},
	DISCOUNT: (a, b) => b.discount - a.discount,
};

const sortItemList = (order) => {
    switch (order) {
		case SORT_HIGH_TO_LOW: {
			return {
                type: SORT_HIGH_TO_LOW,
                payload: sortCallbackObj[order]
			};
		}
		case SORT_LOW_TO_HIGH: {
			return {
				type: SORT_LOW_TO_HIGH,
				payload: sortCallbackObj[order],
			};
		}
		case SORT_DISCOUNT: {
			return {
				type: SORT_DISCOUNT,
				payload: sortCallbackObj[order],
			};
        }
        default :{
            return {
				type: SORT_HIGH_TO_LOW,
				payload: sortCallbackObj[SORT_HIGH_TO_LOW],
			};
        }
	}
};

const searchFilter = (searchText) => {
    return {
        type: FILTER_SEARCH,
        payload: searchText
    }
}

const rangeFilter = ([min,max]) => {
    return {
        type: RANGE_FILTER,
        payload:{
            min,max
        }
	};
}

const addItems = (item)=>{
    return {
        type: ADD_ITEM,
        payload: item
    };
}

const removeItem = (item) => {
    return {
        type: REMOVE_ITEM,
        payload: item
    }
}
const reduceItem = (item) => {
	return {
		type: REDUCE_ITEM_COUNT,
		payload: item,
	};
};

export {
	fetchItems,
	updateViewport,
	sortItems,
	searchFilter,
	rangeFilter,
	addItems,
    removeItem,
    reduceItem
};