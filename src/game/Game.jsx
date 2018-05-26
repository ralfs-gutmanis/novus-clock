import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import Button from './../button/Button';
import {
  BEEP_BUTTON_PRESS,
  BEEP_COUNTDOWN,
  BEEP_LOSING,
  FEEDBACK_NAVIGATION,
  SAY_ONE,
  SAY_TWO,
  SAY_THREE,
} from './../feedback/FeedbackTypes';
import feedback from './../feedback/Feedback';
import './../App.css';
import { PLAYER_WHITE, PLAYER_BLACK } from './Constants';
import Confirmation from '../confirmation/Confirmation';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeIncrement: 100,
      popupWarningVisible: false,
      popupWarningMessage: '',
      popupWarningOnConfirm: () => {},
      popupWarningOnCancel: () => {},
    };

    this.resetGame();
  }

  componentWillUnmount() {
    this.resetGame();
  }

  resetGame() {
    clearInterval(this.interval);
    this.props.resetGame(this.props.timerMax);
  }

  tick() {
    const { activePlayerIndex } = this.props;
    const currentIndex = this.props.gameHistory.length - 1;
    const current = this.props.gameHistory[currentIndex].players.slice();
    const oldTime = current[activePlayerIndex];

    let newTime = current[activePlayerIndex] - (this.state.timeIncrement / 1000);

    if (newTime <= 0) {
      feedback(BEEP_LOSING);
      newTime = 0;
      this.stopGame();
    } else if (Math.trunc(oldTime) - Math.trunc(newTime) === 1) {
      if (Math.trunc(oldTime) === 1) {
        feedback(SAY_ONE);
      } else if (Math.trunc(oldTime) === 2) {
        feedback(SAY_TWO);
      } else if (Math.trunc(oldTime) === 3) {
        feedback(SAY_THREE);
      } else if (newTime <= 10) {
        feedback(BEEP_COUNTDOWN);
      }
    }

    this.props.tickTime(activePlayerIndex, newTime);
  }

  stopGame() {
    clearInterval(this.interval);
    this.props.stopGame();
  }

  clickButton(playerNumber) {
    if (this.props.isGameFinished) {
      return;
    }

    if (!this.props.isGameStarted) {
      feedback(BEEP_BUTTON_PRESS);

      this.interval = setInterval(this.tick.bind(this), this.state.timeIncrement);
      this.props.startGame(playerNumber);
      return;
    }

    if (this.playerIsActive(playerNumber)) {
      feedback(BEEP_BUTTON_PRESS);
      clearInterval(this.interval); // TODO refactor --> StopCounting()
      const history = this.props.gameHistory.slice();
      const current = history[history.length - 1];
      const { activePlayerIndex } = this.props;
      const activePlayerTime = current.players[activePlayerIndex];

      // TODO refactor --> StartCounting()
      this.interval = setInterval(this.tick.bind(this), this.state.timeIncrement);

      this.props.changePlayer(
        activePlayerIndex,
        activePlayerTime,
        this.props.bonusTimeType,
        this.props.compensationTime,
        this.props.overtimeTime,
      );
    }
  }

  playerIsActive(playerNumber) {
    const { activePlayerIndex } = this.props;
    return activePlayerIndex === playerNumber;
  }

  renderButton(playerNumber) {
    const history = this.props.gameHistory.slice();
    const current = history[history.length - 1];

    return (
      <Button
        value={current.players[playerNumber]}
        isGameFinished={this.props.isGameFinished}
        isGameStarted={this.props.isGameStarted}
        onClick={() => this.clickButton(playerNumber)}
        playerWhite={playerNumber === PLAYER_WHITE}
        myTurn={this.playerIsActive(playerNumber)}
      />
    );
  }

  renderResetButton() {
    const { isGameFinished } = this.props;
    const gameOverClass = isGameFinished ? 'button--game-over' : '';

    const handleClick = () => {
      feedback(FEEDBACK_NAVIGATION);

      if (!(this.props.isGameStarted && !this.props.isGameFinished)) {
        this.resetGame();
        return;
      }

      this.setState({
        popupWarningVisible: true,
        popupWarningMessage: 'You are going to reset the game, are you sure?',
        popupWarningOnConfirm: () => {
          this.setState({ popupWarningVisible: false });
          this.resetGame();
        },
        popupWarningOnCancel: () => {
          this.setState({ popupWarningVisible: false });
        },
      });
    };

    return (
      <button
        className={`button--reset button--left ${gameOverClass}`}
        onClick={() => handleClick()}
        onTouchStart={() => handleClick()}
      >
        <span className="text-vertical-left">RESET</span>
      </button>
    );
  }

  renderConfigButton() {
    const { isGameFinished } = this.props;
    const gameOverClass = isGameFinished ? 'button--game-over' : '';

    const handleClick = () => {
      feedback(FEEDBACK_NAVIGATION);

      if (!(this.props.isGameStarted && !this.props.isGameFinished)) {
        this.props.history.push('/config');
        return;
      }

      this.setState({
        popupWarningVisible: true,
        popupWarningMessage: 'You are going to cancel the game and go to config, are you sure?',
        popupWarningOnConfirm: () => {
          this.setState({ popupWarningVisible: false });
          this.props.history.push('/config');
        },
        popupWarningOnCancel: () => {
          this.setState({ popupWarningVisible: false });
        },
      });
    };

    return (
      <button
        className={`button--reset button--right ${gameOverClass}`}
        onClick={() => handleClick()}
        onTouchStart={() => handleClick()}
      >
        <span className="text-vertical-right">CONFIG</span>
      </button>
    );
  }

  render() {
    const { isGameFinished } = this.props;
    const gameOverClass = isGameFinished ? 'grid-game-over' : '';

    return (
      <div className={`grid ${gameOverClass}`}>
        {this.renderButton(PLAYER_WHITE)}
        {this.renderButton(PLAYER_BLACK)}
        {this.renderResetButton()}
        {this.renderConfigButton()}
        <Confirmation
          visible={this.state.popupWarningVisible}
          message={this.state.popupWarningMessage}
          onConfirm={this.state.popupWarningOnConfirm}
          onCancel={this.state.popupWarningOnCancel}
          reverse={this.props.activePlayerIndex === PLAYER_WHITE}
        />
      </div>
    );
  }
}

Game.propTypes = {
  // Config
  timerMax: PropTypes.number.isRequired,
  bonusTimeType: PropTypes.string.isRequired,
  compensationTime: PropTypes.number.isRequired,
  overtimeTime: PropTypes.number.isRequired,

  // State
  activePlayerIndex: PropTypes.number.isRequired,
  isGameFinished: PropTypes.bool.isRequired,
  isGameStarted: PropTypes.bool.isRequired,
  gameHistory: PropTypes.arrayOf(PropTypes.shape({
    players: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,

  // Actions
  changePlayer: PropTypes.func.isRequired,
  tickTime: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired,

  // Route
  history: ReactRouterPropTypes.history.isRequired,
};

export default Game;
