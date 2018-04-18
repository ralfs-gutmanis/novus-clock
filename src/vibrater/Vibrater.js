function buttonPressVibrate() {
  if (typeof window.navigator.vibrate === 'function') {
    window.navigator.vibrate(200);
  }
}

export { buttonPressVibrate };
