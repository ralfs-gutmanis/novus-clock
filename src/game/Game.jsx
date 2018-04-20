import React, { Component } from 'react';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './../button/Button';
import {
  BEEP_BUTTON_PRESS,
  BEEP_COUNTDOWN,
  BEEP_LOSING,
  FEEDBACK_NAVIGATION,
} from './../feedback/FeedbackTypes';
import feedback from './../feedback/Feedback';
import './../App.css';

const PLAYER_WHITE = 0;
const PLAYER_BLACK = 1;

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
      {
        activePlayerIndex: PLAYER_WHITE,
        isGameStarted: false,
        isGameFinished: false,
        history: [{
          players: [this.props.timerMax, this.props.timerMax],
        }],
        bonusTime: this.props.bonusTime,
        minimumTime: this.props.minimumTime,
      },
    );
  }

  resetGame() {
    clearInterval(this.interval);
    this.setState(this.getEmptyState());
  }

  tick() {
    const { activePlayerIndex } = this.state;
    const currentIndex = this.state.history.length - 1;
    const current = this.state.history[currentIndex].players.slice();

    let newTime = current[activePlayerIndex] - 1;
    if (newTime <= 0) {
      feedback(BEEP_LOSING);
      newTime = 0;
      this.stopGame();
    } else if (newTime < 10) {
      feedback(BEEP_COUNTDOWN);
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
      feedback(BEEP_BUTTON_PRESS);

      this.interval = setInterval(this.tick.bind(this), 1000);
      this.setState({
        isGameStarted: true,
        activePlayerIndex: playerNumber,
      });

      return;
    }

    if (this.playerIsActive(playerNumber)) {
      feedback(BEEP_BUTTON_PRESS);
      clearInterval(this.interval); // TODO refactor --> StopCounting()
      const history = this.state.history.slice();
      const current = history[history.length - 1];
      const { activePlayerIndex } = this.state;

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
        playerWhite={playerNumber === PLAYER_WHITE}
        myTurn={this.playerIsActive(playerNumber)}
      />
    );
  }

  renderResetButton() {
    const { isGameFinished } = this.state;
    const gameOverClass = isGameFinished ? 'button--game-over' : '';

    return (
      <button
        className={`button--reset button--left ${gameOverClass}`}
        onClick={() => {
          feedback(FEEDBACK_NAVIGATION);
          this.resetGame();
        }}
      >
        <span className="text-vertical-left">RESET</span>
      </button>
    );
  }

  renderConfigButton() {
    const { isGameFinished } = this.state;
    const gameOverClass = isGameFinished ? 'button--game-over' : '';

    return (
      <Link
        href="#config"
        className={`button--reset button--right ${gameOverClass}`}
        to="/config"
        onClick={() => feedback(FEEDBACK_NAVIGATION)}
      >
        <span className="text-vertical-right">CONFIG</span>
      </Link>
    );
  }

  render() {
    const { isGameFinished } = this.state;
    const gameOverClass = isGameFinished ? 'grid-game-over' : '';

    return (
      <div className={`grid ${gameOverClass}`}>
        {this.renderButton(PLAYER_WHITE)}
        {this.renderButton(PLAYER_BLACK)}
        {this.renderResetButton()}
        {this.renderConfigButton()}
      </div>
    );
  }
}

Game.propTypes = {
  timerMax: PropTypes.number.isRequired,
  bonusTime: PropTypes.number.isRequired,
  minimumTime: PropTypes.number.isRequired,
};

export default Game;
