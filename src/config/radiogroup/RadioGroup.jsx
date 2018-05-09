import React from 'react';
import PropTypes from 'prop-types';
import './RadioGroup.css';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values,
      name: props.name,
      // labels: props.labels,
    };
  }

  renderRadio(value) {
    return (
      <div key={`${value}`}>
        <label className="flex-vertical-center" htmlFor={`${value}`}>
          <span className="radio-label">{`${value}`}</span>
          <input
            type="radio"
            id={`${value}`}
            name={`${this.state.name}`}
            checked={this.props.selected === value}
            value={`${value}`}
            onChange={this.props.handleChange}
          />
        </label>
      </div>
    );
  }

  render() {
    const radioList = this.state.values.map(value => this.renderRadio(value));
    return (<div className="radio-group">{radioList}</div>);
  }
}

RadioGroup.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default RadioGroup;
