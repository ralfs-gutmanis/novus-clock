import {
  BEEP_BUTTON_PRESS,
  BEEP_COUNTDOWN,
  BEEP_LOSING,
  FEEDBACK_NAVIGATION,
} from './FeedbackTypes';
import { buttonPressBeep, countdownBeep, losingBeep } from './../beeper/Beeper';
import { buttonPressVibrate } from './../vibrater/Vibrater';
import store from './../index';

function vibrationFeedback(type) {
  const { vibrationEnabled } = store.getState();

  if (!vibrationEnabled) {
    return;
  }

  switch (type) {
    case BEEP_BUTTON_PRESS:
    case FEEDBACK_NAVIGATION:
      buttonPressVibrate();
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
    default:
      break;
  }
}

function feedback(type) {
  soundFeedback(type);
  vibrationFeedback(type);
}

export default feedback;
