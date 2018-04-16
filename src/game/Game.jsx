import React, { Component } from 'react';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';
import { buttonPressBeep, countdownBeep, losingBeep } from './../beeper/Beeper';
import Button from './../button/Button';
import './../App.css';

const maxTime = 90;
const initialState = {
  history: [{
    players: [maxTime, maxTime],
  }],
  maxTime,
  activePlayerIndex: 0,
  isGameStarted: false,
  isGameFinished: false,
};

class Game extends Component {
  static renderConfigButton() {
    return (
      <Link href="#config" className="button--reset button--right" to="/config">CONFIG</Link>
    );
  }

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  resetGame(seconds) {
    clearInterval(this.interval);

    let newSeconds = seconds;
    if (!newSeconds) {
      newSeconds = 90;
    }

    this.setState({
      maxTime: newSeconds,
      history: [{
        players: [maxTime, maxTime],
      }],
      isGameStarted: false,
      isGameFinished: false,
    });
  }


  tick() {
    const { activePlayerIndex } = this.state;
    const currentIndex = this.state.history.length - 1;
    const current = this.state.history[currentIndex].players.slice();

    let newTime = current[activePlayerIndex] - 1;
    if (newTime <= 0) {
      losingBeep();
      newTime = 0;
      this.stopGame();
    } else if (newTime < 10) {
      countdownBeep();
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
      buttonPressBeep();

      this.interval = setInterval(this.tick.bind(this), 1000);
      this.setState({
        isGameStarted: true,
        activePlayerIndex: playerNumber,
      });

      return;
    }

    if (this.playerIsActive(playerNumber)) {
      const history = this.state.history.slice();
      const current = history[history.length - 1];

      buttonPressBeep();

      clearInterval(this.interval);
      this.interval = setInterval(this.tick.bind(this), 1000);
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

  handleChooseTime(seconds) {
    this.resetGame(seconds);
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
    return (
      <button
        className="button--reset button--left"
        onClick={() => this.resetGame(this.state.maxTime)}
      >
        <span className="vertical">
          RESET<br />
          GAME
        </span>
      </button>
    );
  }

  renderChooseTimeButton(seconds) {
    return (
      <button
        className="button--time"
        onClick={() => this.handleChooseTime(seconds)}
      >
        {seconds}
      </button>
    );
  }

  render() {
    return (
      <div className="grid">
        {this.renderButton(0)}
        {this.renderButton(1)}
        {this.renderResetButton()}
        {Game.renderConfigButton()}
      </div>
    );
  }
}

export default Game;
