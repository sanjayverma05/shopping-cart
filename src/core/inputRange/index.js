import React from 'react';
import { number, string } from 'prop-types';
import styles from './index.scss';

const InputRange = ({ label, min, max }) => {
    return <div className="input-range__holder">
        <input type="range" className="input-range__input-el" name={label}
            min={min} max={max} />
        <label htmlFor={label} className="input-range__label">{label}</label>
    </div>
}
InputRange.propTypes = {
    label: string,
    min: number,
    max: number
};

export default InputRange;