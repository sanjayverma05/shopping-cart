import React, { Fragment } from "react";
import { AppContext } from "Components/App";
import TwoThumbSlider from "CoreComponents/twoThumbSlider";
import { rangeFilter } from "Stores/shoppingStore/actions";

import styles from "./index.scss";

class FilterSidebar extends React.Component {
	static contextType = AppContext;
	constructor(props) {
		super(props);
		this.state = { currentMin: 0, currentMax: 0 };
	}

	onChange = ([minVal, maxVal]) => {
		let { dispatch } = this.props;

		dispatch(rangeFilter([minVal, maxVal]));
	};
	onUpdate = ([minVal, maxVal]) => {
		let { dispatch } = this.props;

		dispatch(rangeFilter([minVal, maxVal]));
	};

	render() {
		const {
			currency,
		} = this.context;
		let { min, max, defaultMin, defaultMax } = this.props.range;
		return (
			<div className="filter-sidebar">
				<h3 className="filter-sidebar__heading">Price Filter</h3>
				<div className="filter-current-values">
					<span>{`${currency}${min}`}</span>&nbsp;-&nbsp;
					<span>{`${currency}${max}`}</span>
				</div>
				<TwoThumbSlider
					currentMin={min}
					currentMax={max}
					minFilterValue={defaultMin}
					maxFilterValue={defaultMax}
					onChange={this.onChange.bind(this)}
					onUpdate={this.onUpdate.bind(this)}
				/>
				<div className="filter-limit-values">
					<span>{`${currency}${defaultMin}`}</span>
					<span>{`${currency}${defaultMax}`}</span>
				</div>
			</div>
		);
	}
}

export default FilterSidebar;
