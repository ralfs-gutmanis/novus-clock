import React, { Component } from 'react';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { buttonPressBeep, countdownBeep, losingBeep } from './../beeper/Beeper';
import { buttonPressVibrate } from './../vibrater/Vibrater';
import Button from './../button/Button';
import './../App.css';

const BEEP_LOSING = 'BEEP_LOSING';
const BEEP_BUTTON_PRESS = 'BEEP_BUTTON_PRESS';
const BEEP_COUNTDOWN = 'BEEP_COUNTDOWN';

const initialState = {
  history: [{
    players: [0, 0],
  }],
  activePlayerIndex: 0,
  isGameStarted: false,
  isGameFinished: false,
  // Config
  maxTime: 0,
  soundEnabled: true,
  vibrationEnabled: true,
  bonusTime: 0,
  minimumTime: 0,
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = this.getEmptyState();
  }

  componentWillUnmount() {
    this.resetGame();
  }

  getEmptyState() {
    return Object.assign(
      {},
      initialState,
      {
        maxTime: this.props.timerMax,
        soundEnabled: this.props.soundEnabled,
        vibrationEnabled: this.props.vibrationEnabled,
        bonusTime: this.props.bonusTime,
        minimumTime: this.props.minimumTime,
        history: [{
          players: [this.props.timerMax, this.props.timerMax],
        }],
      },
    );
  }

  resetGame() {
    clearInterval(this.interval);

    this.setState(this.getEmptyState());
  }

  feedback(type) {
    this.soundFeedback(type);
    this.vibrationFeedback(type);
  }

  vibrationFeedback(type) {
    const vibrationEnabled = this.state.vibrationEnabled;

    if (!vibrationEnabled) {
      return;
    }

    switch (type) {
      case BEEP_BUTTON_PRESS:
        buttonPressVibrate();
        break;
      default:
        break;
    }
  }

  soundFeedback(type) {
    const soundEnabled = this.state.soundEnabled;

    if (!soundEnabled) {
      return;
    }

    switch (type) {
      case BEEP_BUTTON_PRESS:
        buttonPressBeep();
        break;
      case BEEP_COUNTDOWN:
        countdownBeep();
        break;
      case BEEP_LOSING:
        losingBeep();
        break;
      default:
        break;
    }
  }

  tick() {
    const { activePlayerIndex } = this.state;
    const currentIndex = this.state.history.length - 1;
    const current = this.state.history[currentIndex].players.slice();

    let newTime = current[activePlayerIndex] - 1;
    if (newTime <= 0) {
      this.feedback(BEEP_LOSING);
      newTime = 0;
      this.stopGame();
    } else if (newTime < 10) {
      this.feedback(BEEP_COUNTDOWN);
    }

    const newHistory = update(this.state.history, {
      [currentIndex]: { players: { [activePlayerIndex]: { $set: newTime } } },
    });

    this.setState({
      history: newHistory,
    });
  }

  stopGame() {
    clearInterval(this.interval);

    this.setState({
      isGameFinished: true,
    });
  }

  clickButton(playerNumber) {
    if (this.state.isGameFinished) {
      return;
    }

    if (!this.state.isGameStarted) {
      this.feedback(BEEP_BUTTON_PRESS);

      this.interval = setInterval(this.tick.bind(this), 1000);
      this.setState({
        isGameStarted: true,
        activePlayerIndex: playerNumber,
      });

      return;
    }

    if (this.playerIsActive(playerNumber)) {
      this.feedback(BEEP_BUTTON_PRESS);
      clearInterval(this.interval); // TODO refactor --> StopCounting()
      const history = this.state.history.slice();
      const current = history[history.length - 1];
      const activePlayerIndex = this.state.activePlayerIndex;

      if (current.players[activePlayerIndex] < this.props.minimumTime) {
        current.players[activePlayerIndex] = this.props.minimumTime;
      }

      this.interval = setInterval(this.tick.bind(this), 1000); // TODO refactor --> StartCounting()
      this.setState({
        activePlayerIndex: (this.state.activePlayerIndex + 1) % 2,
        history: history.concat(current),
      });
    }
  }

  playerIsActive(playerNumber) {
    const { activePlayerIndex } = this.state;
    return activePlayerIndex === playerNumber;
  }

  renderButton(playerNumber) {
    const history = this.state.history.slice();
    const current = history[history.length - 1];

    return (
      <Button
        value={current.players[playerNumber]}
        isGameFinished={this.state.isGameFinished}
        isGameStarted={this.state.isGameStarted}
        onClick={() => this.clickButton(playerNumber)}
        playerWhite={playerNumber === 0}
        myTurn={this.playerIsActive(playerNumber)}
      />
    );
  }

  renderResetButton() {
    const isGameFinished = this.state.isGameFinished;
    const gameOverClass = isGameFinished ? 'button--game-over' : '';

    return (
      <button
        className={`button--reset button--left ${gameOverClass}`}
        onClick={() => this.resetGame(this.state.maxTime)}
      >
        <span className="vertical">
          RESET<br />
          GAME
        </span>
      </button>
    );
  }

  renderConfigButton() {
    const isGameFinished = this.state.isGameFinished;
    const gameOverClass = isGameFinished ? 'button--game-over' : '';

    return (
      <Link
        href="#config"
        className={`button--reset button--right ${gameOverClass}`}
        to="/config"
      >
        CONFIG
      </Link>
    );
  }

  render() {
    const isGameFinished = this.state.isGameFinished;
    const gameOverClass = isGameFinished ? 'grid-game-over' : '';

    return (
      <div className={`grid ${gameOverClass}`}>
        {this.renderButton(0)}
        {this.renderButton(1)}
        {this.renderResetButton()}
        {this.renderConfigButton()}
      </div>
    );
  }
}

Game.propTypes = {
  timerMax: PropTypes.number.isRequired,
  soundEnabled: PropTypes.bool.isRequired,
  vibrationEnabled: PropTypes.bool.isRequired,
  bonusTime: PropTypes.number.isRequired,
  minimumTime: PropTypes.number.isRequired,
};

export default Game;
