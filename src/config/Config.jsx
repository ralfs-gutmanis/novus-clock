import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import feedback from './../feedback/Feedback';
import { FEEDBACK_NAVIGATION } from './../feedback/FeedbackTypes';
import { BonusTimeType } from './Constants';
import RadioGroup from './radiogroup/RadioGroup';
import NumberInput from './numberinput/NumberInput';
import Switch from './switch/Switch';
import './Config.css';

class Config extends React.Component {
  static parseValue(value, type) {
    switch (type) {
      case 'number': {
        const nextValue = Number.isNaN(parseInt(value, 10)) ? null : parseInt(value, 10);
        return nextValue < 0 ? 0 : nextValue;
      }
      default:
        return value;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      timerMax: props.timerMax,
      soundEnabled: props.soundEnabled,
      vibrationEnabled: props.vibrationEnabled,
      bonusTimeType: props.bonusTimeType,
      compensationTime: props.compensationTime,
      overtimeTime: props.overtimeTime,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: Config.parseValue(value, type),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setTimerMax(this.state.timerMax);
    this.props.enableSound(this.state.soundEnabled);
    this.props.enableVibration(this.state.vibrationEnabled);

    if (this.state.bonusTimeType === BonusTimeType.SuddenDeath) {
      this.props.setSuddenDeath();
    } else if (this.state.bonusTimeType === BonusTimeType.Overtime) {
      this.props.setOvertime(this.state.overtimeTime);
    } else if (this.state.bonusTimeType === BonusTimeType.Compensation) {
      this.props.setCompensation(this.state.compensationTime);
    }

    this.props.history.push('/');
  }

  render() {
    return (
      <div className="config-grid">
        <section className="config-main">
          <div>
            <div className="flex-vertical-center">
              <h1>Settings</h1>
              <span>version {process.env.REACT_APP_VERSION}</span>
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>
            <NumberInput
              name="timerMax"
              label="Base time"
              value={this.state.timerMax}
              handleChange={this.handleChange}
            />

            <h3 className="input-label">Bonus Time Type</h3>
            <RadioGroup
              values={[
                BonusTimeType.SuddenDeath,
                BonusTimeType.Overtime,
                BonusTimeType.Compensation,
              ]}
              name="bonusTimeType"
              selected={this.state.bonusTimeType}
              handleChange={this.handleChange}
            />

            <NumberInput
              name="overtimeTime"
              label="Overtime seconds"
              value={`${this.state.overtimeTime}`}
              visible={this.state.bonusTimeType === BonusTimeType.Overtime}
              handleChange={this.handleChange}
            />

            <NumberInput
              name="compensationTime"
              label="Compensation seconds"
              value={`${this.state.compensationTime}`}
              visible={this.state.bonusTimeType === BonusTimeType.Compensation}
              handleChange={this.handleChange}
            />

            <h3 className="input-label">Feedback</h3>
            <Switch
              name="soundEnabled"
              label="Sound Enabled"
              value={this.state.soundEnabled}
              handleChange={this.handleChange}
            />
            <Switch
              name="vibrationEnabled"
              label="Vibration Enabled"
              value={this.state.vibrationEnabled}
              handleChange={this.handleChange}
            />
            <div className="flex-vertical-center">
              <input
                type="submit"
                className="novus-button save"
                value="SAVE"
                onClick={() => feedback(FEEDBACK_NAVIGATION)}
              />
              <Link
                className="novus-button cancel"
                href="#home"
                to="/"
                onClick={() => feedback(FEEDBACK_NAVIGATION)}
              >
                GO BACK
              </Link>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

Config.propTypes = {
  // Config
  timerMax: PropTypes.number.isRequired,
  soundEnabled: PropTypes.bool.isRequired,
  vibrationEnabled: PropTypes.bool.isRequired,
  bonusTimeType: PropTypes.string.isRequired,
  compensationTime: PropTypes.number.isRequired,
  overtimeTime: PropTypes.number.isRequired,

  // Actions
  setTimerMax: PropTypes.func.isRequired,
  enableSound: PropTypes.func.isRequired,
  enableVibration: PropTypes.func.isRequired,
  setSuddenDeath: PropTypes.func.isRequired,
  setCompensation: PropTypes.func.isRequired,
  setOvertime: PropTypes.func.isRequired,

  // Route
  history: ReactRouterPropTypes.history.isRequired,
};

export default Config;
