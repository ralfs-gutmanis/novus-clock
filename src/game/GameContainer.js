import { connect } from 'react-redux';
import Game from './Game';
import * as Actions from './ActionTypes';

const mapStateToProps = state => ({
  timerMax: state.timerMax,
  bonusTime: state.bonusTime,
  minimumTime: state.minimumTime,
  history: state.history,
  activePlayerIndex: state.activePlayerIndex,
  isGameStarted: state.isGameStarted,
  isGameFinished: state.isGameFinished,
});

const mapDispatchToProps = dispatch => ({
  changePlayer: (currentPlayerIndex, newTime, bonusTime) =>
    dispatch(Actions.changePlayer(currentPlayerIndex, newTime, bonusTime)),
  tickTime: (currentPlayerIndex, newTime) =>
    dispatch(Actions.tickTime(currentPlayerIndex, newTime)),
  resetGame: timerMax =>
    dispatch(Actions.resetGame(timerMax)),
  startGame: currentPlayerIndex =>
    dispatch(Actions.startGame(currentPlayerIndex)),
  stopGame: () =>
    dispatch(Actions.stopGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
