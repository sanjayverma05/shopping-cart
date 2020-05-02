import React, { useState } from "react";
import styles from "./index.scss";

const RadioBtn = ({ handler, isChecked, value, text }) => {
  return (
    <div className="radio-btn-group" onClick={() => handler(value)}>
      <div
        className={isChecked ? "radiobtn checked" : "radiobtn unchecked"}
        data-value={value}
      ></div>
      <label>{text}</label>
    </div>
  );
};

const RadioGrp = ({ optionsList, defaultValue, changeCallback }) => {
  let [selectedValue, updateSelectedValue] = useState(
    defaultValue || optionsList[0]["value"]
  );

  const toggleRadioBtn = (value) => {
    updateSelectedValue(value);
    changeCallback(value);
    console.log(value);
  };

  const allOptions = optionsList.map((option, i) => {
    return (
      <RadioBtn
        key={i}
        isChecked={option.value == selectedValue}
        text={option.label}
        value={option.value}
        handler={() => toggleRadioBtn(option.value)}
      />
    );
  });

  return <div>{allOptions}</div>;
};

export default RadioGrp;
