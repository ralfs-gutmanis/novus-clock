import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  constructor(props) {
    super(props);

    this._hasBeenClickedRecently = false;
  }

  handleClick() {
    if(this._hasBeenClickedRecently) {
      return;
    }

    this._hasBeenClickedRecently = true;
    setTimeout(() => { this._hasBeenClickedRecently = false; }, 400);

    this.props.onClick();
  }

  render() {
    return (
      <div
        className={"button " + this.playerColor() + " " + this.cssClass()}
        onClick={() => this.handleClick()}
        onTouchStart={() => this.handleClick()}
      >
        {this.props.value}
      </div>
    );
  }

  cssClass() {
    if (this.isWinner()) {
      return 'button--is-winner';
    }

    if (this.isLoser()) {
      return 'button--is-loser';
    }

    if (this.isBlink()) {
      return 'button--blink';
    }

    return '';
  }

  playerColor() {
    if(this.props.playerWhite) {
      return 'button--white';
    }

    return 'button--black';
  }

  isWinner() {
    if (!this.props.isGameFinished) {
      return false;
    }

    return this.props.value !== 0;
  }

  isLoser() {
    if (!this.props.isGameFinished) {
      return false;
    }

    return this.props.value === 0;
  }

  isBlink() {
    if(this.props.isGameFinished || !this.props.isGameStarted || this.props.value > 10) {
      return false;
    }

    return this.props.myTurn && this.props.value % 2 === 1;
  }
}

export default Button;
