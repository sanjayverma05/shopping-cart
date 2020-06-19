import React from "react";
import FilterSidebar from "Components/FilterSidebar";
import {useDispatch, useSelector} from "react-redux";

const SideBar = () => {
	const dispatch = useDispatch();
	const {range} = useSelector(state=>state.items);
	return (
		<div className="shopping-cart__sidebar">
			<FilterSidebar dispatch={dispatch} range={range} />
		</div>
	);
};

export default SideBar;
