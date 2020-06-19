import React, { useContext, useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import { sortItems } from "Stores/shoppingStore/actions";
import { SORT_HIGH_TO_LOW, SORT_LOW_TO_HIGH, SORT_DISCOUNT } from "Stores/shoppingStore/actionTypes";

import { AppContext } from "Components/App";

import "./index.scss";

const SortBar = () => {
  // const { sortItems, sortOrder } = useContext(AppContext);
  const {sortOrder} = useSelector(state=>state.items);
  const dispatch= useDispatch()

  return (
		<div className="sortbar">
			<span className="sortbar__heading">Sort By</span>
			<a
				className={`sortbar__sort-option ${
					sortOrder === SORT_HIGH_TO_LOW ? "sortbar__sort-option--active" : ""
				}`}
				onClick={() => {
					dispatch(sortItems(SORT_HIGH_TO_LOW));
				}}
				tabIndex={0}
			>
				Price -- High Low
			</a>
			<a
				className={`sortbar__sort-option ${
					sortOrder === SORT_LOW_TO_HIGH ? "sortbar__sort-option--active" : ""
				}`}
				onClick={() => dispatch(sortItems(SORT_LOW_TO_HIGH))}
				tabIndex={0}
			>
				Price -- Low High
			</a>
			<a
				className={`sortbar__sort-option ${sortOrder === SORT_DISCOUNT ? "sortbar__sort-option--active" : ""}`}
				onClick={() => dispatch(sortItems(SORT_DISCOUNT))}
				tabIndex={0}
			>
				Discount
			</a>
		</div>
  );
};
export default SortBar;
