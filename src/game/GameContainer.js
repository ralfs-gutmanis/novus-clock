import { connect } from 'react-redux';
import Game from './Game';

const mapStateToProps = state => ({
  timerMax: state.timerMax,
  bonusTime: state.bonusTime,
  minimumTime: state.minimumTime,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
