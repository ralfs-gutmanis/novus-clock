import React from 'react';
import PropTypes from 'prop-types';

function NumberInput(props) {
  if (!props.visible) {
    return '';
  }

  return (
    <label className="input-container" htmlFor={`${props.name}`}>
      <span className="input-label">{props.label}</span>
      <input
        type="number"
        pattern="[0-9]*"
        name={`${props.name}`}
        value={`${props.value}`}
        onChange={props.handleChange}
      />
    </label>
  );
}

NumberInput.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

NumberInput.defaultProps = {
  visible: true,
};

export default NumberInput;
