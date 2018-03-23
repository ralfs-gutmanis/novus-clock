import React, { Component } from "react";
import Button from "./Button.js"
import "./App.css";

const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
const maxTime = 90;
const initialState = {
  players: [maxTime, maxTime],
  maxTime: maxTime,
  activePlayerIndex: 0,
  isGameStarted: false,
  isGameFinished: false,
  isConfigVisible: false,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  resetGame(seconds) {
    clearInterval(this.interval);

    if(!seconds) {
      seconds = 90;
    }

    this.setState({
      maxTime: seconds,
      players: [seconds, seconds],
      isGameStarted: false,
      isGameFinished: false,
      isConfigVisible: false,
    });
  }

  tick() {
    const activePlayerIndex = this.state.activePlayerIndex;
    const players = this.state.players.slice();

    let newTime = players[activePlayerIndex] - 1;
    if (newTime <= 0) {
      this.beep(1000);
      newTime = 0;
      this.stopGame();
    } else if (newTime < 10) {
      this.beep(150);
    }

    players[activePlayerIndex] = newTime;

    this.setState({
      players: players,
    });
  }

  stopGame() {
    clearInterval(this.interval);

    this.setState({
      isGameFinished: true,
    });
  }

  clickButton(playerNumber) {
    if(this.state.isGameFinished) {
      return;
    }

    if (!this.state.isGameStarted) {
      this.interval = setInterval(this.tick.bind(this), 1000);
      this.setState({
        isGameStarted: true,
        activePlayerIndex: playerNumber,
      });
      return;
    }

    if(this.playerIsActive(playerNumber)) {
      clearInterval(this.interval);
      this.interval = setInterval(this.tick.bind(this), 1000);
      this.setState({ activePlayerIndex: (this.state.activePlayerIndex+1)%2 });
    }
  }

  playerIsActive(playerNumber) {
    const activePlayerIndex = this.state.activePlayerIndex;
    return activePlayerIndex === playerNumber;
  }

  renderButton(playerNumber) {
    return <Button
      value={this.state.players[playerNumber]}
      isGameFinished={this.state.isGameFinished}
      isGameStarted={this.state.isGameStarted}
      onClick={() => this.clickButton(playerNumber)}
      playerWhite={playerNumber === 0}
      myTurn={this.playerIsActive(playerNumber)}
    />
  }

  renderResetButton(isLeftSide) {
    return <div
      className={"button--reset " + (isLeftSide ? 'button--left' : 'button--right')}
      onClick={() => this.resetGame(this.state.maxTime)}
    >
      RESET<br/>GAME
    </div>
  }

  renderConfigButton(isLeftSide) {
    return <div
      className={"button--reset " + (isLeftSide ? 'button--left' : 'button--right')}
      onClick={() => this.setState({isConfigVisible: true})}
    >
      CONFIG
    </div>
  }

  renderConfig(visible) {
    return <div className={"config " + (visible ? '' : 'hide')}>
      {this.renderChooseTimeButton(60)}
      {this.renderChooseTimeButton(75)}
      {this.renderChooseTimeButton(90)}
      {this.renderChooseTimeButton(105)}
      {this.renderChooseTimeButton(120)}
    </div>
  }

  renderChooseTimeButton(seconds) {
    return <button
      className="button--time"
      onClick={() => this.handleChooseTime(seconds)}
    >
      {seconds}
    </button>
  }

  handleChooseTime(seconds) {
    this.resetGame(seconds);
  }

  render() {
    return (
      <div className="grid">
        {this.renderButton(0)}
        {this.renderButton(1)}
        {this.renderResetButton(true)}
        {this.renderConfigButton(false)}
        {this.renderConfig(this.state.isConfigVisible)}
      </div>
    );
  }

  beep(length) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = 0.5;
    oscillator.frequency.value = 1000;
    oscillator.type = 0;

    oscillator.start();

    setTimeout(
      function() {
        oscillator.stop();
      },
      length
    );
  };
}



export default App;
