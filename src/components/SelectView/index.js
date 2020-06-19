import React, { useContext } from "react";
import {useSelector} from "react-redux";
import SideBar from "Components/SideBar";
import SortBar from "Components/SortBar";
import ShoppingList from "Components/ShoppingList";
import UtilityHeader from "Components/UtilityHeader";

import styles from "./index.scss";

const SelectView = () => {
	let viewport = useSelector(({ ui }) => ui.viewport);
	return (
		<section className="select-view">
			{viewport !== "xlarge" && (
				<section className="utilityHeader">
					<UtilityHeader />
				</section>
			)}
			<section className="container">
				{viewport === "xlarge" && (
					<section className="sidebar-container">
						<SideBar />
					</section>
				)}
				<main className="list-container">
					{viewport === "xlarge" && <SortBar />}
					<ShoppingList />
				</main>
			</section>
		</section>
	);
};

export default SelectView;
