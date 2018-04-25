import {
  BEEP_BUTTON_PRESS,
  BEEP_COUNTDOWN,
  BEEP_LOSING,
  FEEDBACK_NAVIGATION,
  SAY_ONE,
  SAY_TWO,
  SAY_THREE,
} from './FeedbackTypes';
import {
  buttonPressBeep,
  countdownBeep,
  losingBeep,
  playOne,
  playTwo,
  playThree,
} from './../beeper/Beeper';
import { buttonPressVibrate, navigationVibrate } from './../vibrater/Vibrater';
import store from './../index';

function vibrationFeedback(type) {
  const { vibrationEnabled } = store.getState();

  if (!vibrationEnabled) {
    return;
  }

  switch (type) {
    case BEEP_BUTTON_PRESS:
      buttonPressVibrate();
      break;
    case FEEDBACK_NAVIGATION:
      navigationVibrate();
      break;
    default:
      break;
  }
}

function soundFeedback(type) {
  const { soundEnabled } = store.getState();

  if (!soundEnabled) {
    return;
  }

  switch (type) {
    case BEEP_BUTTON_PRESS:
      buttonPressBeep();
      break;
    case BEEP_COUNTDOWN:
      countdownBeep();
      break;
    case BEEP_LOSING:
      losingBeep();
      break;
    case SAY_ONE:
      playOne();
      break;
    case SAY_TWO:
      playTwo();
      break;
    case SAY_THREE:
      playThree();
      break;
    default:
      break;
  }
}

function feedback(type) {
  soundFeedback(type);
  vibrationFeedback(type);
}

export default feedback;
