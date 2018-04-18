import { connect } from 'react-redux';
import {
  setTimerMax,
  enableSound,
  enableVibration,
  setBonusTime,
  setMinimumTime,
} from './ActionTypes';
import Config from './Config';

const mapStateToProps = state => ({
  timerMax: state.timerMax,
  soundEnabled: state.soundEnabled,
  vibrationEnabled: state.vibrationEnabled,
  bonusTime: state.bonusTime,
  minimumTime: state.minimumTime,
});

const mapDispatchToProps = dispatch => ({
  setTimerMax: seconds => dispatch(setTimerMax(seconds)),
  enableSound: enabled => dispatch(enableSound(enabled)),
  enableVibration: enabled => dispatch(enableVibration(enabled)),
  setBonusTime: seconds => dispatch(setBonusTime(seconds)),
  setMinimumTime: seconds => dispatch(setMinimumTime(seconds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Config);
