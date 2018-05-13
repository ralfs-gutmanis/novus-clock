import React from 'react';
import PropTypes from 'prop-types';
import './Switch.css';

function Switch(props) {
  if (!props.visible) {
    return '';
  }

  return (
    <label className="input-container flex-vertical-center" htmlFor={`${props.name}`}>
      <span className="checkbox-label">{props.label}</span>
      <label className="switch" htmlFor={`${props.name}`}>
        <input
          type="checkbox"
          id={`${props.name}`}
          name={`${props.name}`}
          checked={props.value}
          onChange={props.handleChange}
        />
        <span className="slider round" />
      </label>
    </label>
  );
}

Switch.propTypes = {
  value: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

Switch.defaultProps = {
  visible: true,
};

export default Switch;
