import { connect } from 'react-redux';
import Game from './Game';
import * as Actions from './ActionTypes';

const mapStateToProps = state => ({
  timerMax: state.timerMax,
  gameHistory: state.history,
  activePlayerIndex: state.activePlayerIndex,
  bonusTimeType: state.bonusTimeType,
  compensationTime: state.compensationTime,
  overtimeTime: state.overtimeTime,
  isGameStarted: state.isGameStarted,
  isGameFinished: state.isGameFinished,
});

const mapDispatchToProps = dispatch => ({
  changePlayer: (currentPlayerIndex, newTime, bonusTimeType, compensationTime, overtimeTime) =>
    dispatch(Actions.changePlayer(
      currentPlayerIndex,
      newTime,
      bonusTimeType,
      compensationTime,
      overtimeTime,
    )),
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
