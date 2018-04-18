import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Config.css';
import './Switch.css';

class Config extends React.Component {
  static parseValue(value, type) {
    switch (type) {
      case 'number':
        return Number.isNaN(parseInt(value, 10)) ? null : parseInt(value, 10);
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const type = target.type;

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
  }

  render() {
    return (
      <div className="config-grid">
        <section className="config-main">
          <h1>Settings</h1>
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
            <input
              type="submit"
              className="novus-button save"
              value="SAVE"
            />
            <Link
              className="novus-button cancel"
              href="#home"
              to="/"
            >
              GO BACK
            </Link>
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
  setTimerMax: PropTypes.func.isRequired,
  setBonusTime: PropTypes.func.isRequired,
  enableSound: PropTypes.func.isRequired,
  enableVibration: PropTypes.func.isRequired,
};

export default Config;
