function buttonPressVibrate() {
  if (typeof window.navigator.vibrate === 'function') {
    window.navigator.vibrate(200);
  }
}

function navigationVibrate() {
  if (typeof window.navigator.vibrate === 'function') {
    window.navigator.vibrate(50);
  }
}

export { buttonPressVibrate, navigationVibrate };
