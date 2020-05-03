import React, { Fragment } from "react";
import { AppContext } from "Components/App";
import TwoThumbSlider from "CoreComponents/twoThumbSlider";

import styles from "./index.scss";

class FilterSidebar extends React.Component {
	static contextType = AppContext;
	constructor(props) {
		super(props);
		this.state = { currentMin: 0, currentMax: 0 };
	}

	componentDidUpdate() {
		let { currentMinValue, currentMaxValue } = this.context;
		let { currentMin, currentMax } = this.state;
		if (currentMinValue !== currentMin) {
			this.setState({
				currentMin: currentMinValue,
			});
		}
		if (currentMaxValue !== currentMax) {
			this.setState({
				currentMax: currentMaxValue,
			});
		}
	}

	onChange = ([min, max]) => {
		let { setCurrentMinValue, setCurrentMaxValue } = this.context;
		this.setState({
			currentMin: min,
			currentMax: max,
		});
		setCurrentMinValue(min);
		setCurrentMaxValue(max);
	};

	render() {
		const {
			applyFilter,
			maxFilterValue,
			minFilterValue,
			currency,
			currentMinValue,
			currentMaxValue,
		} = this.context;
		let { currentMin, currentMax } = this.state;
		return (
			<div className="filter-sidebar">
				<h3 className="filter-sidebar__heading">Filters</h3>
				<div className="filter-current-values">
					<span>{`${currency}${currentMin || currentMinValue}`}</span>&nbsp;-&nbsp;
					<span>{`${currency}${currentMax || currentMaxValue}`}</span>
				</div>
				<TwoThumbSlider
					onChange={this.onChange.bind(this)}
					currentMin={currentMin}
					currentMinValue={currentMinValue}
					currentMax={currentMax}
					currentMaxValue={currentMaxValue}
					// onUpdate,
					// onChange,
					minFilterValue={minFilterValue}
					maxFilterValue={maxFilterValue}
				/>
				<div className="filter-limit-values">
					<span>{`${currency}${minFilterValue}`}</span>
					<span>{`${currency}${maxFilterValue}`}</span>
				</div>

				<a className="filter-sidebar__cta" onClick={() => applyFilter(currentMin, currentMax)}>
					Apply
				</a>
			</div>
		);
	}
}

export default FilterSidebar;
