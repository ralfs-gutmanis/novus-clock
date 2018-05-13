import { connect } from 'react-redux';
import {
  setTimerMax,
  enableSound,
  enableMotivation,
  enableVibration,
  setSuddenDeath,
  setCompensation,
  setOvertime,
} from './ActionTypes';
import Config from './Config';

const mapStateToProps = state => ({
  timerMax: state.timerMax,
  soundEnabled: state.soundEnabled,
  motivationEnabled: state.motivationEnabled,
  vibrationEnabled: state.vibrationEnabled,
  bonusTimeType: state.bonusTimeType,
  compensationTime: state.compensationTime,
  overtimeTime: state.overtimeTime,
});

const mapDispatchToProps = dispatch => ({
  setTimerMax: seconds => dispatch(setTimerMax(seconds)),
  enableSound: enabled => dispatch(enableSound(enabled)),
  enableMotivation: enabled => dispatch(enableMotivation(enabled)),
  enableVibration: enabled => dispatch(enableVibration(enabled)),
  setSuddenDeath: () => dispatch(setSuddenDeath()),
  setCompensation: seconds => dispatch(setCompensation(seconds)),
  setOvertime: seconds => dispatch(setOvertime(seconds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Config);
