import React, { useContext, useState, useEffect } from "react";
import InputRange from "CoreComponents/inputRange";
import { Range, getTrackBackground } from "react-range";
import styles from "./index.scss";
import { AppContext } from "Components/App";

class FilterSidebar extends React.Component {
  static contextType = AppContext;

  state = {
    sliderWidth: 0,
    offsetSliderWidht: 0,
    min: 100,
    max: 100000,
    minValueBetween: 10,

    currentMin: 100,
    inputMin: 100,

    currentMax: 50000,
    inputMax: 100000,
  };

  componentDidMount() {
    const { currentMin, currentMax, max } = this.state;

    this.minValue.style.width = (currentMin * 100) / max + "%";
    this.maxValue.style.width = (currentMax * 100) / max + "%";

    this.setState({
      sliderWidth: this.slider.offsetWidth,
      offsetSliderWidht: this.slider.offsetLeft,
    });
  }

  setMin = (e) => {
    const { min, max, currentMax, minValueBetween } = this.state;
    const inputMin = e.target.value;

    this.setState({
      inputMin,
    });

    if (inputMin >= min && inputMin <= currentMax - minValueBetween) {
      this.setState({
        currentMin: parseInt(inputMin),
      });

      this.minValue.style.width = (inputMin * 100) / max + "%";
    }
  };

  changeMinValue = (e) => {
    e.preventDefault();

    document.addEventListener("mousemove", this.onMouseMoveMin);
    document.addEventListener("mouseup", this.onMouseUpMin);

    document.addEventListener("touchmove", this.onMouseMoveMin);
    document.addEventListener("touchend", this.onMouseUpMin);
  };

  onMouseMoveMin = (e) => {
    const {
      min,
      max,
      currentMax,
      minValueBetween,
      sliderWidth,
      offsetSliderWidht,
    } = this.state;

    const dragedWidht = e.clientX - offsetSliderWidht;
    const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth;
    const currentMin = Math.abs(parseInt((max * dragedWidhtInPercent) / 100));

    console.log(e.pageX, e.clientX, offsetSliderWidht);

    console.log(currentMin, currentMax - minValueBetween);

    console.log((max * dragedWidhtInPercent) / 100);

    if (currentMin >= min && currentMin <= currentMax - minValueBetween) {
      this.minValue.style.width = dragedWidhtInPercent + "%";
      this.minValue.dataset.content = currentMin;

      this.setState({
        currentMin,
        inputMin: currentMin,
      });
    }
  };

  onMouseUpMin = () => {
    document.removeEventListener("mouseup", this.onMouseUpMin);
    document.removeEventListener("mousemove", this.onMouseMoveMin);

    document.removeEventListener("touchend", this.onMouseMoveMin);
    document.removeEventListener("touchmove", this.onMouseUpMin);
  };

  setMax = (e) => {
    const { min, max, currentMin, currentMax, minValueBetween } = this.state;

    const inputMax = e.target.value;

    this.setState({
      inputMax,
    });

    if (inputMax >= currentMin + minValueBetween && inputMax <= max) {
      this.setState({
        currentMax: parseInt(inputMax),
      });
      this.maxValue.style.width = (inputMax * 100) / max + "%";
    }
  };

  changeMaxValue = (e) => {
    e.preventDefault();

    document.addEventListener("mousemove", this.onMouseMoveMax);
    document.addEventListener("mouseup", this.onMouseUpMax);

    document.addEventListener("touchmove", this.onMouseMoveMax);
    document.addEventListener("touchend", this.onMouseUpMax);
  };

  onMouseMoveMax = (e) => {
    const {
      max,
      currentMin,
      minValueBetween,
      sliderWidth,
      offsetSliderWidht,
    } = this.state;
    const maxWalueThumb = this.maxValue;
    const dragedWidht = e.clientX - offsetSliderWidht;
    const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth;
    const currentMax = Math.abs(parseInt((max * dragedWidhtInPercent) / 100));

    if (currentMax >= currentMin + minValueBetween && currentMax <= max) {
      maxWalueThumb.style.width = dragedWidhtInPercent + "%";
      maxWalueThumb.dataset.content = currentMax;
      this.setState({
        currentMax,
        inputMax: currentMax,
      });
    }
  };

  onMouseUpMax = () => {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMoveMax);

    document.removeEventListener("touchend", this.onMouseUp);
    document.removeEventListener("touchmove", this.onMouseMoveMax);
  };

  maxForMin = () => {
    const { currentMax, minValueBetween } = this.state;
    return currentMax - minValueBetween;
  };

  minForMax = () => {
    const { currentMin, minValueBetween } = this.state;
    return currentMin + minValueBetween;
  };

  render() {
    const {
      min,
      max,
      currentMin,
      inputMin,
      currentMax,
      inputMax,
      minValueBetween,
    } = this.state;
    const { applyFilter } = this.context;

    return (
      <div className="filter-sidebar">
        <h3 className="filter-sidebar__heading">Filters</h3>
        <div className="card">
          <div className="values">
            <div>{min}</div>
            <div>{max}</div>
          </div>

          <div ref={(ref) => (this.slider = ref)} id="slider">
            <div
              ref={(ref) => (this.minValue = ref)}
              id="min"
              data-content={currentMin}
            >
              <div
                ref={(ref) => (this.minValueDrag = ref)}
                id="min-drag"
                onMouseDown={this.changeMinValue}
                onTouchStart={this.changeMinValue}
              ></div>
            </div>

            <div
              ref={(ref) => (this.maxValue = ref)}
              id="max"
              data-content={currentMax}
            >
              <div
                ref={(ref) => (this.maxValueDrag = ref)}
                id="max-drag"
                onMouseDown={this.changeMaxValue}
                onTouchStart={this.changeMaxValue}
              ></div>
            </div>
          </div>
        </div>

        <a
          className="filter-sidebar__cta"
          onClick={() => applyFilter(currentMin, currentMax)}
        >
          Apply
        </a>
      </div>
    );
  }
}

// const FilterSidebar = () => {
//   const { items } = useContext(AppContext);
//   let [itemsPrice, changeItemsPrice] = useState([
//     ...items.map((item) => item.price.actual),
//   ]);
//   return (

//   );
// };

export default FilterSidebar;
