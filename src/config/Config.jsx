import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import feedback from './../feedback/Feedback';
import { FEEDBACK_NAVIGATION } from './../feedback/FeedbackTypes';
import './Config.css';
import './Switch.css';

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
      bonusTime: props.bonusTime,
      minimumTime: props.minimumTime,
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
    this.props.setBonusTime(this.state.bonusTime);
    this.props.setMinimumTime(this.state.minimumTime);
  }

  render() {
    return (
      <div className="config-grid">
        <section className="config-main">
          <div className="flex-vertical-center">
            <h1>Settings</h1>
            <span>version {process.env.REACT_APP_VERSION}</span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label className="input-container" htmlFor="timerMax">
              <span className="input-label">Timer max</span>
              <input
                type="number"
                pattern="[0-9]*"
                name="timerMax"
                value={`${this.state.timerMax}`}
                onChange={this.handleChange}
              />
            </label>
            <label className="input-container" htmlFor="minimumTime">
              <span className="input-label">Minimum time per move</span>
              <input
                type="number"
                pattern="[0-9]*"
                name="minimumTime"
                value={`${this.state.minimumTime}`}
                onChange={this.handleChange}
              />
            </label>
            <label className="input-container hidden" htmlFor="bonusTime">
              <span className="input-label">Bonus time</span>
              <input
                type="number"
                pattern="[0-9]*"
                name="bonusTime"
                value={`${this.state.bonusTime}`}
                onChange={this.handleChange}
              />
            </label>
            <label className="input-container flex-vertical-center" htmlFor="soundEnabled">
              <span className="checkbox-label">Sound Enabled</span>
              <label className="switch" htmlFor="soundEnabled">
                <input
                  id="soundEnabled"
                  type="checkbox"
                  name="soundEnabled"
                  checked={this.state.soundEnabled}
                  onChange={this.handleChange}
                />
                <span className="slider round" />
              </label>
            </label>
            <label className="input-container flex-vertical-center" htmlFor="vibrationEnabled">
              <span className="checkbox-label">Vibration Enabled</span>
              <label className="switch" htmlFor="vibrationEnabled">
                <input
                  id="vibrationEnabled"
                  type="checkbox"
                  name="vibrationEnabled"
                  checked={this.state.vibrationEnabled}
                  onChange={this.handleChange}
                />
                <span className="slider round" />
              </label>
            </label>
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
  timerMax: PropTypes.number.isRequired,
  soundEnabled: PropTypes.bool.isRequired,
  vibrationEnabled: PropTypes.bool.isRequired,
  bonusTime: PropTypes.number.isRequired,
  minimumTime: PropTypes.number.isRequired,
  setTimerMax: PropTypes.func.isRequired,
  setBonusTime: PropTypes.func.isRequired,
  enableSound: PropTypes.func.isRequired,
  enableVibration: PropTypes.func.isRequired,
  setMinimumTime: PropTypes.func.isRequired,
};

export default Config;
