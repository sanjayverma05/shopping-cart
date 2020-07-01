import React, { Fragment } from "react";
import { Slider, Handles, Tracks } from "react-compound-slider";
import PropTypes from "prop-types";

const sliderStyle = {
	position: "relative",
	width: "100%",
	height: 30,
	paddingTop: "15px",
};

class TwoThumbSlider extends React.Component {
	render() {
		let {
			currentMin,
			currentMax,
			onUpdate,
			onChange,
			minFilterValue,
			maxFilterValue,
		} = this.props;
		return (
			<div>
				<Slider
					rootStyle={sliderStyle}
					domain={[minFilterValue, maxFilterValue]}
					step={1}
					mode={2}
					onUpdate={onUpdate}
					onChange={onChange}
					values={[currentMin , currentMax ]}
				>
					<Handles>
						{({ handles, getHandleProps }) => (
							<div className="slider-handles">
								{handles.map((handle) => (
									<Handle
										key={handle.id}
										handle={handle}
										getHandleProps={getHandleProps}
										domain={[minFilterValue, maxFilterValue]}
									/>
								))}
							</div>
						)}
					</Handles>
					<Tracks left={false} right={false}>
						{({ tracks, getTrackProps }) => (
							<div className="slider-tracks">
								{tracks.map(({ id, source, target }) => (
									<Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
								))}
							</div>
						)}
					</Tracks>
				</Slider>
			</div>
		);
	}
}
export function Handle({ domain: [min, max], handle: { id, value, percent }, disabled, getHandleProps }) {
	return (
		<Fragment>
			<div
				style={{
					left: `${percent}%`,
					position: "absolute",
					transform: "translate(-50%, -50%)",
					WebkitTapHighlightColor: "rgba(0,0,0,0)",
					zIndex: 5,
					width: 28,
					height: 42,
					cursor: "pointer",
					backgroundColor: "none",
				}}
				{...getHandleProps(id)}
			/>
			<div
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				style={{
					left: `${percent}%`,
					position: "absolute",
					transform: "translate(-50%, -50%)",
					zIndex: 2,
					width: 20,
					height: 20,
					borderRadius: "50%",
					boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.3)",
					border: "1px solid darkgrey",
					backgroundColor: disabled ? "#666" : "#ffffff",
				}}
			/>
		</Fragment>
	);
}

export function Track({ source, target, getTrackProps, disabled }) {
	return (
		<div
			style={{
				position: "absolute",
				transform: "translate(0%, -50%)",
				height: 5,
				zIndex: 1,
				backgroundColor: disabled ? "#999" : "#0000cd",
				borderRadius: 7,
				cursor: "pointer",
				left: `${source.percent}%`,
				width: `${target.percent - source.percent}%`,
			}}
			{...getTrackProps()}
		/>
	);
}
Track.propTypes = {
	source: PropTypes.shape({
		id: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		percent: PropTypes.number.isRequired,
	}).isRequired,
	target: PropTypes.shape({
		id: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		percent: PropTypes.number.isRequired,
	}).isRequired,
	getTrackProps: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

Track.defaultProps = {
	disabled: false,
};

Handle.propTypes = {
	domain: PropTypes.array.isRequired,
	handle: PropTypes.shape({
		id: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		percent: PropTypes.number.isRequired,
	}).isRequired,
	getHandleProps: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

Handle.defaultProps = {
	disabled: false,
	domain: [0, 100000],
};
export default TwoThumbSlider;
