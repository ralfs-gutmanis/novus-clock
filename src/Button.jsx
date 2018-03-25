import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);

    this.hasBeenClickedRecently = false;
  }

  handleClick() {
    if (this.hasBeenClickedRecently) {
      return;
    }

    this.hasBeenClickedRecently = true;
    setTimeout(() => { this.hasBeenClickedRecently = false; }, 400);

    this.props.onClick();
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
    if (this.props.playerWhite) {
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
    if (this.props.isGameFinished || !this.props.isGameStarted || this.props.value > 10) {
      return false;
    }

    return this.props.myTurn && this.props.value % 2 === 1;
  }

  isDisabled() {
    if (!this.props.isGameStarted) {
      return false;
    }

    if (this.props.isGameFinished) {
      return true;
    }

    return !this.props.myTurn;
  }

  rippleClass() {
    if (this.props.isGameStarted) {
      return 'button--waiting';
    }

    return '';
  }

  render() {
    return (
      <button
        className={`button ${this.rippleClass()} ${this.playerColor()} ${this.cssClass()}`}
        onClick={() => this.handleClick()}
        onTouchStart={() => this.handleClick()}
        onKeyPress={() => this.handleClick()}
        disabled={this.isDisabled()}
      >
        {this.props.value}
      </button>
    );
  }
}

Button.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  playerWhite: PropTypes.bool.isRequired,
  isGameFinished: PropTypes.bool.isRequired,
  isGameStarted: PropTypes.bool.isRequired,
  myTurn: PropTypes.bool.isRequired,
};

export default Button;
