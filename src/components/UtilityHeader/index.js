import React, { useState, useContext, useEffect } from "react";
import Modal from "CoreComponents/modal";
import RadioGrp from "CoreComponents/radioButton";
import FilterSidebar from "Components/FilterSidebar";
import TwoThumbSlider from "CoreComponents/twoThumbSlider";
import { AppContext } from "Components/App";
import styles from "./index.scss";

const optionsList = [
	{ label: "Price -- High Low", value: "desc" },
	{ label: "Price -- Low High", value: "asc" },
	{ label: "Discount", value: "discount" },
];
const SortItemModal = ({ closeModal = () => {} }) => {
	const { sortItems, sortOrder } = useContext(AppContext);
	let [_sortOrder, changeSortOrder] = useState(sortOrder);
	return (
		<div className="sort-items-modal">
			<div className="sort-items-modal__content">
				<RadioGrp optionsList={optionsList} changeCallback={changeSortOrder} defaultValue={sortOrder} />
			</div>
			<div className="shopping-cart-modal__cta-container">
				<a
					className="shopping-cart-modal__cancel"
					onClick={() => {
						closeModal();
					}}
				>
					Cancel
				</a>
				<a
					className="shopping-cart-modal__confirm"
					onClick={() => {
						sortItems(_sortOrder);
						closeModal();
					}}
				>
					Confirm
				</a>
			</div>
		</div>
	);
};

const FilterModal = ({ closeModal = () => {} }) => {
	let [currentMin, updateCurrentMin] = useState(0);
	let [currentMax, updateCurrentMax] = useState(0);
	const {
		applyFilter,
		maxFilterValue,
		minFilterValue,
		currency,
		currentMinValue,
		currentMaxValue,
		setCurrentMinValue,
		setCurrentMaxValue,
	} = useContext(AppContext);

	useEffect(() => {
		if (currentMinValue !== currentMin) {
			updateCurrentMin(currentMinValue);
		}
		if (currentMaxValue !== currentMax) {
			updateCurrentMax(currentMaxValue);
		}
	}, [currentMinValue, currentMaxValue]);
	const onFilterChange = ([min, max]) => {
		updateCurrentMin(min);
		updateCurrentMax(max);
		setCurrentMinValue(min);
		setCurrentMaxValue(max);
	};
	return (
		<div className="filter-modal">
			<div className="filter-modal__content">
				<div className="filter-current-values">
					<span>{`${currency}${currentMin || currentMinValue}`}</span>&nbsp;-&nbsp;
					<span>{`${currency}${currentMax || currentMaxValue}`}</span>
				</div>
				<TwoThumbSlider
					onChange={onFilterChange}
					currentMin={currentMin}
					currentMax={currentMax}
					currentMinValue={currentMinValue}
					currentMaxValue={currentMaxValue}
					minFilterValue={minFilterValue}
					maxFilterValue={maxFilterValue}
				/>
				<div className="filter-limit-values">
					<span>{`${currency}${minFilterValue}`}</span>
					<span>{`${currency}${maxFilterValue}`}</span>
				</div>
			</div>
			<div className="shopping-cart-modal__cta-container">
				<a className="shopping-cart-modal__cancel" onClick={closeModal}>
					Cancel
				</a>
				<a
					className="shopping-cart-modal__confirm"
					onClick={() => {
						currentMin && currentMax && applyFilter(currentMin, currentMax);
						closeModal();
					}}
				>
					Confirm
				</a>
			</div>
		</div>
	);
};

const UtilityHeader = () => {
	const [showSortModal, toggleSortModal] = useState(false);
	const [showFilterModal, toggleFilterModal] = useState(false);

	return (
		<div className="utility-header__container">
			<Modal
				showModal={showSortModal || showFilterModal}
				onClose={() => {
					showSortModal && toggleSortModal(false);
					showFilterModal && toggleFilterModal(false);
				}}
				heading={`${showSortModal ? "Sort Options" : "Filter Options"}`}
			>
				{showSortModal && <SortItemModal closeModal={() => toggleSortModal(false)} />}
				{showFilterModal && <FilterModal closeModal={() => toggleFilterModal(false)} />}
			</Modal>
			<section className="container">
				<div className="utility-header__sort" onClick={() => toggleSortModal(true)}>
					<span className="icon-sort-amount-asc"></span>
					Sort
				</div>
				<div className="utility-header__filter" onClick={() => toggleFilterModal(true)}>
					<span className="icon-filter"></span>
					Filter
				</div>
			</section>
		</div>
	);
};

export default UtilityHeader;
